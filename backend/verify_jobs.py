import sys
import os
from flask import json

# Setup path
sys.path.append(os.getcwd())

try:
    from app import create_app, db
    from models import User, Job
    
    app = create_app()
    
    with app.app_context():
        # Clean slate
        print("Cleaning DB...")
        db.drop_all()
        db.create_all()
        
        # Create Employer
        emp = User(name="Emp", email="emp@test.com", role="employer", verified=True)
        emp.set_password("pass")
        db.session.add(emp)
        db.session.commit()
        
        # Create Job
        print(f"Employer ID created: {emp.id} (Type: {type(emp.id)})")
        job = Job(title="Test Job", description="Desc", location="Loc", salary="100", 
                 category="Retail", duration="1h", employer_id=emp.id)
        db.session.add(job)
        db.session.commit()
        
        print("Job created.")
        
        # Test Fetching via Route Logic
        # (We simulate what the route does)
        print("Testing fetch logic...")
        jobs = Job.query.all()
        print(f"Found {len(jobs)} jobs in DB query.")
        
        # Simulate serialization logic from student.py
        # We Mock get_jwt_identity to return None first, then specific ID
        
        # Scenario 1: No Auth
        serialized = []
        for j in jobs:
            item = {
                "id": j.id,
                "title": j.title,
                "employer_name": User.query.get(j.employer_id).name,
                "has_applied": False # Logic simplified for no auth
            }
            serialized.append(item)
        print(f"Scenario 1 (No Auth) Result: {serialized}")
        
        # Scenario 2: Auth as Student
        # This tests the 'int()' conversion and 'any()' logic
        student_id_str = "999" # Fake ID
        print("Testing Auth Logic with identity '999'...")
        
        # Copy-paste logic from student.py roughly
        serialized_auth = []
        for j in jobs:
            # Replicating the exact line from student.py
            has_applied = any(app.student_id == int(student_id_str) for app in j.applications) if student_id_str else False
            
            item = {
                "id": j.id, 
                "has_applied": has_applied
            }
            serialized_auth.append(item)
            
        print(f"Scenario 2 (Auth) Result: {serialized_auth}")
        
        print("VERIFICATION SUCCESS: No crashes encountered.")

except Exception as e:
    print("VERIFICATION FAILED")
    print(e)
    import traceback
    traceback.print_exc()
