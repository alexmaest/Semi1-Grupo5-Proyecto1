from flask import Blueprint, jsonify, request
from extServices.authMiddleware import authenticate_token, generate_token

login_route = Blueprint('login_route', __name__)

@login_route.route('/<email>/<password>', methods=['GET'])
def usersLogin(email, password):
    try:
        userEmail = email
        userPassword = password
        
        # Realiza la lógica de verificación de credenciales y generación del token aquí
        # ...

        # Ejemplo: si el usuario y contraseña son válidos
        if True:#valid_user_and_password(userEmail, userPassword):
            token = generate_token(userEmail)
            return jsonify({ 'token': token, 'message': 'Succesful request' }), 200
        else:
            return jsonify({ 'message': 'Credenciales incorrectas' }), 401
        
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500


@login_route.route('/passwordChange', methods=['POST'])
def passwordSend():
    try:
        return jsonify({ 'message': 'Succesful request' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500


@login_route.route('/passwordChange/update', methods=['POST'])
@authenticate_token
def passwordUpdate():
    try:
        return jsonify({ 'message': 'Succesful request' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500