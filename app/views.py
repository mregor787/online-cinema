from random import randint
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib import messages

from .models import Film, Category

def base_context():
    categories = []
    for category in Category.objects.all():
        categories.append({
            'object': category,
            'title': category.get_plural().capitalize()
        })
    context = {'categories': categories}
    return context

def index(request):
    context = base_context()
    for i in range(len(context['categories'])):
        context['categories'][i]['image_path'] = f'{i + 2}.jpg'
        films = Film.objects.filter(category=context['categories'][i]['object'].id)
        films_num = films.count()
        if films_num:
            context['categories'][i]['random_film'] = films[randint(1, films_num) - 1]
    return render(request, 'app/index.html', context)

def category(request, category_id):
    context = base_context()
    category = {'object': Category.objects.filter(id=category_id)[0]}
    category['title'] = category['object'].get_plural().capitalize()
    films = Film.objects.filter(category=category['object'].id).order_by('create_date')
    context['films'] = films
    context['category'] = category
    return render(request, 'app/category.html', context)

def film(request, film_id):
    context = base_context()
    film = Film.objects.filter(id=film_id)[0]
    context['film'] = film
    return render(request, 'app/film.html', context)

def search(request):
    context = base_context()
    query = request.GET.get('search_input')
    context['query'] = query
    films = Film.objects.filter(title__icontains=query)
    context['films'] = films
    return render(request, 'app/search.html', context)

def register(request):
    context = base_context()
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Регистрация прошла успешно.')
            return redirect('index')
        messages.error(request, 'Ошибка регистрации. Форма не прошла валидацию.')
    form = UserCreationForm()
    context['register_form'] = form
    return render(request, 'registration/register.html', context)
