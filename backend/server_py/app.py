from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def create_app():
    from controllers.mainController import main_route
    from controllers.loginController import login_route
    from controllers.registerController import register_route
    from controllers.profileController import profile_route
    from controllers.adminController import admin_route
    from controllers.userController import user_route
    from controllers.playlistController import playlist_route

    app.register_blueprint(main_route, url_prefix='/')
    app.register_blueprint(login_route, url_prefix='/login')
    app.register_blueprint(register_route, url_prefix='/register')
    app.register_blueprint(profile_route, url_prefix='/profile')
    app.register_blueprint(admin_route, url_prefix='/admin')
    app.register_blueprint(user_route, url_prefix='/user')
    app.register_blueprint(playlist_route, url_prefix='/playlist')

    return app
