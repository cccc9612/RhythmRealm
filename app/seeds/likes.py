from app.models import db, likes, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    like1 = likes(users_id=1, song_id=1)
    like2 = likes(users_id=1, song_id=2)
    like3 = likes(users_id=1, song_id=3)
    like4 = likes(users_id=1, song_id=4)
    like5 = likes(users_id=1, song_id=5)
    like6 = likes(users_id=1, song_id=6)
    like7 = likes(users_id=2, song_id=1)
    like8 = likes(users_id=2, song_id=2)
    like9 = likes(users_id=2, song_id=3)
    like10 = likes(users_id=2, song_id=4)
    like11 = likes(users_id=3, song_id=1)
    like12 = likes(users_id=3, song_id=2)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.add(like9)
    db.session.add(like10)
    db.session.add(like11)
    db.session.add(like12)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
