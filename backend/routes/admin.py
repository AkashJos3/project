from flask import Blueprint, jsonify
from models import User
from extensions import db
from flask_jwt_extended import jwt_required

admin_bp = Blueprint('admin', __name__)

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
        return jsonify({"message": "Employer verified"}), 200
    return jsonify({"error": "Invalid user or not an employer"}), 404
