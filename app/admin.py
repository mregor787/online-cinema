import imp
from django.contrib import admin
from .models import Genre, Film

# Register your models here.
admin.site.register(Genre)
admin.site.register(Film)
