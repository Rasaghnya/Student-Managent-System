# a frontend application of student management system
# this python application should focus on -
    # student_registration(add/delete/update)
    # course / class management
    # student details view
    # login in system (admin)
    # search student
    # dashboard( total students and courses)

from flask import Flask, render_template, request, redirect, url_for, flash, session
import mysql.connector
from mysql.connector import Error
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

app = Flask(
    __name__,
    static_folder="static",
    template_folder="templates"
)
app = Flask(
    __name__,
    static_folder="static",
    template_folder="templates"
)
app.secret_key = "student_management_secret_key"

# MySQL Database Configuration
import mysql.connector

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # Add your MySQL password here if any
    'database': 'mydb'
}

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",   # 👈 if you have password, put it here
            database="mydb"
        )
        return conn
    except Exception as e:
        print("❌ Database connection error:", e)
        return None


def login_required(f):
    """Decorator to check if user is logged in"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please login first', 'danger')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

# ==================== AUTHENTICATION ROUTES ====================
@app.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True, buffered=True)

        cursor.execute(
            'SELECT * FROM users WHERE name = %s',
            (username,)
        )
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user and generate_password_hash("admin123"):
            session['user_id'] = user['id']
            session['username'] = user['name']
            session['role'] = user['role']
            flash(f'Welcome {username}!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password', 'danger')

    return render_template('login.html')


@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out', 'success')
    return redirect(url_for('login'))

# ==================== DASHBOARD ROUTE ====================
@app.route('/dashboard')
@login_required
def dashboard():
    conn = get_db_connection()
    total_students = 0
    total_courses = 0
    total_users = 0

    if conn:
        cursor = conn.cursor(dictionary=True)

        # users table EXISTS
        cursor.execute("SELECT COUNT(*) AS count FROM students")
        total_students = cursor.fetchone()['count']

        cursor.execute("SELECT COUNT(*) AS count FROM courses")
        total_courses = cursor.fetchone()['count']


        cursor.close()
        conn.close()

    return render_template(
        'dashboard.html',
        total_students=total_students,
        total_courses=total_courses,
        total_users=total_users
    )

# ==================== STUDENT ROUTES ====================
@app.route('/add_student', methods=['GET', 'POST'])
@login_required
def add_student():
    if request.method == 'POST':
        name = request.form['name']
        age = request.form['age']
        course = request.form['course']

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO students (name, age, course) VALUES (%s, %s, %s)",
            (name, age, course)
        )

        conn.commit()
        cursor.close()
        conn.close()

        flash('Student added successfully!', 'success')
        return redirect(url_for('view_students'))

    return render_template('add_student.html')
@app.route('/students')
@login_required
def view_students():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM students")
    students = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template('students.html', students=students)

# ==================== COURSE ROUTES ====================
@app.route('/add_course', methods=['GET', 'POST'])
@login_required
def add_course():
    if request.method == 'POST':
        course_name = request.form['course_name']
        duration = request.form['duration']

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO courses (course_name, duration) VALUES (%s, %s)",
            (course_name, duration)
        )

        conn.commit()
        cursor.close()
        conn.close()

        flash('Course added successfully!', 'success')
        return redirect(url_for('view_courses'))

    return render_template('add_course.html')


@app.route('/courses')
@login_required
def view_courses():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM courses")
    courses = cursor.fetchall()

    cursor.close()
    conn.close()

    return render_template('courses.html', courses=courses)


if __name__ == '__main__':
    app.run(debug=True)
