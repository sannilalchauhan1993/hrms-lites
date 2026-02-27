from django.contrib import admin
from .models import Employee, Attendance

# Register your models here.
admin.site.site_header = "HRM Lite Admin"
admin.site.site_title = "HRM Lite Admin Portal"
admin.site.index_title = "Welcome to HRM Lite Admin Portal"

admin.site.register(Employee)
admin.site.register(Attendance)