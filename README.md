# Student Management System (Flask + MySQL)

This is a web-based **Student Management System** built using **Flask** and **MySQL**.  
It is designed as a beginner-friendly project to understand backend development, database integration, and basic UI design.

---

## Features (Implemented)

✅ Admin Login with password hashing  
✅ Add new students  
✅ View all students  
✅ Add new courses  
✅ View all courses  
✅ Dashboard with total students & total courses  
✅ Session-based authentication  
✅ Sidebar navigation & responsive UI  

---

## Technologies Used

- Python (Flask)
- MySQL
- HTML, CSS (Bootstrap)
- JavaScript
- Jinja2 Templates

---

## Project Structure

```text
Student-Management-System/
├── app.py
├── README.md
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── templates/
    ├── base.html
    ├── login.html
    ├── dashboard.html
    ├── students.html
    ├── add_student.html
    ├── courses.html
    └── add_course.html
---

## Database Tables Used

- **users** – Admin login details  
- **students** – Student information  
- **courses** – Course details  

---

## Login System

- Passwords are stored using `generate_password_hash`
- Login is verified using `check_password_hash`
- Session-based authentication protects routes

---

## How to Run the Project

1. Start MySQL server (XAMPP / MySQL Server)
2. Create a database (for example: `mydb`)
3. Update database credentials in `app.py`
4. Install dependencies:
   ```bash
   pip install flask mysql-connector-python werkzeug
