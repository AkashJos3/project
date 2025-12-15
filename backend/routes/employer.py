from flask import Blueprint, request, jsonify
from models import Job
from extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity

employer_bp = Blueprint('employer', __name__)

@employer_bp.route('/post-job', methods=['POST'])
@jwt_required()
def post_job():
    current_user_id = get_jwt_identity()
    data = request.json
    
    job = Job(
        title=data.get('title'),
        description=data.get('description'),
        location=data.get('location'),
        salary=data.get('salary'),
        category=data.get('category'),
        duration=data.get('duration'),
        employer_id=current_user_id
    )
    db.session.add(job)
    db.session.commit()
    return jsonify({"message": "Job posted successfully"}), 201

@employer_bp.route('/my-jobs', methods=['GET'])
@jwt_required()
def my_jobs():
    current_user_id = get_jwt_identity()
    jobs = Job.query.filter_by(employer_id=current_user_id).all()
    return jsonify([
        {
            "id": j.id,
            "title": j.title,
            "location": j.location,
            "salary": j.salary
        } for j in jobs
    ]), 200
