from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required, current_user
from app.models import User, Album, db, Song
from app.forms import CreateAlbumForm, CreateSongForm
from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from mutagen.mp3 import MP3
import math
import requests
from io import BytesIO

user_routes = Blueprint('users', __name__)

# def duration_cal(duration_seconds) {
#     min = int(duration_seconds // 60)
#     sec = int(duration_seconds % 60)
#     duration_str = f"{min}:{sec}"
#     return du
# }

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# get current user
@user_routes.route("/current")
@login_required
def getCurrentUser():
    user = current_user.to_dict()
    return {"user": user}

# get all the albums belongs to current user
@user_routes.route("/current/albums", methods=["GET"])
@login_required
def currentUserAlbums():
    user = current_user.to_dict()
    all_albums = Album.query.join(User).filter(User.id == user["id"]).all()
    return {"albums": [album.to_dict() for album in all_albums]}


# create an album
@user_routes.route("/current/albums", methods=["GET","POST"])
@login_required
def createAlbum():
    form = CreateAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user.to_dict()
    # print(user)

    if form.validate_on_submit():
        cover_img = form.cover_img.data
        print(cover_img)
        cover_img.filename = get_unique_filename(cover_img.filename)
        upload = upload_file_to_s3(cover_img)
        print(upload)

        if "url" not in upload:
            # return render_template("create_album_form.html", form=form, errors=[upload])
            return form.errors
        url = upload["url"]
        new_album = Album(
            name = form.name.data,
            cover_img = url,
            artist_id = user["id"]
            )
        db.session.add(new_album)
        db.session.commit()
        # return redirect("/api/albums")
        return new_album.to_dict()
    if form.errors:
        print(form.errors)
        # return render_template("create_album_form.html", form=form, errors=form.errors)
        return form.errors
    # return render_template("create_album_form.html", form=form, errors=None)


# update an album
@user_routes.route("/current/albums/<int:id>/update", methods=["PUT"])
@login_required
def updateAlbum(id):
    target_album = Album.query.get(id)
    form = CreateAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user.to_dict()
    
    if not target_album:
        return {"message": "This album could not be found"}, 404
    
    if user["id"] != target_album.to_dict()["artist"]["id"]:
        return {"message": "unauthorized"}, 401
    
    if form.validate_on_submit():
        if target_album:
            if form.name.data:
                target_album.name = form.name.data
            if form.cover_img.data:
                # cover_img = form.cover_img.data
                # cover_img.filename = get_unique_filename(cover_img.filename)
                # upload = upload_file_to_s3(cover_img)
                # print("upload", upload)
                
                # if "url" not in upload:
                #     return form.errors
                # url = upload["url"]
                # target_album.cover_img = url  
                target_album.cover_img = form.cover_img.data
            db.session.commit()
            
            updated_album = Album.query.get(id)
            updated_album_dict = updated_album.to_dict()
            return updated_album_dict
    else:
        return form.errors
    
    
# delete an album
@user_routes.route("/current/albums/<int:id>/delete", methods=["DELETE"])
@login_required
def deleteAlbum(id):
    target_album = Album.query.get(id)
    user = current_user.to_dict()
    
    if not target_album:
        return {"message": "This album could not be found"}, 404
    
    if user["id"] != target_album.to_dict()["artist"]["id"]:
        return {"message": "unauthorized"}, 401
    
    if target_album:
        db.session.delete(target_album)
        db.session.commit()
        remove_file_from_s3(target_album.cover_img)
        return {"message": "Successful delete!"}, 200
    # else:
    #     return "This album could not be found", 404 #return errors?


# get all the songs belongs to current user
@user_routes.route("/current/songs", methods=["GET"])
@login_required
def currentUserSongs():
    user = current_user.to_dict()
    all_songs = Song.query.join(User).filter(User.id == user["id"]).all()
    return {"songs": [song.to_dict() for song in all_songs]}


# upload a song
@user_routes.route("/current/songs", methods=["GET", "POST"])
@login_required
def createSong():
    form = CreateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user.to_dict()

    if form.validate_on_submit():
        song_url = form.song_url.data
        print("song_url =========", song_url)
        song_url.filename = get_unique_filename(song_url.filename)
        upload = upload_file_to_s3(song_url)
        print("upload", upload)
        
        if "url" not in upload:
            return form.errors
        url = upload["url"]
        res = requests.get(url)
        mp3_data = BytesIO(res.content)
        audio = MP3(mp3_data)
        newDuration = audio.info.length
        new_song = Song(
            songs_name = form.songs_name.data,
            song_url = url,
            artist_id = user["id"],
            duration = newDuration
        )
        db.session.add(new_song)
        db.session.commit()

        return new_song.to_dict()

    if form.errors:
        print(form.errors)
        return form.errors
    
    
# update a song
@user_routes.route("/current/songs/<int:id>/update", methods=["PUT"])
@login_required
def updateSong(id):
    target_song = Song.query.get(id)
    form = CreateSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user = current_user.to_dict()
    
    if not target_song:
        return {"message": "This song could not be found"}, 404
    
    if user["id"] != target_song.to_dict()["artist"]["id"]:
        return {"message": "unauthorized"}, 401
    
    if form.validate_on_submit():
        if target_song:
            if form.song_url.data:
                # song_url = form.song_url.data
                # song_url.filename = get_unique_filename(song_url.filename)
                # upload = upload_file_to_s3(song_url)
                # print("upload", upload)
            
                # if "url" not in upload:
                #     return form.errors
                # url = upload["url"]
                # newDuration = MP3(url).info.length
                target_song.song_url = form.song_url.data 
                # target_song.song_url = url ===>for aws
                target_song.duration = "3:20" #hard coding!!!
            if form.songs_name.data:
                target_song.songs_name = form.songs_name.data
            db.session.commit()
           
            updated_song = Song.query.get(id)
            updated_song_dict = updated_song.to_dict()
            # print("updated_song=====================", updated_song_dict)
            return updated_song_dict
    else:
        return form.errors
            
            
# delete a song
@user_routes.route("/current/songs/<int:id>/delete", methods=["DELETE"])
@login_required
def deleteSong(id):
    target_song = Song.query.get(id)
    user = current_user.to_dict()
    
    if not target_song:
        return {"message": "This song could not be found"}, 404
    
    if user["id"] != target_song.to_dict()["artist"]["id"]:
        return {"message": "unauthorized"}, 401
    
    if target_song:
        db.session.delete(target_song)
        db.session.commit()
        # remove_file_from_s3(target_song.song_url)
        return {"message":"Successful delete!"}, 200
    # else:
    #     return "This song could not be found", 404 #return errors?
        
    
