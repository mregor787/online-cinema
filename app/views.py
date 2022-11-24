from django.http import HttpResponse
from django.shortcuts import render

from .models import Film

# Create your views here.
def index(request):
    films_list = Film.objects.order_by('title')[:5]
    context = {'films_list': films_list}
    return render(request, 'app/index.html', context)

def detail(request, film_id):
    title = Film.objects.filter(id=film_id)[0].title
    return HttpResponse("Это страница фильма под названием: %s" % title)
