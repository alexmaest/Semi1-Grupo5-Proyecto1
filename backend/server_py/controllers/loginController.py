from flask import Blueprint, jsonify, request
from controllers.extServices.authMiddleware import authenticate_token, generate_token
from models.userModel import userModel
from typing import Optional

login_route = Blueprint('login_route', __name__)

@login_route.route('/<email>/<password>', methods=['GET'])
def usersLogin(email, password):
    try:
        user = userModel(None, None, None, email, password, None, None)
        user_by_email: Optional[userModel] = user.get_by_email()
        
        if not user_by_email:
            return jsonify({ 'message': 'Account with that email not exist' }), 501
        else:
            if not user.compare_hash(user_by_email['Psw']):
                return jsonify({ 'message': 'Incorrect password' }), 501
            else:
                token = generate_token(email)
                return jsonify({ 'id_User': user_by_email['Id'], 'token': token, 'message': 'Successful request' }), 200
            
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