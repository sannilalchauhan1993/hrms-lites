from django.db import models

# Create your models here.
class Employee(models.Model):
    employee_id = models.CharField(
        max_length=10,
        primary_key=True,
        editable=False
    )
    full_name = models.CharField(max_length=50)
    department = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    created_at=models.DateTimeField(auto_now=True)
    

    def save(self, *args, **kwargs):
        if not self.employee_id:
            last_employee = Employee.objects.order_by('-employee_id').first()
            if last_employee:
                last_id = int(last_employee.employee_id.replace('EMP', ''))
                new_id = last_id + 1
            else:
                new_id = 1

            self.employee_id = f"EMP{new_id:03d}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee_id} - {self.full_name}"

class Attendance(models.Model):

    PRESENT = 'P'
    ABSENT = 'A'

    STATUS_CHOICES = [
        (PRESENT, 'Present'),
        (ABSENT, 'Absent'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(
        max_length=1,
        choices=STATUS_CHOICES,
        default=PRESENT
    )
    created_at=models.DateTimeField(auto_now=True)
    class Meta:
        unique_together = ('employee', 'date')
    def __str__(self):
        return f"{self.employee.full_name} - {self.date} - {self.get_status_display()}"
