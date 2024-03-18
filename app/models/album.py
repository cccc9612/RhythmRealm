from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Album(db.Model):
    __tablename__= 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    cover_img = db.Column(db.String, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    artist_in_album = db.relationship('User', back_populates='album_in_user')
    song_in_album = db.relationship('Song', back_populates='album_in_song')

    @property
    def artist(self):
        return {
            'id': self.artist_in_album.id,
            'first_name': self.artist_in_album.first_name,
            'last_name': self.artist_in_album.last_name
        }


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'cover_img': self.cover_img,
            'artist': self.artist,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
