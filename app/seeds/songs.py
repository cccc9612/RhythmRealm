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
     song_url = "fakeurl-1",
     artist_id = 1,
     album_id = 1,
     duration = "3:45",
     created_at = random_date_2023(),
    )
    song2 = Song(
     songs_name = "Moonlit Melody",
     song_url = "fakeurl-2",
     artist_id = 1,
     album_id = 1,
     duration = "4:21",
     created_at = random_date_2023(),
    )
    song3 = Song(
     songs_name = "Starry Night Sonata",
     song_url = "fakeurl-3",
     artist_id = 1,
     album_id = 2,
     duration = "2:55",
     created_at = random_date_2023(),
    )
    song4 = Song(
     songs_name = "Morning Dew",
     song_url = "fakeurl-4",
     artist_id = 1,
     album_id = 2,
     duration = "3:30",
     created_at = random_date_2023(),
    )
    song5 = Song(
     songs_name = "City Lights Ballad",
     song_url = "fakeurl-5",
     artist_id = 2,
     album_id = 3,
     duration = "4:10",
     created_at = random_date_2023(),
    )
    song6 = Song(
     songs_name = "Oceanic Overture",
     song_url = "fakeurl-6",
     artist_id = 2,
     album_id = 3,
     duration = "5:15",
     created_at = random_date_2023(),
    )
    song7 = Song(
     songs_name = "Rainy Day Rhapsody",
     song_url = "fakeurl-7",
     artist_id = 3,
     album_id = 7,
     duration = "3:50",
     created_at = random_date_2023(),
    )
    song8 = Song(
     songs_name ="Autumn Leaves Lullaby",
     song_url = "fakeurl-8",
     artist_id = 3,
     album_id = 8,
     duration = "4:35",
     created_at = random_date_2023(),
    )
    song9 = Song(
     songs_name = "Winter Wonderland Waltz",
     song_url = "fakeurl-9",
     artist_id = 3,
     album_id = 9,
     duration = "3:25",
     created_at = random_date_2023(),
    )
    song10 = Song(
     songs_name = "Springtime Serenade",
     song_url = "fakeurl-10",
     artist_id = 3,
     album_id = 10,
     duration = "4:01",
     created_at = random_date_2023(),
    )
    song11 = Song(
     songs_name = "Summer Breeze Symphony",
     song_url = "fakeurl-11",
     artist_id = 3,
     duration = "3:15",
     created_at = random_date_2023(),
    )
    song12 = Song(
     songs_name ="Enchanted Forest Fantasia",
     song_url = "fakeurl-12",
     artist_id = 3,
     duration = "5:30",
     created_at = random_date_2023(),
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
