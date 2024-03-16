from flask import Blueprint, render_template, redirect,request
from sqlalchemy import desc
from app.models import Song, db, User, Album


song_routes = Blueprint('song', __name__)

## Get ten most recently created songs
@song_routes.route('/')
def songs():
    all_songs=Song.query.order_by(desc(Song.created_at)).limit(10).all()
    return {'songs':[song.to_dict()for song in all_songs]}



## Get a individual song
@song_routes.route('/<id>')
def individualSong(id):
    song = Song.query.get(id)
    return song.to_dict()


## Like a song   ❗️❗️❗️

@song_routes.route('/<id>/like', methods=["POST"])
def likeASong(id):
    data = request.data.decode()
    user = User.query.get(id)
    if user:
        likedSong = Song.query.get(data)
        if likedSong:
            if likedSong not in user.likes:
                user.likes.append(likedSong)
                db.session.commit()
                return likedSong.to_dict()
    return "You've already liked this song!"
