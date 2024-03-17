from flask import Blueprint, redirect, request
from sqlalchemy import desc
from flask_login import current_user, login_required
from app.models import db, Album
# from app.forms import CreateAlbumForm
# from .aws_helpers import upload_file_to_s3, get_unique_filename


album_routes = Blueprint("album_routes", __name__)

# get all albums
@album_routes.route("")
def all_albums():
    all_albums = Album.query.order_by(desc(Album.created_at)).all()
    return {"albums": [album.to_dict() for album in all_albums]}


#get single album detail
@album_routes.route("/<int:id>")
def album_detail(id):
    album = Album.query.get(id)
    return album.to_dict()
