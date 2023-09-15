from flask import Flask, request, jsonify
import jwt
import os
from datetime import datetime, timedelta

secret_key = str(os.getenv("AUTH_KEY"))

# Decorador para verificar el token en las rutas protegidas
def authenticate_token(func):
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization', '').split()[1] if 'Authorization' in request.headers else None

        if not token:
            return jsonify({'message': 'Token faltante'}), 401

        try:
            decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
            request.user = decoded_token
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expirado'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido'}), 403

        return func(*args, **kwargs)

    return wrapper

# Esta función generaría un token JWT
def generate_token(user_email):
    expiration_time = datetime.utcnow() + timedelta(hours=1)  # Token expira en 1 hora

    payload = {
        'user_email': user_email,
        'exp': expiration_time
    }

    token = jwt.encode(payload, secret_key, algorithm='HS256')
    return token