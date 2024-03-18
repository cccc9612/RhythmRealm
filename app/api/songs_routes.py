from flask import Blueprint, render_template, redirect,request
from flask_login import current_user, login_required
from sqlalchemy import desc
from app.models import Song, db, User, Album


song_routes = Blueprint('song', __name__)

## Get ten most recently created songs
@song_routes.route('')
def songs():
    all_songs=Song.query.order_by(desc(Song.created_at)).limit(10).all()
    return {'songs':[song.to_dict()for song in all_songs]}



## Get a individual song
@song_routes.route('/<id>')
def individualSong(id):
    song = Song.query.get(id)
    return song.to_dict()


## Like a song   ❗️❗️❗️

@song_routes.route('/<int:id>/like', methods=["POST"])
@login_required
def likeASong(id):
    # data=request.form.get("user_id")
    song = Song.query.get(id)
    # print("===================",data)
    if song:
        # print("userrrrrr ", data[0])
        user = current_user
        # if user:
            # print(song.likes_in_song)
        if user not in song.likes_in_song:
                song.likes_in_song.append(user)
                db.session.commit()
                return user.to_dict()
    return "You've already liked this song!"