from flask import Blueprint, jsonify

main_route = Blueprint('main_route', __name__)

@main_route.route('/', methods=['GET'])
def index():
    try:
        return jsonify({ 'message': 'This is the landing page python' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500