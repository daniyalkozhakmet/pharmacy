# Generated by Django 3.2.8 on 2022-02-17 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0018_alter_order_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='expiresAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
