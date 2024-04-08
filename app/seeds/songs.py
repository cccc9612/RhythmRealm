from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime,timedelta
from random import randint


def random_date_2023():
    """Generate a random datetime between start and end which
    should be datetime objects"""
    start = datetime(2023, 1, 1)
    end = datetime.now()
    random_date = start + timedelta(
        # Get a random amount of seconds between start and end
        seconds=randint(0, int((end - start).total_seconds())),
    )
    return random_date

def seed_songs():
    song1 = Song(
     songs_name = "Sunset Serenade",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/aa96c80eed2943c89441034a13b70e78.mp3",
     artist_id = 1,
     album_id = 1,
     duration = "4:01",
    #  created_at = random_date_2023(),
    )
    song2 = Song(
     songs_name = "Moonlit Melody",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/ee74100c700b4a7a979a37ee534e4bc1.mp3",
     artist_id = 1,
     album_id = 1,
     duration = "2:33",
    #  created_at = random_date_2023(),
    )
    song3 = Song(
     songs_name = "Starry Night Sonata",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/0d7bc24dc75641b5884b623286d8bfd0.mp3",
     artist_id = 1,
     album_id = 1,
     duration = "2:42",
    #  created_at = random_date_2023(),
    )
    song4 = Song(
     songs_name = "Morning Dew",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/ac185c55ddf9496a9d84541ca248f872.mp3",
     artist_id = 1,
     album_id = 1,
     duration = "0:21",
    #  created_at = random_date_2023(),
    )
    song5 = Song(
     songs_name = "City Lights Ballad",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/037c764bb8914998b0b35caad7406cb2.mp3",
     artist_id = 1,
     album_id = 2,
     duration = "1:52",
    #  created_at = random_date_2023(),
    )
    song6 = Song(
     songs_name = "Oceanic Overture",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/010bbded106d40a2ba59c0d42b5e8136.mp3",
     artist_id = 1,
     album_id = 2,
     duration = "2:25",
    #  created_at = random_date_2023(),
    )
    song7 = Song(
     songs_name = "Rainy Day Rhapsody",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/e431ebd1ff2d49d2bfb556e8ffcf62b3.mp3",
     artist_id = 1,
     album_id = 3,
     duration = "1:09",
    #  created_at = random_date_2023(),
    )
    song8 = Song(
     songs_name ="Autumn Leaves Lullaby",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/1e54329ac53d4e58b3b2635d79dcce59.mp3",
     artist_id = 1,
    #  album_id = 4,
     duration = "0:37",
    #  created_at = random_date_2023(),
    )
    song9 = Song(
     songs_name = "Winter Wonderland Waltz",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/638b7a9233324070b52dd0cc4015b77b.mp3",
     artist_id = 1,
    #  album_id = 4,
     duration = "0:49",
    #  created_at = random_date_2023(),
    )
    song10 = Song(
     songs_name = "Springtime Serenade",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/7340d017883b433ea567ebe972734c6e.mp3",
     artist_id = 1,
    #  album_id = 4,
     duration = "1:08",
    #  created_at = random_date_2023(),
    )
    song11 = Song(
     songs_name = "Summer Breeze Symphony",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/8f99f1c775a8473bbaa984e41d44d631.mp3",
     artist_id = 3,
     duration = "1:46",
    #  created_at = random_date_2023(),
    )
    song12 = Song(
     songs_name ="Enchanted Forest Fantasia",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/9d1694b7e9d44920896290f7779b35a6.mp3",
     artist_id = 3,
     duration = "1:41",
    #  created_at = random_date_2023(),
    )

    songs= [
        song1,
        song2,
        song3,
        song4,
        song5,
        song6,
        song7,
        song8,
        song9,
        song10,
        song11,
        song12
    ]

    for song in songs:
        db.session.add(song)
    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
