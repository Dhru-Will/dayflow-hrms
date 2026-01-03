from datetime import date
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response

from django.db.models import Count

from .models import Attendance, Leave, EmployeeProfile
from .serializers import AttendanceSerializer, LeaveSerializer
from .utils import generate_login_id, generate_temp_password


# -------------------------------------------------------------------
# ROOT
# -------------------------------------------------------------------
def home(request):
    return JsonResponse({"message": "Dayflow HRMS Backend is running"})


# -------------------------------------------------------------------
# AUTH
# -------------------------------------------------------------------
@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def api_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if not user or not user.is_active:
        return Response({"error": "Invalid credentials"}, status=401)

    login(request, user)

    profile, _ = EmployeeProfile.objects.get_or_create(
        user=user, defaults={"is_first_login": False}
    )

    today = timezone.now().date()
    now = timezone.now().time()

    attendance, created = Attendance.objects.get_or_create(
        user=user,
        date=today,
        defaults={"check_in": now, "status": "Present"}
    )

    if not created and attendance.check_out:
        attendance.check_out = None
        attendance.save()

    return Response({
        "message": "Login successful",
        "first_login": profile.is_first_login
    })


@csrf_exempt
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def api_logout(request):
    today = timezone.now().date()
    now = timezone.now().time()

    attendance = Attendance.objects.filter(
        user=request.user,
        date=today
    ).first()

    if attendance and not attendance.check_out:
        attendance.check_out = now
        attendance.save()

    logout(request)
    return Response({"message": "Logout successful"})


# -------------------------------------------------------------------
# ATTENDANCE
# -------------------------------------------------------------------
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def check_in(request):
    today = timezone.now().date()

    if Attendance.objects.filter(user=request.user, date=today).exists():
        return Response({"error": "Already checked in"}, status=400)

    attendance = Attendance.objects.create(
        user=request.user,
        date=today,
        check_in=timezone.now().time(),
        status="Present"
    )
    return Response(AttendanceSerializer(attendance).data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def check_out(request):
    attendance = Attendance.objects.filter(
        user=request.user,
        date=timezone.now().date()
    ).first()

    if not attendance:
        return Response({"error": "No check-in found"}, status=400)

    attendance.check_out = timezone.now().time()
    attendance.save()
    return Response(AttendanceSerializer(attendance).data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_attendance(request):
    records = Attendance.objects.filter(user=request.user)
    return Response(AttendanceSerializer(records, many=True).data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def all_attendance(request):
    records = Attendance.objects.all().order_by("-date")
    return Response(AttendanceSerializer(records, many=True).data)


# -------------------------------------------------------------------
# LEAVES
# -------------------------------------------------------------------
@csrf_exempt
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def apply_leave(request):
    serializer = LeaveSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user, status="pending")
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_leaves(request):
    leaves = Leave.objects.filter(user=request.user)
    return Response(LeaveSerializer(leaves, many=True).data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def all_leaves(request):
    leaves = Leave.objects.all()
    return Response(LeaveSerializer(leaves, many=True).data)


@csrf_exempt
@api_view(["PUT"])
@permission_classes([IsAdminUser])
def approve_leave(request, leave_id):
    leave = Leave.objects.get(id=leave_id)
    leave.status = "approved"
    leave.save()
    return Response({"status": "approved"})


@csrf_exempt
@api_view(["PUT"])
@permission_classes([IsAdminUser])
def reject_leave(request, leave_id):
    leave = Leave.objects.get(id=leave_id)
    leave.status = "rejected"
    leave.save()
    return Response({"status": "rejected"})


# -------------------------------------------------------------------
# EMPLOYEE CREATION (ADMIN)
# -------------------------------------------------------------------
@csrf_exempt
@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_employee(request):
    data = request.data

    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    joining_date = data.get("joining_date")

    if not all([first_name, last_name, email, joining_date]):
        return Response({"error": "Missing fields"}, status=400)

    year = int(joining_date.split("-")[0])
    username = generate_login_id(first_name, last_name, year)
    temp_password = generate_temp_password()

    user = User.objects.create_user(
        username=username,
        password=temp_password,
        first_name=first_name,
        last_name=last_name,
        email=email
    )

    EmployeeProfile.objects.create(user=user, is_first_login=True)

    return Response({
        "message": "Employee created",
        "login_id": username,
        "temporary_password": temp_password
    })


# -------------------------------------------------------------------
# PASSWORD
# -------------------------------------------------------------------
@csrf_exempt
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user

    if not user.check_password(request.data.get("old_password")):
        return Response({"error": "Old password incorrect"}, status=400)

    if request.data.get("new_password") != request.data.get("confirm_password"):
        return Response({"error": "Passwords do not match"}, status=400)

    user.set_password(request.data.get("new_password"))
    user.save()

    profile = EmployeeProfile.objects.get(user=user)
    profile.is_first_login = False
    profile.save()

    logout(request)
    return Response({"message": "Password changed"})


# -------------------------------------------------------------------
# DASHBOARDS
# -------------------------------------------------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def employee_dashboard(request):
    user = request.user
    today = date.today()

    today_attendance = Attendance.objects.filter(user=user, date=today).first()

    return Response({
        "today_status": today_attendance.status if today_attendance else "Absent"
    })


@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_dashboard(request):
    today = date.today()
    total = User.objects.filter(is_staff=False).count()
    present = Attendance.objects.filter(date=today, status="Present").count()

    return Response({
        "employees": total,
        "present_today": present,
        "absent_today": total - present
    })


# -------------------------------------------------------------------
# EMPLOYEE MANAGEMENT
# -------------------------------------------------------------------
@api_view(["GET"])
@permission_classes([IsAdminUser])
def list_employees(request):
    users = User.objects.filter(is_staff=False)
    return Response([{
        "id": u.id,
        "username": u.username,
        "name": f"{u.first_name} {u.last_name}",
        "email": u.email,
        "is_active": u.is_active
    } for u in users])


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_profile(request):
    u = request.user
    return Response({
        "username": u.username,
        "name": f"{u.first_name} {u.last_name}",
        "email": u.email,
        "is_active": u.is_active
    })


@api_view(["GET"])
@permission_classes([IsAdminUser])
def employee_detail(request, employee_id):
    u = User.objects.get(id=employee_id, is_staff=False)
    return Response({
        "id": u.id,
        "username": u.username,
        "email": u.email,
        "is_active": u.is_active
    })


@csrf_exempt
@api_view(["PUT"])
@permission_classes([IsAdminUser])
def toggle_employee_status(request, employee_id):
    u = User.objects.get(id=employee_id, is_staff=False)
    u.is_active = not u.is_active
    u.save()
    return Response({
        "message": "Status updated",
        "is_active": u.is_active
    })
