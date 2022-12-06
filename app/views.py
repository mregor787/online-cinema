from django.shortcuts import render

from .models import Film, Category

# Create your views here.
def index(request):
    categories = []
    for i, category in enumerate(Category.objects.all()):
        categories.append({
            'object': category,
            'title': category.get_plural().capitalize(),
            'image_path': f'{i + 2}.jpg'
        })
    context = {'categories': categories}
    return render(request, 'app/index.html', context)

def category(request, category_id):
    categories = []
    for category in Category.objects.all():
        categories.append({
            'object': category,
            'title': category.get_plural().capitalize()
        })
    category = {'object': Category.objects.filter(id=category_id)[0]}
    category['title'] = category['object'].get_plural().capitalize()
    films = Film.objects.filter(category=category['object'].id).order_by('create_date')
    context = {'films': films, 'category': category, 'categories': categories}
    return render(request, 'app/category.html', context)
