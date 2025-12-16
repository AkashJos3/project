from flask import Blueprint, request, jsonify
from models import Job, Application
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

@employer_bp.route('/job/<int:id>', methods=['PUT', 'DELETE'])
@jwt_required()
def manage_job(id):
    current_user_id = get_jwt_identity()
    job = Job.query.get_or_404(id)
    
    if job.employer_id != current_user_id:
        return jsonify({"error": "Unauthorized"}), 403
    
    if request.method == 'DELETE':
        db.session.delete(job)
        db.session.commit()
        return jsonify({"message": "Job deleted"}), 200
    
    if request.method == 'PUT':
        data = request.json
        job.title = data.get('title', job.title)
        job.description = data.get('description', job.description)
        job.location = data.get('location', job.location)
        job.salary = data.get('salary', job.salary)
        job.category = data.get('category', job.category)
        job.duration = data.get('duration', job.duration)
        db.session.commit()
        return jsonify({"message": "Job updated"}), 200

@employer_bp.route('/job/<int:id>/applicants', methods=['GET'])
@jwt_required()
def view_applicants(id):
    current_user_id = get_jwt_identity()
    job = Job.query.get_or_404(id)
    
    if job.employer_id != current_user_id:
        return jsonify({"error": "Unauthorized"}), 403
        
    return jsonify([
        {
            "id": app.id,
            "student_name": app.student.name,
            "student_email": app.student.email,
            "student_college": app.student.college,
            "student_course": app.student.course,
            "status": app.status,
            "applied_at": app.applied_at
        } for app in job.applications
    ]), 200
