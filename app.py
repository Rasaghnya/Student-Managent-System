
    
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

app = Flask(__name__)
app.secret_key = 'student_management_secret_key_2024'

# MySQL Database Configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # Add your MySQL password here
    'database': 'mydb'
}

def get_db_connection():
    """Establish MySQL database connection"""
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
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
        if conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute('SELECT * FROM user WHERE user_name = %s', (username,))
            user = cursor.fetchone()
            cursor.close()
            conn.close()
            
            if user and check_password_hash(user['password'], password):
                session['user_id'] = user['user_id']
                session['username'] = user['user_name']
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
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT COUNT(*) as count FROM student')
        total_students = cursor.fetchone()['count']
        cursor.execute('SELECT COUNT(*) as count FROM courses')
        total_courses = cursor.fetchone()['count']
        cursor.execute('SELECT COUNT(*) as count FROM user')
        total_users = cursor.fetchone()['count']
        cursor.close()
        conn.close()
        return render_template('dashboard.html', 
                             total_students=total_students,
                             total_courses=total_courses,
                             total_users=total_users)
    return render_template('dashboard.html', total_students=0, total_courses=0, total_users=0)

# ==================== STUDENT ROUTES ====================

@app.route('/')
@app.route('/students')
@login_required
def index():
    search_query = request.args.get('search', '')
    conn = get_db_connection()
    students = []
    if conn:
        cursor = conn.cursor(dictionary=True)
        if search_query:
            cursor.execute('''SELECT s.*, c.course_name FROM student s 
                           LEFT JOIN courses c ON s.course_id = c.course_id 
                           WHERE s.s_name LIKE %s OR s.s_email LIKE %s OR s.student_id LIKE %s''',
                         (f'%{search_query}%', f'%{search_query}%', f'%{search_query}%'))
        else:
            cursor.execute('''SELECT s.*, c.course_name FROM student s 
                           LEFT JOIN courses c ON s.course_id = c.course_id''')
        students = cursor.fetchall()
        cursor.close()
        conn.close()
    return render_template('index.html', students=students, search_query=search_query)

@app.route('/student/<student_id>')
@login_required
def student_details(student_id):
    conn = get_db_connection()
    student = None
    marks = []
    attendance = None
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('''SELECT s.*, c.course_name FROM student s 
                       LEFT JOIN courses c ON s.course_id = c.course_id 
                       WHERE s.student_id = %s''', (student_id,))
        student = cursor.fetchone()
        
        if student:
            cursor.execute('SELECT * FROM marks WHERE student_id = %s', (student_id,))
            marks = cursor.fetchall()
            cursor.execute('SELECT * FROM attendance WHERE student_id = %s', (student_id,))
            attendance = cursor.fetchall()
        cursor.close()
        conn.close()
    
    if not student:
        flash('Student not found', 'danger')
        return redirect(url_for('index'))
    return render_template('student_details.html', student=student, marks=marks, attendance=attendance)

@app.route('/add_student', methods=('GET', 'POST'))
@login_required
def add_student():
    conn = get_db_connection()
    courses = []
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM courses')
        courses = cursor.fetchall()
    
    if request.method == 'POST':
        student_id = request.form['student_id']
        s_name = request.form['s_name']
        s_email = request.form['s_email']
        s_phone = request.form['s_phone']
        course_id = request.form['course_id']
        
        conn = get_db_connection()
        if conn:
            cursor = conn.cursor()
            try:
                cursor.execute('''INSERT INTO student 
                              (student_id, s_name, s_email, s_phone, course_id, 
                               attendence_attendence_id, user_user_id, marks_marks_id)
                              VALUES (%s, %s, %s, %s, %s, 1, 1, 1)''',
                            (student_id, s_name, s_email, s_phone, course_id))
                conn.commit()
                flash('Student added successfully!', 'success')
                cursor.close()
                conn.close()
                return redirect(url_for('index'))
            except Error as e:
                flash(f'Error: {str(e)}', 'danger')
                cursor.close()
                conn.close()
    
    if conn:
        conn.close()
    return render_template('add_student.html', courses=courses)

@app.route('/update_student/<student_id>', methods=('GET', 'POST'))
@login_required
def update_student(student_id):
    conn = get_db_connection()
    student = None
    courses = []
    
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM student WHERE student_id = %s', (student_id,))
        student = cursor.fetchone()
        cursor.execute('SELECT * FROM courses')
        courses = cursor.fetchall()
    
    if not student:
        flash('Student not found', 'danger')
        return redirect(url_for('index'))
    
    if request.method == 'POST':
        s_name = request.form['s_name']
        s_email = request.form['s_email']
        s_phone = request.form['s_phone']
        course_id = request.form['course_id']
        
        conn = get_db_connection()
        if conn:
            cursor = conn.cursor()
            try:
                cursor.execute('''UPDATE student SET s_name = %s, s_email = %s, 
                              s_phone = %s, course_id = %s WHERE student_id = %s''',
                            (s_name, s_email, s_phone, course_id, student_id))
                conn.commit()
                flash('Student updated successfully!', 'success')
                cursor.close()
                conn.close()
                return redirect(url_for('student_details', student_id=student_id))
            except Error as e:
                flash(f'Error: {str(e)}', 'danger')
                cursor.close()
                conn.close()
    
    if conn:
        conn.close()
    return render_template('update_student.html', student=student, courses=courses)

@app.route('/delete_student/<student_id>', methods=('POST',))
@login_required
def delete_student(student_id):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute('DELETE FROM student WHERE student_id = %s', (student_id,))
            conn.commit()
            flash('Student deleted successfully!', 'success')
        except Error as e:
            flash(f'Error: {str(e)}', 'danger')
        cursor.close()
        conn.close()
    return redirect(url_for('index'))

# ==================== COURSE ROUTES ====================

@app.route('/courses')
@login_required
def courses():
    conn = get_db_connection()
    courses_list = []
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT * FROM courses')
        courses_list = cursor.fetchall()
        cursor.close()
        conn.close()
    return render_template('courses.html', courses=courses_list)

@app.route('/add_course', methods=('GET', 'POST'))
@login_required
def add_course():
    if request.method == 'POST':
        course_name = request.form['course_name']
        conn = get_db_connection()
        if conn:
            cursor = conn.cursor()
            try:
                cursor.execute('INSERT INTO courses (course_name) VALUES (%s)', (course_name,))
                conn.commit()
                flash('Course added successfully!', 'success')
                cursor.close()
                conn.close()
                return redirect(url_for('courses'))
            except Error as e:
                flash(f'Error: {str(e)}', 'danger')
                cursor.close()
                conn.close()
    return render_template('add_course.html')

@app.route('/delete_course/<int:course_id>', methods=('POST',))
@login_required
def delete_course(course_id):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute('DELETE FROM courses WHERE course_id = %s', (course_id,))
            conn.commit()
            flash('Course deleted successfully!', 'success')
        except Error as e:
            flash(f'Error: {str(e)}', 'danger')
        cursor.close()
        conn.close()
    return redirect(url_for('courses'))

if __name__ == '__main__':
    app.run(debug=True)