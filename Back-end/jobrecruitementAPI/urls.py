from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginView, PlatformUserViewSet, LogoutView  # Adjust the import as needed

router = DefaultRouter()
router.register('signup', PlatformUserViewSet, basename='signup') 

urlpatterns = [
    path('', include(router.urls)),  # Include the router's URLs
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]