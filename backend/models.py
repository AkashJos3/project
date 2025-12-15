from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

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
    category = db.Column(db.String(50)) # NEW: Category
    duration = db.Column(db.String(50)) # NEW: Duration
    employer_id = db.Column(db.Integer, db.ForeignKey('user.id')) # improved relation
    
    # Store relationships if needed, e.g. employer = db.relationship('User', ...)
