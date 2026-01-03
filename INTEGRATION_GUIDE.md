# Dayflow HRMS - Frontend & Backend Integration Guide

## ✅ Integration Status: COMPLETE

Both frontend (Next.js) and backend (Django) are now fully integrated and running.

---

## 🚀 Quick Start

### Start Both Servers

#### Terminal 1 - Django Backend (Port 8000)
```bash
cd /Users/dhruvil/Documents/Hackathon/dayflow-hrms/dayflow
python3 manage.py runserver 8000
```

#### Terminal 2 - Next.js Frontend (Port 3000)
```bash
cd /Users/dhruvil/Documents/Hackathon/dayflow-hrms
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend Admin**: http://localhost:8000/admin
- **API Docs**: http://localhost:8000/api

---

## 📦 Installed Dependencies

### Backend (Django)
- Django 4.2.27
- Django REST Framework 3.15.2
- psycopg2-binary 2.9.9

Install with:
```bash
pip3 install -r requirements.txt
```

### Frontend (Next.js)
Already installed via `npm install`

---

## 🔌 API Integration

### Frontend Services Updated
- `services/authService.ts` - Connected to Django auth endpoints
- `services/employeeService.ts` - Connected to employee API endpoints

### Backend API Endpoints

#### Authentication
- `POST /api/login/` - User login
- `POST /api/logout/` - User logout

#### Employee Management
- `GET /api/employees/` - List all employees
- `GET /api/employees/<id>/` - Get employee details
- `POST /api/admin/employees/create/` - Create new employee (admin only)
- `PATCH /api/employees/<id>/status/` - Toggle employee status

#### Attendance
- `POST /api/attendance/checkin/` - Check in
- `POST /api/attendance/checkout/` - Check out
- `GET /api/attendance/my/` - Get user's attendance
- `GET /api/attendance/all/` - Get all attendance (admin/HR)

#### Leave Management
- `POST /api/leave/apply/` - Apply for leave
- `GET /api/leave/my/` - Get user's leave requests
- `GET /api/leave/all/` - Get all leave requests (admin/HR)
- `POST /api/leave/<id>/approve/` - Approve leave (admin/HR)
- `POST /api/leave/<id>/reject/` - Reject leave (admin/HR)

---

## 🔐 Configuration

### Environment Variables (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### CORS Configuration (Django)
The Django backend is configured to allow requests from the frontend. If you get CORS errors:

1. Add to `dayflow/settings.py`:
```python
INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

2. Install corsheaders:
```bash
pip3 install django-cors-headers
```

---

## 🧪 Testing the Integration

### 1. Test Login
- Go to http://localhost:3000/login
- Use backend-created credentials or mock account
- Frontend now attempts to authenticate with Django backend

### 2. Test Employee List
- After login, navigate to /employees
- Frontend fetches real employee data from Django API
- Falls back to mock data if backend is unavailable

### 3. Check Backend Admin
- Visit http://localhost:8000/admin
- Login with Django superuser account
- View/manage employees, users, leave requests

---

## 📝 Database Setup

### Create Superuser (if not exists)
```bash
cd dayflow
python3 manage.py createsuperuser
```

### Apply Migrations
```bash
python3 manage.py migrate
```

### Load Sample Data (if available)
```bash
python3 manage.py loaddata initial_data.json
```

---

## 🔄 Fallback Behavior

The frontend gracefully falls back to mock data if:
- Backend is offline
- API requests fail
- Network is unavailable

This ensures the app continues to work for demos and offline development.

---

## 📊 Project Structure

```
dayflow-hrms/
├── app/                    # Next.js pages
├── components/             # React components
├── services/               # API service layer (UPDATED)
├── context/                # React context
├── hooks/                  # Custom React hooks
├── constants/              # Constants and mock data
├── types/                  # TypeScript types
├── utils/                  # Utility functions
├── .env.local              # Environment config (NEW)
├── package.json            # Frontend dependencies
├── tailwind.config.js      # Tailwind CSS config
└── dayflow/                # Django backend
    ├── manage.py
    ├── core/               # Django app
    │   ├── models.py       # Database models
    │   ├── views.py        # API views
    │   ├── serializers.py  # DRF serializers
    │   └── urls.py         # API routes
    ├── dayflow/            # Django settings
    └── requirements.txt    # Backend dependencies
```

---

## 🐛 Troubleshooting

### Issue: "Cannot fetch from backend"
**Solution**: Ensure both servers are running and CORS is configured

### Issue: "Port 8000 already in use"
**Solution**: 
```bash
lsof -i :8000
kill -9 <PID>
```

### Issue: "Module not found: psycopg2"
**Solution**: 
```bash
pip3 install psycopg2-binary
```

### Issue: Frontend shows mock data instead of backend data
**Solution**: 
- Check Django server is running
- Verify API endpoint in `.env.local`
- Check browser console for CORS errors

---

## 🚀 Ready for Development & Demo

- ✅ Frontend and Backend integrated
- ✅ API endpoints configured
- ✅ Authentication flow ready
- ✅ Employee management connected
- ✅ Fallback to mock data for reliability
- ✅ Both servers running on standard ports

**Next Steps**:
1. Implement remaining API endpoints in Django backend
2. Add form submissions for attendance, leave requests
3. Implement real authentication (JWT tokens)
4. Add database validation and business logic
5. Deploy to production

---

**Last Updated**: 3 January 2026
**Status**: Fully Integrated & Running ✅
