# Generated by Django 3.2.8 on 2021-11-05 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_auto_20211105_1440'),
    ]

    operations = [
        migrations.AlterField(
            model_name='brand',
            name='foundation',
            field=models.DateField(blank=True, null=True),
        ),
    ]
