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
    
    artist_in_album_rel = db.relationship('User', back_populates='album_in_user_rel')
    song_in_album_rel = db.relationship('Song', back_populates='album_in_song_rel')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'cover_img': self.cover_img,
            'artist_id': self.artist_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }