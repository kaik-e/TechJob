from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.conf.urls.static import static


from .views import (
    adicionar_avaliacao,
    registrar,
    projeto_detalhes,
    login_view,
    home,
    listar_projetos,
    perfil,
    editar_perfil,
    portfolio,
    adicionar_portfolio,
    editar_skills,
    enviar_mensagem,
    adicionar_projeto
)

urlpatterns = [
    path('', login_view, name='login'),
    path('login/', login_view, name='login'),
    path('registrar/', registrar, name='registrar'),
    path('home/', home, name='home'),
    path('projetos/', listar_projetos, name='listar_projetos'),
    path('perfil/', perfil, name='perfil'),
    path('editar-perfil/', editar_perfil, name='editar_perfil'),
    path('portfolio/', portfolio, name='portfolio'),
    path('adicionar-portfolio/', adicionar_portfolio, name='adicionar_portfolio'),
    path('editar-skills/', editar_skills, name='editar_skills'),
    path('enviar-mensagem/', enviar_mensagem, name='enviar_mensagem'),
    path('adicionar-projeto/', adicionar_projeto, name='adicionar_projeto'),
    path('projeto/<int:id>/', projeto_detalhes, name='projeto_detalhes'),
    path('adicionar-avaliacao/', adicionar_avaliacao, name='adicionar_avaliacao'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
