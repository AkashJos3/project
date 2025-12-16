import sys
import os

# Ensure we can import from current directory
sys.path.append(os.getcwd())

try:
    print("Attempting to import app...")
    from app import create_app, db
    print("App imported successfully.")

    app = create_app()
    print("App created successfully.")

    with app.app_context():
        print("Attempting to create database tables...")
        db.create_all()
        print("Database tables created successfully.")
        
    print("VERIFICATION SUCCESS: App starts and DB is created.")
    
except Exception as e:
    print("VERIFICATION FAILED")
    print(e)
    import traceback
    traceback.print_exc()
