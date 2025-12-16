from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(20))  # admin, employer, student
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))
    verified = db.Column(db.Boolean, default=False)
    
    # Extra fields for students
    course = db.Column(db.String(100), nullable=True)
    college = db.Column(db.String(100), nullable=True)

    # Relationships
    jobs = db.relationship('Job', backref='employer', lazy=True)
    applications = db.relationship('Application', backref='student', lazy=True)

    def set_password(self, pwd):
        self.password = generate_password_hash(pwd)

    def check_password(self, pwd):
        return check_password_hash(self.password, pwd)

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    description = db.Column(db.Text)
    location = db.Column(db.String(100))
    salary = db.Column(db.String(50))
    category = db.Column(db.String(50))
    duration = db.Column(db.String(50))
    employer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Relationship to applications
    applications = db.relationship('Application', backref='job', lazy=True, cascade="all, delete-orphan")

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(20), default='Pending') # Pending, Accepted, Rejected
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)
