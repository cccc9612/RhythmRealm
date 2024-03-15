from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key= True)
    songs_name = db.Column(db.String, nullable = False)
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False )
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable = False)
    duration = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    album = db.relationship('Album', back_populates='songs')
    user = db.relationship('User', back_populates='songs')
    like = db.relationship('Like', back_populates='songs', cascade = "all,delete")

    def to_dict(self):
        return {
            'id':self.id,
            'song_name':self.songs_name,
            'artist_id':self.artist_id,
            'album_id':self.album_id,
            'duration':self.duration,
            'album_id':self.album_id,
            "created_at": self.created_at
        }
