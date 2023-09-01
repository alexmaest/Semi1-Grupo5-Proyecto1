from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def create_app():
    from controllers.mainController import main_route
    from controllers.loginController import login_route
    from controllers.registerController import register_route
    from controllers.adminController import admin_route

    app.register_blueprint(main_route, url_prefix='/')
    app.register_blueprint(login_route, url_prefix='/login')
    app.register_blueprint(register_route, url_prefix='/register')
    app.register_blueprint(admin_route, url_prefix='/admin')

    return app
