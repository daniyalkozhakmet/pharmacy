# Generated by Django 3.2.8 on 2021-11-09 15:36

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0016_alter_brand_foundation'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='createdAt',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
    ]
