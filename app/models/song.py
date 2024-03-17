from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key= True)
    songs_name = db.Column(db.String, nullable = False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False )
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')))
    duration = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    album_in_song = db.relationship('Album', back_populates='song_in_album')
    user_in_song = db.relationship('User', back_populates='song_in_user')
    likes_in_song = db.relationship('User', secondary="likes", back_populates='likes_in_user')

    @property
    def likes(self):
        return len(self.likes_in_song)

    @property
    def album(self):
        if self.album_in_song:
            return {
                'id': self.album_in_song.id,
                'name': self.album_in_song.name,
                'cover_img': self.album_in_song.cover_img
            }
        else:
            return None

    @property
    def artist(self):
        return {
            'id': self.user_in_song.id,
            'first_name': self.user_in_song.first_name,
            'last_name': self.user_in_song.last_name
        }


    def to_dict(self):
        return {
            'id':self.id,
            'song_name':self.songs_name,
            'artist':self.artist,
            'album':self.album,
            'duration':self.duration,
            'likes': self.likes,
            'created_at': self.created_at
        }
