from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, AttendanceViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path, include


router = DefaultRouter()
router.register('employees', EmployeeViewSet)
router.register('attendance', AttendanceViewSet)

urlpatterns = [
    # API routes from ViewSets
    path('', include(router.urls)),

    # Token Authentication (FUNCTION VIEW)
    path('token/', obtain_auth_token, name='api_token_auth'),
]