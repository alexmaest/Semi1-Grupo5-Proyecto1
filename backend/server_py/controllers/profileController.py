from models.userModel import userModel
from flask import Blueprint, jsonify, request
from controllers.loadController import load_controller

profile_route = Blueprint('profile', __name__)

@profile_route.route('/<id>', methods=['GET'])
def find_user(id):
    try:
        user = userModel(None, None, None, None, None, None, None)
        response = user.get_by_id(id)
        user_list = [response]
        return jsonify({ 'message': 'User found', 'results': user_list  }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500
    
@profile_route.route('/', methods=['PUT'])
def updateUser():
    try:
        data = request.get_json()
        id_user = data['id_user']
        firstName = data['firstName']
        lastName = data['lastName']
        email = data['email']
        password = data['password']
        profilePhoto = data['profilePhoto']
        user = userModel(id_user, firstName, lastName, email, password, None, profilePhoto)
        
        #Cambios para recibir base64 en la imagen de perfil
        if profilePhoto is not None:
            imageUrl = load_controller.upload_image(profilePhoto)
            if imageUrl:
                user.profile_photo = imageUrl

        userUpdated = user.update()
        return jsonify({ 'message': 'User found', 'results': userUpdated  }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

