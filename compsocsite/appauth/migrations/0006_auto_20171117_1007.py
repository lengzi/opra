# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-11-17 15:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appauth', '0005_auto_20170306_1628'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='age',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='mturk',
            field=models.IntegerField(default=0),
        ),
    ]