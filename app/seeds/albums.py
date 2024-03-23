from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    album1 = Album(
        name='DemoAlbum-1', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/f0bcbb0379784fa4afa9f0b48e90aa83.jpg', artist_id=1
    )
    album2 = Album(
        name='DemoAlbum-2', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/a863f78cd90d438dabd5e33ba0c6141f.jpg', artist_id=1
    )
    album3 = Album(
        name='DemoAlbum-3', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/b29ac7fe3e3b49e8a4a3a43b07717355.jpg', artist_id=1
    )
    album4 = Album(
        name='DemoAlbum-4', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/6a147436ea35454bade53a89854c9482.jpg', artist_id=1
    )
    album5 = Album(
        name='DemoAlbum-5', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/cdb10c86ad494b5eab705eadc8369131.jpg', artist_id=1
    )
    album6 = Album(
        name='DemoAlbum-6', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/f9ea54c1b85c41b0a94374f0e3dfaaac.jpg', artist_id=1
    )
    album7 = Album(
        name='DemoAlbum-7', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/a932888360d24925a1f4c4a5a0e06485.jpg', artist_id=2
    )
    album8 = Album(
        name='DemoAlbum-8', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/11766848ddc048848e77c3ab25e5c251.jpg', artist_id=2
    )
    album9 = Album(
        name='DemoAlbum-9', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/a65943f672cf446e843a6102d9273fcb.jpg', artist_id=3
    )
    album10 = Album(
        name='DemoAlbum-10', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/2b8120c99f094932a6a14c0272720102.jpg', artist_id=3
    )


    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.add(album6)
    db.session.add(album7)
    db.session.add(album8)
    db.session.add(album9)
    db.session.add(album10)
    db.session.commit()



def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
