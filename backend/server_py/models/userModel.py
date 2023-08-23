from database import connection

class UserModel:
    def __init__(self):
        pass

    def find_by_id(self, user_id):
        try:
            with connection.cursor() as cursor:
                query = 'SELECT * FROM user WHERE id_user = %s'
                cursor.execute(query, (user_id,))
                result = cursor.fetchone()
                return result
        except Exception as e:
            raise e
