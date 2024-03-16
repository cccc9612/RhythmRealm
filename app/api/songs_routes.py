from flask import Blueprint, render_template, redirect
from sqlalchemy import desc
from app.models import Song, db



song_routes = Blueprint('song', __name__)

## Get ten most recently created songs
@song_routes.route('/')
def songs():
    all_songs=Song.query.order_by(desc(Song.created_at)).limit(10).all()

    return {'songs':[song.to_dict()for song in all_songs]}
