# Generated by Django 5.1.1 on 2024-09-30 14:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobrecruitementAPI', '0003_remove_education_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='education',
            name='field',
            field=models.CharField(default='', max_length=150),
        ),
    ]
