from app.models import db, User, Song, likes,environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    song1 = Song.query.get(1)
    song2 = Song.query.get(2)
    song3 = Song.query.get(3)
    song4 = Song.query.get(4)
    song5 = Song.query.get(5)
    song6 = Song.query.get(6)

    user1.likes_in_user.append(song1)
    user1.likes_in_user.append(song2)
    user1.likes_in_user.append(song3)
    user1.likes_in_user.append(song4)
    user1.likes_in_user.append(song5)
    user1.likes_in_user.append(song6)

    user2.likes_in_user.append(song1)
    user2.likes_in_user.append(song2)
    user2.likes_in_user.append(song3)
    user2.likes_in_user.append(song4)

    user3.likes_in_user.append(song1)
    user3.likes_in_user.append(song2)


    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
