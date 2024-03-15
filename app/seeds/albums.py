from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    album1 = Album(
        name='DemoAlbum-1', cover_img='fakeImg-1', artist_id=1
    )
    album2 = Album(
        name='DemoAlbum-2', cover_img='fakeImg-2', artist_id=1
    )
    album3 = Album(
        name='DemoAlbum-3', cover_img='fakeImg-3', artist_id=2
    )
    album4 = Album(
        name='DemoAlbum-4', cover_img='fakeImg-4', artist_id=2
    )
    album5 = Album(
        name='DemoAlbum-5', cover_img='fakeImg-5', artist_id=3
    )
    album6 = Album(
        name='DemoAlbum-6', cover_img='fakeImg-6', artist_id=3
    )


    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.add(album6)
    db.session.commit()



def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
