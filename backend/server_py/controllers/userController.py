from models.userModel import userModel
from models.artistModel import artistModel
from models.albumModel import albumModel
from models.songModel import songModel
from flask import Blueprint, jsonify, request

user_route = Blueprint('user_route', __name__)

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

@user_route.route('/like', methods=['POST'])
def like():
    try:
        data = request.get_json()
        userId = data['userId']
        songId = data['songId']
        albumId = data['albumId']
        artistId = data['artistId']
        user = userModel(userId, None, None, None, None, None, None)
        likedSong = user.likeASong(songId, albumId, artistId)
        return jsonify({ 'message': 'Song liked by user' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@user_route.route('/unlike', methods=['POST'])
def unlike():
    try:
        data = request.get_json()
        userId = data['userId']
        songId = data['songId']
        albumId = data['albumId']
        artistId = data['artistId']
        user = userModel(userId, None, None, None, None, None, None)
        unlikedSong = user.unlikeASong(songId, albumId, artistId)
        return jsonify({ 'message': 'Song unliked by user' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500
