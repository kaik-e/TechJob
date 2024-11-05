from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    is_freelancer = models.BooleanField(default=False)
    is_company = models.BooleanField(default=False)
    cpf = models.CharField(max_length=11, blank=True, null=True)
    cnpj = models.CharField(max_length=14, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

class Skill(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(CustomUser, related_name='skills', on_delete=models.CASCADE)

class Projeto(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    usuario = models.ForeignKey(CustomUser, related_name='projetos', on_delete=models.CASCADE)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

class Portfolio(models.Model):
    user = models.ForeignKey(CustomUser, related_name='portfolios', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

class Avaliacao(models.Model):
    recipient = models.ForeignKey(CustomUser, related_name='avaliacoes', on_delete=models.CASCADE)
    author = models.ForeignKey(CustomUser, related_name='avaliacoes_autor', on_delete=models.CASCADE)
    comment = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)

class Mensagem(models.Model):
    sender = models.ForeignKey(CustomUser, related_name='mensagens_enviadas', on_delete=models.CASCADE)
    recipient = models.ForeignKey(CustomUser, related_name='mensagens_recebidas', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
