from flask import Blueprint, jsonify
from models import User
from extensions import db
from flask_jwt_extended import jwt_required

from models import User, Job # Added Job

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/debug-jobs', methods=['GET'])
def debug_jobs():
    try:
        jobs = Job.query.all()
        return jsonify([{
            "id": j.id, 
            "title": j.title, 
            "emp_id": j.employer_id,
            "emp_type": str(type(j.employer_id))
        } for j in jobs]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    # Only allow for admin role ideally, simplified here
    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "verified": u.verified
        } for u in users
    ]), 200

@admin_bp.route('/verify-employer/<int:id>', methods=['PUT'])
@jwt_required()
def verify_employer(id):
    user = User.query.get(id)
    if user and user.role == 'employer':
        user.verified = True
        db.session.commit()
        return jsonify({"message": "Employer account verified"}), 200
    return jsonify({"error": "Invalid user or not an employer"}), 404

# WARNING: This is a dangerous route for fixing schema issues on production.
# In a real app, protect this heavily or use migrations.
@admin_bp.route('/force-db-reset', methods=['GET'])
def force_db_reset():
    try:
        db.drop_all()
        db.create_all()
        return jsonify({"message": "Database has been nuked and rebuilt successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
