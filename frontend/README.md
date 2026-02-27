# hrms-lites

HRMS Lite is a simple and modern web application for managing employees and tracking daily attendance.  
It is built using React (Frontend), FastAPI (Backend), and PostgreSQL (Database).

---

## 🚀 Features

### 👨‍💼 Employee Management
- Add new employees
- View all employees
- Search employees by name, ID, email, or department
- Delete employees
- Prevent duplicate employee ID and email

### 📅 Attendance Management
- Mark attendance (Present / Absent)
- View attendance records
- Filter attendance by employee or date
- Prevent duplicate attendance for the same date

### 📊 Dashboard
- Total employees count
- Today's attendance summary
- Present and Absent count

---

## 🛠 Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- CSS3

### Backend
- Django Rest Framework
- SQLAlchemy
- PostgreSQL

---

## 📋 Prerequisites

Make sure you have installed:

- Node.js (18+)
- Python (3.9+)
- PostgreSQL (12+)

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd HRMS

cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create database in PostgreSQL
CREATE DATABASE hrms_db;

# Update DATABASE_URL inside .env file


http://localhost:8000


cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

http://localhost:5173


HRMS-LITES/
│
├── backend/
│   ├── employee_management/
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env.example
│
└── README.md


🔌 API Endpoints

## Employees
POST /api/employees
GET /api/employees
DELETE /api/employees/{id}

## Attendance

POST /api/attendance
GET /api/attendance/{employee_id}
GET /api/attendance?date=YYYY-MM-DD

## Validations

Email format validation
Duplicate employee ID prevention
Duplicate email prevention
Duplicate attendance prevention
Employee existence validation

## Limitations

No authentication system
No employee edit option
No attendance edit option
No payroll system
No file uploads

