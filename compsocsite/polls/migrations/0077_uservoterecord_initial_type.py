# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-01-16 17:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0076_auto_20170116_0059'),
    ]

    operations = [
        migrations.AddField(
            model_name='uservoterecord',
            name='initial_type',
            field=models.IntegerField(default=0),
        ),
    ]
