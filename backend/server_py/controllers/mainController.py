from flask import Blueprint, jsonify, request

main_route = Blueprint('main_route', __name__)

@main_route.route('/', methods=['GET'])
def index():
    try:
        return jsonify({ 'message': 'This is the landing page' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500