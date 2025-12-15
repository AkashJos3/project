from app import create_app, db
from models import User

app = create_app()
with app.app_context():
    users = User.query.all()
    print(f"Total Users: {len(users)}")
    for user in users:
        print(f"ID: {user.id} | Name: {user.name} | Email: {user.email} | Role: {user.role}")
