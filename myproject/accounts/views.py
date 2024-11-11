from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.db import IntegrityError
from .models import CustomUser, Avaliacao, Skill, Projeto, Portfolio
from django.http import JsonResponse
import re
from django.views import View
from django.contrib.auth.views import LogoutView

def buscar_perfil_ajax(request):
    query = request.GET.get('q', '').strip()
    if not query:
        return JsonResponse({'usuarios': [], 'projetos': []})
    
    usuarios_resultados = CustomUser.objects.filter(username__icontains=query)[:5]
    usuarios = [
        {
            'id': usuario.id,
            'username': usuario.username,
            'perfil_url': f'/perfil/{usuario.id}/'
        }
        for usuario in usuarios_resultados
    ]
    
    projetos_resultados = Projeto.objects.filter(titulo__icontains=query)[:5]
    projetos = [
        {
            'id': projeto.id,
            'titulo': projeto.titulo,
            'projeto_url': f'/projeto/{projeto.id}/'
        }
        for projeto in projetos_resultados
    ]
    
    return JsonResponse({'usuarios': usuarios, 'projetos': projetos})

class PerfilView(View):
    def get(self, request, id):
        user = get_object_or_404(CustomUser, id=id)
        avaliacoes = user.avaliacoes_recebidas.all()
        return render(request, 'perfil.html', {'user': user, 'avaliacoes': avaliacoes, 'request_user': request.user})


def listar_projetos(request):
    projetos = Projeto.objects.all()
    return render(request, 'template_projetos.html', {'projetos': projetos})

def eh_cpf_valido(cpf):
    return re.match(r'^\d{11}$', cpf) is not None

def eh_cnpj_valido(cnpj):
    return re.match(r'^\d{14}$', cnpj) is not None

def registrar(request):
    if request.method == 'POST':
        tipo_usuario = request.POST.get('user_type')
        nome_usuario = request.POST.get('username')
        senha = request.POST.get('password')
        email = request.POST.get('email')

        if not nome_usuario or not senha or not email or not tipo_usuario:
            messages.error(request, 'Todos os campos são obrigatórios.')
            return render(request, 'registrar.html', {'tipo_usuario': tipo_usuario, 'username': nome_usuario, 'email': email})

        if CustomUser.objects.filter(username=nome_usuario).exists():
            messages.error(request, 'Nome de usuário já existe.')
            return render(request, 'registrar.html', {'tipo_usuario': tipo_usuario, 'username': nome_usuario, 'email': email})

        try:
            if tipo_usuario == 'freelancer':
                cpf = request.POST.get('cpf')
                if not cpf or not eh_cpf_valido(cpf):
                    messages.error(request, 'CPF é obrigatório e deve conter 11 dígitos.')
                    return render(request, 'registrar.html', {'tipo_usuario': tipo_usuario, 'username': nome_usuario, 'email': email})

                usuario = CustomUser.objects.create_user(username=nome_usuario, password=senha, email=email, is_freelancer=True, cpf=cpf)

            elif tipo_usuario == 'company':
                nome_empresa = request.POST.get('company_name')
                cnpj = request.POST.get('cnpj')
                if not nome_empresa or not cnpj or not eh_cnpj_valido(cnpj):
                    messages.error(request, 'Nome da empresa e CNPJ são obrigatórios e o CNPJ deve conter 14 dígitos.')
                    return render(request, 'registrar.html', {'tipo_usuario': tipo_usuario, 'username': nome_usuario, 'email': email})

                usuario = CustomUser.objects.create_user(username=nome_usuario, password=senha, email=email, is_company=True, company_name=nome_empresa, cnpj=cnpj)

            usuario.save()
            usuario_autenticado = authenticate(username=nome_usuario, password=senha)
            if usuario_autenticado is not None:
                login(request, usuario_autenticado)
                return redirect('home')

        except IntegrityError:
            messages.error(request, 'Ocorreu um erro com seu registro. Tente novamente.')
            return render(request, 'registrar.html', {'tipo_usuario': tipo_usuario, 'username': nome_usuario, 'email': email})

    return render(request, 'registrar.html')

def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        nome_usuario = request.POST.get('username')
        senha = request.POST.get('password')
        usuario = authenticate(request, username=nome_usuario, password=senha)
        if usuario is not None:
            login(request, usuario)
            return redirect('home')
        else:
            messages.error(request, 'Nome de usuário ou senha inválidos.')
            return redirect('login')

    return render(request, 'login.html')

def home(request):
    filtro = request.GET.get('filtro')
    if filtro and filtro != 'all':
        projetos = Projeto.objects.filter(filtro=filtro)
    else:
        projetos = Projeto.objects.all()
    return render(request, 'home.html', {'projetos': projetos})

