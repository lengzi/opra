# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-22 15:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0054_merge'),
    ]

    operations = [
        migrations.AddField(
            model_name='response',
            name='anonymous_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]