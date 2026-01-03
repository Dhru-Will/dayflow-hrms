
from django.urls import path
from . import views

urlpatterns = [
    path("attendance/checkin/", views.check_in),
    path("attendance/checkout/", views.check_out),
    path("attendance/my/", views.my_attendance),
    path("attendance/all/", views.all_attendance),
    path("admin/employees/create/", views.create_employee),
]

urlpatterns += [
    path("leave/apply/", views.apply_leave),
    path("leave/my/", views.my_leaves),
    path("leave/all/", views.all_leaves),
    path("leave/<int:leave_id>/approve/", views.approve_leave),
    path("leave/<int:leave_id>/reject/", views.reject_leave),
    path("change-password/", views.change_password),
    path("dashboard/employee/", views.employee_dashboard),
    path("dashboard/admin/", views.admin_dashboard),
    path("employees/", views.list_employees),
    path("profile/", views.my_profile),
    path("employees/<int:employee_id>/", views.employee_detail),
    path("employees/<int:employee_id>/status/", views.toggle_employee_status),
]

urlpatterns += [
    path("login/", views.api_login),
    path("logout/", views.api_logout),
]
