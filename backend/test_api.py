import requests

try:
    response = requests.post('http://127.0.0.1:5000/api/auth/register', json={
        "name": "Test User",
        "email": "test@example.com",
        "password": "password123",
        "role": "student",
        "course": "CSE",
        "college": "Test College"
    })
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Connection Failed: {e}")
