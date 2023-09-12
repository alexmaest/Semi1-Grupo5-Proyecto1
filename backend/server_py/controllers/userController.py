from models.userModel import userModel
from models.artistModel import artistModel
from models.albumModel import albumModel
from models.songModel import songModel
from flask import Blueprint, jsonify, request

user_route = Blueprint('user_route', __name__)

@user_route.route('/play', methods=['POST'])
def play_song():
    try:
        data = request.get_json()
        userId = data['userId']
        songId = data['songId']
        song = songModel(songId, None, None, None, None, None, None)
        song_obtained = song.get_to_play(userId)
        return jsonify({'song': song_obtained}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500

@user_route.route('/random', methods=['POST'])
def random_song():
    try:
        userId = request.json.get('userId')
        song = songModel(None, None, None, None, None, None, None)
        random_song = song.get_random(userId)
        return jsonify({'song': random_song}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500

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
        user = userModel(userId, None, None, None, None, None, None)
        likedSong = user.likeASong(songId)
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
        user = userModel(userId, None, None, None, None, None, None)
        unlikedSong = user.unlikeASong(songId)
        return jsonify({ 'message': 'Song unliked by user' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@user_route.route('/favoriteSongs/<userId>', methods=['GET'])
def favoriteSongs(userId):
    try:
        user = userModel(userId, None, None, None, None, None, None)
        favoriteSongs = user.getFavoriteSongs_By_User()
        return jsonify({ 'success': favoriteSongs }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@user_route.route('/topSongs/<userId>', methods=['GET'])
def topSongs(userId):
    try:
        user = userModel(userId, None, None, None, None, None, None)
        topSongs = user.getTopSongs_By_User()
        return jsonify({ 'success': topSongs }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500
    
@user_route.route('/topArtists/<userId>', methods=['GET'])
def topArtists(userId):
    try:
        user = userModel(userId, None, None, None, None, None, None)
        topArtists = user.getTopArtists_By_User()
        return jsonify({ 'success': topArtists }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500
    
@user_route.route('/topAlbums/<userId>', methods=['GET'])
def topAlbums(userId):
    try:
        user = userModel(userId, None, None, None, None, None, None)
        topAlbums = user.getTopAlbums_By_User()
        return jsonify({ 'success': topAlbums }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500
    
@user_route.route('/history/<userId>', methods=['GET'])
def history(userId):
    try:
        user = userModel(userId, None, None, None, None, None, None)
        history = user.getHistorySongs_By_User()
        return jsonify({ 'success': history }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

