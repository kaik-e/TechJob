# Generated by Django 5.1.2 on 2024-11-06 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_remove_projeto_categoria'),
    ]

    operations = [
        migrations.AddField(
            model_name='projeto',
            name='filtro',
            field=models.CharField(default='valor_padrao', max_length=100),
        ),
    ]