from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('category/<int:category_id>/', views.category, name='category'),
    path('film/<int:film_id>/', views.film, name='film'),
    path('search/', views.search, name='search'),
]