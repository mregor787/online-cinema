from random import randint
from transliterate import translit

from django.http import HttpResponse
from django.shortcuts import render

from .models import Film, Category

# Create your views here.
def index(request):
#    films_list = Film.objects.order_by('title')[:5]
#   context = {'films_list': films_list}
#    return render(request, 'app/index.html', context)
    category_list = []
    for category in Category.objects.all():
        category_list.append((category, translit(category.title, "ru", reversed=True))) 
    slider_dict = {}
    for category in category_list:
        films = Film.objects.filter(category=category[0].id)
        if films.count():
            slider_dict[category[0].title] = films[randint(1, films.count()) - 1]
    context = {'slider_dict': slider_dict, 'category_list': category_list}
    return render(request, 'app/test.html', context)

def detail(request, film_id):
    title = Film.objects.filter(id=film_id)[0].title
    return HttpResponse("Это страница фильма под названием: %s" % title)
