from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    album1 = Album(
        name='DemoAlbum-1', cover_img='https://res.cloudinary.com/dwrohcbtx/image/upload/v1708670771/Frontend/Howard/Howard_01_pm1umz.jpg', artist_id=1
    )
    album2 = Album(
        name='DemoAlbum-2', cover_img='https://res.cloudinary.com/dwrohcbtx/image/upload/v1708676500/Frontend/Colmar/Colmar_09_dyypbj.jpg', artist_id=1
    )
    album3 = Album(
        name='DemoAlbum-3', cover_img='https://res.cloudinary.com/dwrohcbtx/image/upload/v1708636642/Frontend/Miho/Miho_01_oe1jnt.jpg', artist_id=1
    )
    album4 = Album(
        name='DemoAlbum-4', cover_img='https://res.cloudinary.com/dwrohcbtx/image/upload/v1708569660/Highclere_06_drcsar.jpg', artist_id=1
    )
    album5 = Album(
        name='DemoAlbum-5', cover_img='https://res.cloudinary.com/dwrohcbtx/image/upload/v1708569883/Highclere_03_2_ijzxwq.jpg', artist_id=1
    )
    album6 = Album(
        name='DemoAlbum-6', cover_img='https://res.cloudinary.com/dwrohcbtx/image/upload/v1708569886/Highclere_04_2_rdg16x.jpg', artist_id=1
    )
    album7 = Album(
        name='DemoAlbum-7', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/30bf240846844d2ea711acbef9a27654.jpg', artist_id=2
    )
    album8 = Album(
        name='DemoAlbum-8', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/30bf240846844d2ea711acbef9a27654.jpg', artist_id=2
    )
    album9 = Album(
        name='DemoAlbum-9', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/787da54df8324c0f8b328f6983f88e6c.jpg', artist_id=3
    )
    album10 = Album(
        name='DemoAlbum-10', cover_img='https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/787da54df8324c0f8b328f6983f88e6c.jpg', artist_id=3
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
