from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import Portfolio, Project

User = get_user_model()

class UserAuthTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123', email='test@example.com')

    def test_user_registration(self):
        response = self.client.post(reverse('register'), {
            'user_type': 'freelancer',
            'username': 'newuser',
            'password': 'newpassword',
            'email': 'new@example.com',
            'cpf': '12345678901',
        })
        self.assertEqual(response.status_code, 302)  # Redireciona após registro
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_user_login(self):
        response = self.client.post(reverse('login_view'), {
            'username': 'testuser',
            'password': 'password123'
        })
        self.assertEqual(response.status_code, 302)  # Redireciona após login
        self.assertEqual(response.wsgi_request.user, self.user)

    def test_add_portfolio(self):
        self.client.login(username='testuser', password='password123')
        response = self.client.post(reverse('add_portfolio'), {
            'title': 'Meu Portfólio',
            'description': 'Descrição do meu portfólio',
        })
        self.assertEqual(response.status_code, 302)  # Redireciona após adicionar portfólio
        self.assertTrue(Portfolio.objects.filter(title='Meu Portfólio').exists())

    def test_add_project(self):
        self.client.login(username='testuser', password='password123')
        response = self.client.post(reverse('adicionar_projeto'), {
            'titulo': 'Meu Projeto',
            'descricao': 'Descrição do meu projeto',
        })
        self.assertEqual(response.status_code, 302)  # Redireciona após adicionar projeto
        self.assertTrue(Project.objects.filter(titulo='Meu Projeto').exists())

    def test_send_message(self):
        recipient = User.objects.create_user(username='recipient', password='recipient123', email='recipient@example.com')
        self.client.login(username='testuser', password='password123')
        response = self.client.post(reverse('send_message'), {
            'recipient_id': recipient.id,
            'message_content': 'Olá, esta é uma mensagem!',
        })
        self.assertEqual(response.status_code, 302)  # Redireciona após enviar mensagem
        self.assertTrue(Message.objects.filter(content='Olá, esta é uma mensagem!').exists())
