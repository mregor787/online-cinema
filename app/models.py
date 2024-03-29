from email.policy import default
from operator import mod
from pyexpat import model
from statistics import mode
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

class Genre(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.title

class Category(models.Model):
    title = models.CharField(max_length=100)

    def get_plural(self) -> str:
        if self.title == 'аниме':
            return self.title
        return self.title + 'ы'

    def __str__(self) -> str:
        return self.title

class Film(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    year = models.IntegerField()
    logo_path = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    genres = models.ManyToManyField(Genre)
    kinopoisk_id = models.IntegerField(default=0)
    create_date = models.DateTimeField('date created', default=timezone.now)

    def __str__(self) -> str:
        return self.title

class History(models.Model):
    film = models.ForeignKey(Film, on_delete=models.CASCADE, default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    create_date = models.DateTimeField('date created', default=timezone.now)

class Favorite(models.Model):
    film = models.ForeignKey(Film, on_delete=models.CASCADE, default=1)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    create_date = models.DateTimeField('date created', default=timezone.now)
