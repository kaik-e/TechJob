from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.db import IntegrityError
from .models import CustomUser, Avaliacao, Skill, Projeto, Portfolio, Mensagem
import re

def listar_projetos(request):
    projetos = Projeto.objects.all()
    return render(request, 'template_projetos.html', {'projetos': projetos})

def eh_cpf_valido(cpf):
    return re.match(r'^\d{11}$', cpf) is not None

def eh_cnpj_valido(cnpj):
    return re.match(r'^\d{14}$', cnpj) is not None

def registrar(request):
    if request.method == 'POST':
        tipo_usuario = request.POST.get('tipo_usuario')
        nome_usuario = request.POST.get('username')
        senha = request.POST.get('password')
        email = request.POST.get('email')

        if not nome_usuario or not senha or not email or not tipo_usuario:
            messages.error(request, 'Todos os campos são obrigatórios.')
            return render(request, 'register.html', {'tipo_usuario': tipo_usuario, 'username': nome_usuario, 'email': email})

        if CustomUser.objects.filter(username=nome_usuario).exists():
            messages.error(request, 'Nome de usuário já existe.')
            return render(request, 'register.html', {'tipo_usuario': tipo_usuario, 'username': nome_usuario, 'email': email})

        try:
            if tipo_usuario == 'freelancer':
                cpf = request.POST.get('cpf')
                if not cpf or not eh_cpf_valido(cpf):
                    messages.error(request, 'CPF é obrigatório e deve conter 11 dígitos.')
                    return render(request, 'register.html', {'tipo_usuario': tipo_usuario, 'username': nome_usuario, 'email': email})

                usuario = CustomUser.objects.create_user(username=nome_usuario, password=senha, email=email, is_freelancer=True, cpf=cpf)

            elif tipo_usuario == 'empresa':
                nome_empresa = request.POST.get('nome_empresa')
                cnpj = request.POST.get('cnpj')
                if not nome_empresa or not cnpj or not eh_cnpj_valido(cnpj):
                    messages.error(request, 'Nome da empresa e CNPJ são obrigatórios e o CNPJ deve conter 14 dígitos.')
                    return render(request, 'register.html', {'tipo_usuario': tipo_usuario, 'username': nome_usuario, 'email': email})

                usuario = CustomUser.objects.create_user(username=nome_usuario, password=senha, email=email, is_company=True, company_name=nome_empresa, cnpj=cnpj)

            usuario.save()
            usuario_autenticado = authenticate(username=nome_usuario, password=senha)
            if usuario_autenticado is not None:
                login(request, usuario_autenticado)
                return redirect('home')

        except IntegrityError:
            messages.error(request, 'Ocorreu um erro com seu registro. Tente novamente.')
            return render(request, 'register.html', {'tipo_usuario': tipo_usuario, 'username': nome_usuario, 'email': email})

    return render(request, 'register.html')

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
    projetos = Projeto.objects.all()
    return render(request, 'home.html', {'projetos': projetos})

def perfil(request):
    usuario = request.user
    return render(request, 'perfil.html', {'usuario': usuario, 'avaliacoes': usuario.avaliacoes.all()})

def editar_perfil(request):
    if request.method == 'POST':
        novo_nome_usuario = request.POST.get('username')
        nova_descricao = request.POST.get('description')
        nova_foto_perfil = request.FILES.get('profile_picture')

        if CustomUser.objects.filter(username=novo_nome_usuario).exclude(id=request.user.id).exists():
            messages.error(request, 'Este nome de usuário já está em uso.')
            return redirect('editar_perfil')

        usuario = request.user
        usuario.username = novo_nome_usuario
        usuario.description = nova_descricao
        if nova_foto_perfil:
            usuario.profile_picture = nova_foto_perfil
        usuario.save()

        messages.success(request, 'Perfil atualizado com sucesso!')
        return redirect('perfil')

    return render(request, 'editar_perfil.html', {'usuario': request.user})

def portfolio(request):
    portfolios_usuario = Portfolio.objects.filter(user=request.user)
    return render(request, 'portfolio.html', {'portfolios': portfolios_usuario})

def adicionar_portfolio(request):
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descricao = request.POST.get('descricao')

        if titulo and descricao:
            Portfolio.objects.create(user=request.user, title=titulo, description=descricao)
            messages.success(request, 'Portfólio adicionado com sucesso!')
            return redirect('portfolio')

        messages.error(request, 'Por favor, preencha todos os campos.')

    return render(request, 'adicionar_portfolio.html')

def editar_skills(request):
    usuario = request.user

    if request.method == 'POST':
        nome_skill = request.POST.get('skill_name')
        if nome_skill:
            Skill.objects.create(name=nome_skill, user=usuario)
            messages.success(request, 'Skill adicionada com sucesso!')
            return redirect('editar_skills')

    habilidades_usuario = usuario.skills.all()
    return render(request, 'editar_skills.html', {'habilidades_usuario': habilidades_usuario})

def enviar_mensagem(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            recipient_id = request.POST.get('recipient_id')
            recipient = get_object_or_404(CustomUser, id=recipient_id)
            content_message = request.POST.get('message_content')

            if content_message:
                Mensagem.objects.create(sender=request.user, recipient=recipient, content=content_message)
                messages.success(request, 'Mensagem enviada com sucesso!')
                return redirect('perfil')

        recipient_id = request.GET.get('recipient_id')
        recipient = get_object_or_404(CustomUser, id=recipient_id)
        return render(request, 'enviar_mensagem.html', {'recipient': recipient})
    else:
        messages.error(request, 'Você precisa estar logado para enviar mensagens.')
        return redirect('login_view')

def adicionar_projeto(request):
    if not request.user.is_authenticated:
        messages.error(request, 'Você precisa estar logado para adicionar um projeto.')
        return redirect('login')  

    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descricao = request.POST.get('descricao')

        if not titulo or not descricao:
            messages.error(request, 'Por favor, preencha todos os campos.')
            return render(request, 'adicionar_projeto.html')  

        novo_projeto = Projeto(titulo=titulo, descricao=descricao, usuario=request.user)
        novo_projeto.save()
        messages.success(request, 'Projeto adicionado com sucesso!')
        return redirect('home')

    return render(request, 'adicionar_projeto.html')

def projeto_detalhes(request, id):
    projeto = get_object_or_404(Projeto, id=id)
    return render(request, 'projetos/projeto_detalhes.html', {'projeto': projeto})

def adicionar_avaliacao(request):
    if request.method == 'POST':
        recipient_id = request.POST.get('recipient_id')
        comentario = request.POST.get('comment')

        if recipient_id and comentario:  
            recipient = get_object_or_404(CustomUser, id=recipient_id)
            try:
                Avaliacao.objects.create(recipient=recipient, author=request.user, comment=comentario)
                messages.success(request, 'Avaliação adicionada com sucesso!')
                return redirect('perfil')  
            except Exception as e:
                messages.error(request, f'Ocorreu um erro ao adicionar a avaliação: {str(e)}')
        else:
            messages.error(request, 'Por favor, preencha todos os campos corretamente.')

    recipient_id = request.GET.get('recipient_id')
    recipient = get_object_or_404(CustomUser, id=recipient_id)
    return render(request, 'adicionar_avaliacao.html', {'recipient': recipient})
