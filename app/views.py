from random import randint
from transliterate import translit

from django.http import HttpResponse
from django.shortcuts import render

from .models import Film, Category

# Create your views here.
def index(request):
    category_list = []
    for i, category in enumerate(Category.objects.all()):
        category_list.append({
            'object': category, 
            'translit': translit(category.title, "ru", reversed=True),
            'image_path': f'{i + 2}.jpg'
        })
    context = {'category_list': category_list}
    return render(request, 'app/index.html', context)

def detail(request, film_id):
    title = Film.objects.filter(id=film_id)[0].title
    return HttpResponse("Это страница фильма под названием: %s" % title)
