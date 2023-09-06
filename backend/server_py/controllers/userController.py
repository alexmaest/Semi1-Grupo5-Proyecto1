from models.userModel import UserModel
from models.artistModel import artistModel
from models.albumModel import albumModel
from models.songModel import songModel
from flask import Blueprint, jsonify, request

user_route = Blueprint('profile', __name__)

@user_route.route('/search', methods=['POST'])
def search():
    try:
        search = request.json.get('search')
        artist = artistModel(None, None, None, None)
        album = albumModel(None, None, None, None, None)
        song = songModel(None, None, None, None, None, None, None)
        songs = song.getByRegex(search)
        albums = album.getByRegex(search)
        artists = artist.getByRegex(search)
        return jsonify({ 'songs': songs, 'albums': albums, 'artists': artists}), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

