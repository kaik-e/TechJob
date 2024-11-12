# Generated by Django 5.1.2 on 2024-11-05 20:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_remove_avaliacao_data_criacao'),
    ]

    operations = [
        migrations.AlterField(
            model_name='avaliacao',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='avaliacoes_enviadas', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='avaliacao',
            name='recipient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='avaliacoes_recebidas', to=settings.AUTH_USER_MODEL),
        ),
    ]