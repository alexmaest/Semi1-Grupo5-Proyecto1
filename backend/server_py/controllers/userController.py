from models.userModel import UserModel

class UserController:
    def __init__(self):
        # TODO document why this method is empty
        pass

    def find_user(self, user_id):
        try:
            response = UserModel().find_by_id(user_id)
            return response
        except Exception as e:
            raise e
