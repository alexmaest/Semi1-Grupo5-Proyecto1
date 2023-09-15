from models.artistModel import artistModel
from models.albumModel import albumModel
from models.songModel import songModel
from models.userModel import userModel
from controllers.loadController import load_controller
from flask import Blueprint, jsonify, request

admin_route = Blueprint('admin_route', __name__)

@admin_route.route('/password', methods=['POST'])
def pass_validation():
    try:
        data = request.get_json()
        adminPassword = data['password']
        admin = userModel(None, None, None, None, adminPassword, None, None)
        adminObtained = admin.get_admin()
        if adminObtained:
            if not admin.compare_hash(adminObtained['Psw']):
                return jsonify({ 'message': False }), 200
            else:
                return jsonify({ 'message': True }), 200
        else:
            return jsonify({ 'message': 'Account admin does not exist' }), 501
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

#Artist CRUD
@admin_route.route('/artistAlbums/<int:id>', methods=['GET'])
def get_artist_albums(id):
    try:
        artist = artistModel(id, None, None, None)
        all_albums = artist.getAllArtistAlbums()
        if all_albums:
            return jsonify({ 'albums': all_albums }), 200
        else:
            return jsonify({ 'message': 'No albums created yet' }), 501
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/artist/<int:id>', methods=['GET'])
def get_single_artist(id):
    try:
        artist = artistModel(id, None, None, None)
        artist_obtained = artist.getById()
        if artist_obtained:
            return jsonify({ 'artist': artist_obtained }), 200
        else:
            return jsonify({ 'message': 'The artist does not exist' }), 501
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/artist', methods=['GET'])
def get_all_artists():
    try:
        artist = artistModel(None, None, None, None)
        all_artists = artist.getAll()
        if all_artists:
            return jsonify({ 'artists': all_artists }), 200
        else:
            return jsonify({ 'message': 'No artists created yet' }), 501
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/artist', methods=['POST'])
def create_artist():
    try:
        data = request.get_json()
        name = data['name']
        birthday = data['birthday']
        profile_photo = data['profilePhoto']
        
        artist = artistModel(None, name, birthday, None)
        artist_by_name = artist.getByName()
        
        if artist_by_name:
            return jsonify({ 'message': 'Artist with that name already exist' }), 501
        else:
            imageUrl = load_controller.upload_image(profile_photo)
            if imageUrl:
                artist.profilePhoto = imageUrl
                artist_added = artist.save()
                if artist_added:
                    return jsonify({ 'message': 'Artist created' }), 200
                else:
                    return jsonify({ 'message': 'Failed artist method creation' }), 503
            else:
                return jsonify({ 'message': 'An error has occurred while uploading the profile photo' }), 500
    
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/artist', methods=['PUT'])
def update_artist():
    try:
        data = request.get_json()
        id = data['id']
        name = data['name']
        birthday = data['birthday']
        profilePhoto = data['profilePhoto']
        
        artist = artistModel(id, name, birthday, None)
        
        if profilePhoto is None:
            artist_updated = artist.updateWithoutImage()
            if artist_updated:
                return jsonify({ 'message': 'Artist updated' }), 200
            else:
                return jsonify({ 'message': 'Failed artist method update' }), 503
        else:
            imageUrl = load_controller.upload_image(profilePhoto)
            if imageUrl:
                artist.profilePhoto = imageUrl
                artist_added = artist.updateWithImage()
                if artist_added:
                    return jsonify({ 'message': 'Artist updated' }), 200
                else:
                    return jsonify({ 'message': 'Failed artist method update' }), 503
            else:
                return jsonify({ 'message': 'An error has occurred while uploading the profile photo' }), 500
    
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/artist/<int:id>', methods=['DELETE'])
def delete_artist(id):
    try:
        artist = artistModel(id, None, None, None)
        artist_deleted = artist.delete()
        return jsonify({ 'message': 'Artist deleted' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

#Album CRUD
@admin_route.route('/albumSongs/<int:id>', methods=['GET'])
def get_album_songs(id):
    try:
        album = albumModel(id, None, None, None, None)
        all_songs = album.getAllAlbumSongs()
        if all_songs:
            return jsonify({ 'songs': all_songs }), 200
        else:
            return jsonify({ 'message': 'No songs created for this album yet' }), 501
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/album/<int:id>', methods=['GET'])
def get_single_album(id):
    try:
        album = albumModel(id, None, None, None, None)
        album_obtained = album.getById()
        if album_obtained:
            return jsonify({ 'album': album_obtained }), 200
        else:
            return jsonify({ 'message': 'The album does not exist' }), 501
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/album', methods=['GET'])
def get_all_albums():
    try:
        album = albumModel(None, None, None, None, None)
        all_albums = album.getAll()
        if all_albums:
            return jsonify({ 'albums': all_albums }), 200
        else:
            return jsonify({ 'message': 'No albums created yet' }), 501
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/album', methods=['POST'])
def create_album():
    try:
        data = request.get_json()
        name = data['name']
        description = data['description']
        artistId = data['artistId']
        profile_photo = data['profilePhoto']
        
        artist = artistModel(artistId, None, None, None)
        album = albumModel(None, name, description, None, artist)
        imageUrl = load_controller.upload_image(profile_photo)
        if imageUrl:
            album.coverPhoto = imageUrl
            album_added = album.save()
            if album_added:
                return jsonify({ 'message': 'Album created' }), 200
            else:
                return jsonify({ 'message': 'Failed album method creation' }), 503
        else:
            return jsonify({ 'message': 'An error has occurred while uploading the album cover photo' }), 500
    
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/album/song', methods=['POST'])
def add_song_to_album():
    try:
        data = request.get_json()
        idAlbum = data['idAlbum']
        idSong = data['idSong']
        album = albumModel(idAlbum, None, None, None, None)
        song = songModel(idSong, None, None, None, None, None, None)
        song_added = album.add_song(song)
        return jsonify({ 'message': 'Song added to album' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/album', methods=['PUT'])
def update_album():
    try:
        data = request.get_json()
        albumId = data['albumId']
        name = data['name']
        description = data['description']
        artistId = data['artistId']
        profilePhoto = data['profilePhoto']

        artist = artistModel(artistId, None, None, None)
        album = albumModel(albumId, name, description, None, artist)

        if profilePhoto is None:
            album_added = album.updateWithoutImage()
            if album_added:
                return jsonify({ 'message': 'Album updated' }), 200
            else:
                return jsonify({ 'message': 'Failed album method update' }), 503
        else:
            imageUrl = load_controller.upload_image(profilePhoto)
            if imageUrl:
                album.coverPhoto = imageUrl
                album_added = album.updateWithImage()
                if album_added:
                    return jsonify({ 'message': 'Album updated' }), 200
                else:
                    return jsonify({ 'message': 'Failed album method update' }), 503
            else:
                return jsonify({ 'message': 'An error has occurred while uploading the album cover photo' }), 500

    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/album/song/<int:id>', methods=['DELETE'])
def delete_song_from_album(id):
    try:
        album = albumModel(None, None, None, None, None)
        song = songModel(id, None, None, None, None, None, None)
        song_removed = album.remove_song(song)
        return jsonify({ 'message': 'Song removed from album' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/album/<int:id>', methods=['DELETE'])
def delete_album(id):
    try:
        album = albumModel(id, None, None, None, None)
        album_deleted = album.delete()
        return jsonify({ 'message': 'Album deleted' }), 200
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

#Song CRUD
@admin_route.route('/availableSongs/<int:id>', methods=['GET'])
def get_all_available_songs(id):
    try:
        artist = artistModel(id, None, None, None)
        song = songModel(None, None, None, None, None, None, None)
        all_songs = song.get_all_available(artist)
        if all_songs:
            return jsonify({'songs': all_songs}), 200
        else:
            return jsonify({'message': 'No songs created yet'}), 501
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500

@admin_route.route('/song/<int:id>', methods=['GET'])
def get_single_song(id):
    try:
        song = songModel(id, None, None, None, None, None, None)
        song_obtained = song.getById()
        if song_obtained:
            return jsonify({ 'song': song_obtained }), 200
        else:
            return jsonify({ 'message': 'The song does not exist' }), 501
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/song', methods=['GET'])
def get_all_songs():
    try:
        song = songModel(None, None, None, None, None, None, None)
        all_songs = song.getAll()
        if all_songs:
            return jsonify({ 'songs': all_songs }), 200
        else:
            return jsonify({ 'message': 'No songs created yet' }), 501
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/song', methods=['POST'])
def create_song():
    try:
        file = request.files.get('track')
        if not file:
            return jsonify({ 'message': 'No detected file in request' }), 400
        
        song_url = load_controller.upload_song(file.read())
        if not song_url:
            return jsonify({ 'message': 'An error has occurred while uploading the song' }), 500
        
        data = request.form
        name = data['name']
        duration = data['duration']
        artist_id = data['artistId']
        album_id = data['albumId']
        profile_photo = data['profilePhoto']
        
        artist = artistModel(artist_id, None, None, None)
        album = albumModel(album_id, None, None, None, artist)
        song = songModel(None, name, None, song_url, duration, artist, album)
        cover_photo_url = load_controller.upload_image(profile_photo)
        
        if cover_photo_url:
            song.coverPhoto = cover_photo_url
            saved_song = song.save()
            if saved_song:
                return jsonify({ 'message': 'The song has been created' }), 200
            else:
                return jsonify({ 'message': 'The song could not be created' }), 501
        else:
            return jsonify({ 'message': 'An error has occurred while uploading the song cover photo' }), 500
    except Exception as e:
        print(e)
        return jsonify({ 'message': 'Internal Server Error' }), 500

@admin_route.route('/song', methods=['PUT'])
def update_song():
    try:
        data = request.get_json()
        songId = data['songId']
        name = data['name']
        duration = data['duration']
        artistId = data['artistId']
        albumId = data['albumId']
        profilePhoto = data['profilePhoto']

        artist = artistModel(artistId, None, None, None)
        album = albumModel(albumId, None, None, None, artist)
        song = songModel(songId, name, None, None, duration, artist, album)

        if profilePhoto is None:
            album_added = song.update_without_image()
            if album_added:
                return jsonify({'message': 'Song updated'}), 200
            else:
                return jsonify({'message': 'Failed song method update'}), 503
        else:
            imageUrl = load_controller.upload_image(profilePhoto)
            if imageUrl:
                song.coverPhoto = imageUrl
                album_added = song.update_with_image()
                if album_added:
                    return jsonify({'message': 'Song updated'}), 200
                else:
                    return jsonify({'message': 'Failed song method update'}), 503
            else:
                return jsonify({'message': 'An error has occurred while uploading the song cover photo'}), 500

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500
    
@admin_route.route('/song/<int:id>', methods=['DELETE'])
def delete_song(id):
    try:
        song = songModel(id, None, None, None, None, None, None)
        song_deleted = song.delete()
        return jsonify({'message': 'Song deleted'}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500