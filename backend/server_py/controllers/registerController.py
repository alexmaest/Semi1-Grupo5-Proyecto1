from models.userModel import UserModel
from flask import Blueprint, jsonify, request

register_route = Blueprint('register_route', __name__)

@register_route.route('/', methods=['POST'])
def register():
        try:
            data = request.get_json()
            first_name = data['firstName']
            last_name = data['lastName']
            email = data['email']
            password = data['password']
            birthday = data['birthday']
            profile_photo = data['profilePhoto']
            
            user = UserModel(None, first_name, last_name, email, password, birthday, profile_photo)
            user_by_email = user.get_by_email()
            
            if user_by_email:
                return jsonify({ 'message': 'Account with that email already exist' }), 501
            else:
                user_added = user.save()
                if user_added:
                    return jsonify({ 'message': 'Account created' }), 200
                else:
                    return jsonify({ 'message': 'Failed user account creation' }), 503
        except Exception as e:
            print(e)
            return jsonify({ 'message': 'Internal Server Error' }), 500