def perfil(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    avaliacoes = user.avaliacoes.all()  
    return render(request, 'perfil.html', {'user': user, 'avaliacoes': avaliacoes, 'request_user': request.user})

def editar_perfil(request):
    usuario = request.user

    if request.method == 'POST':
        usuario.username = request.POST.get('username')
        usuario.description = request.POST.get('description')
        profile_picture = request.FILES.get('profile_picture')
        if profile_picture:
            usuario.profile_picture = profile_picture
        usuario.save()
        messages.success(request, 'Perfil atualizado com sucesso!')
        return redirect('perfil', usuario.id)

    if 'skill_name' in request.POST:
        skill_name = request.POST.get('skill_name')
        if skill_name:
            Skill.objects.create(name=skill_name, user=usuario)
            messages.success(request, 'Skill adicionada com sucesso!')
            return redirect('editar_perfil')

    if 'portfolio_name' in request.POST:
        portfolio_name = request.POST.get('portfolio_name')
        if portfolio_name:
            Portfolio.objects.create(name=portfolio_name, user=usuario)
            messages.success(request, 'Projeto adicionado ao portfólio com sucesso!')
            return redirect('editar_perfil')

    skills_usuario = usuario.skills.all()  
    portfolio_usuario = Portfolio.objects.filter(user=usuario)  
    return render(request, 'editar_perfil.html', {
        'user': usuario,
        'skills_usuario': skills_usuario,
        'portfolio_usuario': portfolio_usuario,
    })

from django.shortcuts import render, get_object_or_404
from .models import Portfolio, CustomUser

def portfolio(request, user_id=None):
    if user_id:
        recipient = get_object_or_404(CustomUser, id=user_id)
    else:
        recipient = request.user  #

    portfolios_usuario = Portfolio.objects.filter(user=recipient)

    return render(request, 'portfolio.html', {
        'portfolios': portfolios_usuario,
        'recipient': recipient
    })


def adicionar_portfolio(request):
    usuario = request.user 

    if request.method == 'POST':
        titulo = request.POST.get('title')
        descricao = request.POST.get('description')


        if not titulo.strip() or not descricao.strip():
            messages.error(request, 'Por favor, preencha todos os campos corretamente.')
        else:
            Portfolio.objects.create(user=usuario, title=titulo, description=descricao)
            messages.success(request, 'Portfólio adicionado com sucesso!')
            return redirect('adicionar_portfolio')

    portfolios_usuario = usuario.portfolios.all()
    return render(request, 'adicionar_portfolio.html', {'portfolios': portfolios_usuario})


def editar_skills(request):
    usuario = request.user

    if request.method == 'POST':
        nome_skill = request.POST.get('skill_name')

        if nome_skill:
            Skill.objects.create(name=nome_skill, user=usuario)
            messages.success(request, 'Skill adicionada com sucesso!')
            return redirect('editar_skills')
        else:
            messages.error(request, 'Skill não pode ser vazia!')

    habilidades_usuario = usuario.skills.all()
    return render(request, 'editar_skills.html', {'habilidades_usuario': habilidades_usuario})

def enviar_mensagem(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            recipient_id = request.POST.get('recipient_id')
            recipient = get_object_or_404(CustomUser, id=recipient_id)
            content_message = request.POST.get('message_content')
            if content_message:
                try:
                    send_mail(
                        subject=f"Nova mensagem de {request.user.username}",
                        message=content_message,
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        recipient_list=[recipient.email],
                    )
                    messages.success(request, 'Mensagem enviada com sucesso!')
                except Exception as e:
                    messages.error(request, f"Erro ao enviar mensagem: {e}")
                return redirect('perfil', id=recipient_id)  
        recipient_id = request.GET.get('recipient_id')
        recipient = get_object_or_404(CustomUser, id=recipient_id)
        return render(request, 'enviar_mensagem.html', {'recipient': recipient})
    else:
        messages.error(request, 'Voc  precisa estar logado para enviar mensagens.')
        return redirect('login_view')
    


def adicionar_projeto(request):
    if not request.user.is_authenticated:
        messages.error(request, 'Você precisa estar logado para adicionar um projeto.')
        return redirect('login')

    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descricao = request.POST.get('descricao')
        filtro = request.POST.get('filtro')

        if not titulo or not descricao or not filtro:
            messages.error(request, 'Por favor, preencha todos os campos e selecione um filtro.')
            return render(request, 'adicionar_projeto.html')
        
        novo_projeto = Projeto(titulo=titulo, descricao=descricao, filtro=filtro, usuario=request.user)
        novo_projeto.save()

        messages.success(request, 'Projeto adicionado com sucesso!')
        return render(request, 'adicionar_projeto.html')  

    return render(request, 'adicionar_projeto.html')


def projeto_detalhes(request, id):
    projeto = get_object_or_404(Projeto, id=id)
    return render(request, 'projetos/projeto_detalhes.html', {'projeto': projeto})


def adicionar_avaliacao(request, recipient_id):

    if request.method == 'POST':
        if not comentario:  
            messages.error(request, 'Por favor, digite uma avaliação.')  
        else:
            try:
                avaliacao = Avaliacao(
                    recipient=recipient,
                    author=request.user,
                    comment=comentario
                )
                avaliacao.save()
                messages.success(request, 'Avaliação enviada com sucesso!')
            except Exception as e:
                print(e)
                messages.error(request, 'Ocorreu um erro ao enviar a avaliação.')

    avaliacoes_usuario = Avaliacao.objects.filter(recipient=recipient)

    return render(request, 'adicionar_avaliacao.html', {'recipient': recipient, 'avaliacoes_usuario': avaliacoes_usuario})
