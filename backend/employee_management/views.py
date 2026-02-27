from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Employee, Attendance
from rest_framework.permissions import IsAuthenticated

from .serializers import (
    EmployeeSerializer,
    AttendanceDetailSerializer,
    AttendanceCreateSerializer
)

# Create your views here.
class AttendanceViewSet(ModelViewSet):
    queryset = Attendance.objects.all()
    # permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return AttendanceCreateSerializer
        return AttendanceDetailSerializer
    
class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    # permission_classes = [IsAuthenticated]