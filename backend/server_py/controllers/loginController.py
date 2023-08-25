from flask import Blueprint, jsonify

login_route = Blueprint('login_route', __name__)

@login_route.route('/', methods=['POST'])
def usersLogin():
    try:
        return jsonify({ 'message': 'Succesful request' }), 200
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
def passwordUpdate():
    try:
        return jsonify({ 'message': 'Succesful request' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500