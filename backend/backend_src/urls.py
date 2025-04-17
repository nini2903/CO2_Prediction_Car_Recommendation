from django.urls import path

from . import views

urlpatterns = [
    path("predict", views.predict_co2, name="predict_co2"),
    path("recommend", views.recommender, name="recommender")
]