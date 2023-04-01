from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from django.urls import path

from core.views import MyTokenObtainPairView
from .views.users import users
from .views.trailers import trailers, trailers_location, trailer_logs


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', users),
    path('assets/trailers/', trailers),
    path('assets/trailers/location', trailers_location),
    path('assets/trailers/logs', trailer_logs)
]