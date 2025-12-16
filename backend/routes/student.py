from flask import Blueprint, jsonify, request
from models import Job, User, Application
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
            "employer_name": User.query.get(j.employer_id).name if User.query.get(j.employer_id) else "Unknown",
            "has_applied": any(app.student_id == int(get_jwt_identity()) for app in j.applications) if get_jwt_identity() else False
        } for j in jobs
    ]), 200

@student_bp.route('/apply/<int:job_id>', methods=['POST'])
@jwt_required()
def apply_job(job_id):
    student_id = get_jwt_identity()
    if Application.query.filter_by(student_id=student_id, job_id=job_id).first():
        return jsonify({"error": "Already applied"}), 400
    
    application = Application(job_id=job_id, student_id=student_id)
    db.session.add(application)
    db.session.commit()
    return jsonify({"message": "Applied successfully"}), 201

@student_bp.route('/my-applications', methods=['GET'])
@jwt_required()
def my_applications():
    student_id = get_jwt_identity()
    applications = Application.query.filter_by(student_id=student_id).all()
    return jsonify([
        {
            "id": a.id,
            "job_title": a.job.title,
            "employer": a.job.employer.name,
            "status": a.status,
            "applied_at": a.applied_at
        } for a in applications
    ]), 200
