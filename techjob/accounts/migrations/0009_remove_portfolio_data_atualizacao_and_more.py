# Generated by Django 5.1.2 on 2024-11-05 21:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_alter_avaliacao_author_alter_avaliacao_recipient'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='portfolio',
            name='data_atualizacao',
        ),
        migrations.RemoveField(
            model_name='portfolio',
            name='data_criacao',
        ),
    ]
