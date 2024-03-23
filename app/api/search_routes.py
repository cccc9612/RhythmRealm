from flask import Blueprint, request
from app.models import User, Album, db, Song


search_routes = Blueprint('search', __name__)

@search_routes.route("/songs", methods=["POST"])
def searchSongs():
    target_text = request.args.get('param')
    all_songs = Song.query.filter(Song.songs_name.ilike("%{}%".format(target_text))).all()
    return {"songs": [song.to_dict() for song in all_songs]}

@search_routes.route("/albums", methods=["POST"])
def searchAlbums():
    target_text = request.args.get('search')
    all_albums = Album.query.filter(Album.name.ilike("%{}%".format(target_text))).all()
    return {"albums": [album.to_dict() for album in all_albums]}
