from flask import Blueprint, jsonify, request
from models import Job, User
from extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity

student_bp = Blueprint('student', __name__)

@student_bp.route('/jobs', methods=['GET'])
def view_jobs():
    category = request.args.get('category')
    query = Job.query
    if category:
        query = query.filter_by(category=category)
    
    jobs = query.all()
    return jsonify([
        {
            "id": j.id,
            "title": j.title,
            "description": j.description,
            "location": j.location,
            "salary": j.salary,
            "category": j.category,
            "duration": j.duration,
            "employer_id": j.employer_id,
            "employer_name": User.query.get(j.employer_id).name if User.query.get(j.employer_id) else "Unknown"
        } for j in jobs
    ]), 200
