from rest_framework import serializers
from .models import Employee, Attendance


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            'employee_id',
            'full_name',
            'department',
            'email',
        ]

class AttendanceDetailSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    status_display = serializers.CharField(
        source='get_status_display',
        read_only=True
    )

    class Meta:
        model = Attendance
        fields = [
            'id',
            'employee',
            'date',
            'status',
            'status_display',
            'created_at',
        ]

class AttendanceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = [
            'employee',
            'date',
            'status',
            'created_at',
        ]
        
    def validate(self, data):
        if Attendance.objects.filter(
            employee=data['employee'],
            date=data['date']
        ).exists():
            raise serializers.ValidationError(
                "Attendance already marked for this date."
            )
        return data

class AttendanceSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(
        source='get_status_display',
        read_only=True
    )

    class Meta:
        model = Attendance
        fields = [
            'id',
            'employee',
            'date',
            'status',
            'status_display',
        ]
