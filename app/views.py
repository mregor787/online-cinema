from django.shortcuts import render

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
    return render(request, 'app/index.html', context)

def category(request, category_id):
    context = base_context()
    category = {'object': Category.objects.filter(id=category_id)[0]}
    category['title'] = category['object'].get_plural().capitalize()
    films = Film.objects.filter(category=category['object'].id).order_by('create_date')
    context['films'] = films
    context['category'] = category
    return render(request, 'app/category.html', context)
