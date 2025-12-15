from flask import Blueprint, request, jsonify
from extensions import db
from models import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        if User.query.filter_by(email=data.get('email')).first():
             return jsonify({"error": "Email already exists"}), 400

        user = User(
            name=data.get('name'),
            email=data.get('email'),
            role=data.get('role', 'student'),
            course=data.get('course'),
            college=data.get('college')
        )
        user.set_password(data['password'])
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get('email')).first()
    if user and user.check_password(data.get('password')):
        token = create_access_token(identity=str(user.id), additional_claims={"role": user.role, "name": user.name})
        return jsonify(access_token=token, role=user.role, name=user.name), 200
    return jsonify({"error": "Invalid credentials"}), 401
