import imp
from django.contrib import admin
from .models import Genre, Film, Category

# Register your models here.
admin.site.register(Genre)
admin.site.register(Film)
admin.site.register(Category)
