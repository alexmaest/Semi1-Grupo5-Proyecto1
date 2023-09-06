from models.userModel import userModel
from controllers.loadController import load_controller
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
            
            user = userModel(None, first_name, last_name, email, password, birthday, None)
            user_by_email = user.get_by_email()
            
            if user_by_email:
                return jsonify({ 'message': 'Account with that email already exist' }), 501
            else:
                imageUrl = load_controller.upload_image(profile_photo)
                if imageUrl:
                    user.profile_photo = imageUrl
                    user_added = user.save()
                    if user_added:
                        return jsonify({ 'message': 'Account created' }), 200
                    else:
                        return jsonify({ 'message': 'Failed user account creation' }), 503
                else:
                    return jsonify({ 'message': 'An error has occurred while uploading the profile photo' }), 500
    
        except Exception as e:
            print(e)
            return jsonify({ 'message': 'Internal Server Error' }), 500