# Student-Managent-System
# Student Management System - Flask Application

A complete web-based Student Management System built with Flask and MySQL, featuring user authentication, student registration, course management, attendance tracking, and marks management.

## Features

✅ **Admin Login** - Secure authentication with password hashing  
✅ **Student Management** - Add, view, update, and delete student records  
✅ **Course Management** - Create and manage courses  
✅ **Student Search** - Search students by name, email, or ID  
✅ **Dashboard** - View statistics (total students, courses, users)  
✅ **Student Details** - View comprehensive student information including marks and attendance  
✅ **Responsive UI** - Bootstrap-based responsive design  

## Prerequisites

- Python 3.7+
- MySQL Server 8.0+
- pip (Python package manager)

## Installation & Setup

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set Up MySQL Database

First, ensure MySQL Server is running, then import the database schema:

```bash
mysql -u root -p < database.sql
```

When prompted, enter your MySQL root password.

### 3. Configure Database Connection

Edit `app.py` and update the `db_config` with your MySQL credentials:

```python
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'your_mysql_password',  # ← Update this
    'database': 'mydb'
}
```

Also update `init_db.py` with the same credentials.

### 4. Initialize Demo Data

```bash
python init_db.py
```

This will:
- Create an admin user (username: `admin`, password: `admin123`)
- Add sample courses
- Add demo student records

## Running the Application

```bash
python app.py
```

The application will start at `http://localhost:5000`

## Demo Login Credentials

- **Username:** admin
- **Password:** admin123

## Project Structure

```
student_management_system/
├── app.py                          # Main Flask application
├── database.sql                    # MySQL database schema
├── init_db.py                      # Database initialization script
├── requirements.txt                # Python dependencies
├── templates/                      # HTML templates
│   ├── base.html                   # Base template with navigation
│   ├── login.html                  # Login page
│   ├── dashboard.html              # Dashboard with statistics
│   ├── index.html                  # Student list with search
│   ├── add_student.html            # Add student form
│   ├── update_student.html         # Edit student form
│   ├── student_details.html        # View student details
│   ├── courses.html                # Course list
│   └── add_course.html             # Add course form
└── README.md                       # This file
```

## Database Schema

The application uses the following main tables:

- **user** - Admin user accounts
- **student** - Student records
- **courses** - Course information
- **attendance** - Student attendance records
- **marks** - Student marks/grades

## Features in Detail

### Authentication
- Admin login with secure password hashing
- Session management
- Route protection for authenticated pages

### Student Management
- **Add Student** - Register new students with ID, name, email, phone, and course
- **View Students** - List all students with course information
- **Search Students** - Find students by name, email, or student ID
- **View Details** - See full student profile including marks and attendance
- **Update Student** - Modify student information
- **Delete Student** - Remove student records

### Course Management
- **View Courses** - List all available courses
- **Add Course** - Create new courses
- **Delete Course** - Remove courses from the system

### Dashboard
- Total students count
- Total courses count
- Total users count
- Quick action buttons



## Future Enhancements

- Email notifications
- Attendance tracking UI
- Grades/marks entry interface
- Report generation
- Student performance analytics
- Email verification for student registration
- Batch student import from CSV


