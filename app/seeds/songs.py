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
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/b9cd7be82d124abebc8ba0cd0b80472d.mp3",
     artist_id = 1,
     album_id = 1,
     duration = "2:13",
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
     album_id = 4,
     duration = "0:37",
    #  created_at = random_date_2023(),
    )
    song9 = Song(
     songs_name = "Winter Wonderland Waltz",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/638b7a9233324070b52dd0cc4015b77b.mp3",
     artist_id = 1,
     album_id = 4,
     duration = "0:49",
    #  created_at = random_date_2023(),
    )
    song10 = Song(
     songs_name = "Springtime Serenade",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/7340d017883b433ea567ebe972734c6e.mp3",
     artist_id = 1,
     album_id = 5,
     duration = "1:08",
    #  created_at = random_date_2023(),
    )
    song11 = Song(
     songs_name = "Summer Breeze Symphony",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/8f99f1c775a8473bbaa984e41d44d631.mp3",
     artist_id = 3,
     album_id = 9,
     duration = "1:46",
    #  created_at = random_date_2023(),
    )
    song12 = Song(
     songs_name ="Enchanted Forest Fantasia",
     song_url = "https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/9d1694b7e9d44920896290f7779b35a6.mp3",
     artist_id = 3,
     album_id = 10,
     duration = "1:41",
    #  created_at = random_date_2023(),
    )

    song13 = Song(
     songs_name ="Whispers in the Windstorm",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/edea913891364c4780f344a30c74bfec.mp3",
     artist_id = 1,
     album_id = 5,
     duration = "0:58",
    #  created_at = random_date_2023(),
    )

    song14 = Song(
     songs_name ="Neon Dreamscape",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/01116e4ac0ba409e92034e5ebe9adc31.mp3",
     artist_id = 1,
     album_id = 5,
     duration = "0:25",
    #  created_at = random_date_2023(),
    )

    song15 = Song(
     songs_name ="Echoes of the Forgotten",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/ced987b16d0d49739a7656046da46cb4.mp3",
     artist_id = 1,
     album_id = 6,
     duration = "1:12",
    #  created_at = random_date_2023(),
    )

    song16 = Song(
     songs_name ="Midnight Serenade in G Minor",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/57a3d2d85d284196858c405f7996d95c.mp3",
     artist_id = 1,
     album_id = 6,
     duration = "0:59",
    #  created_at = random_date_2023(),
    )

    song17 = Song(
     songs_name ="Beneath the Emerald Waves",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/de33a94bf7db4c41b4f0a31ee1a09c3a.mp3",
     artist_id = 1,
     album_id = 6,
     duration = "1:42",
    #  created_at = random_date_2023(),
    )

    song18 = Song(
     songs_name ="Rhythms of the Lost City",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/d9582903a18c4a9abfd1320445831c95.mp3",
     artist_id = 2,
     album_id = 7,
     duration = "2:40",
    #  created_at = random_date_2023(),
    )

    song19 = Song(
     songs_name ="Stardust Reverie",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/ba4b50a952f44643bee03a49330398f3.mp3",
     artist_id = 2,
     album_id = 8,
     duration = "0:56",
    #  created_at = random_date_2023(),
    )


    song20 = Song(
     songs_name ="Twilight's Last Gleaming",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/fd84733ea4664214a5c66e35d042348b.mp3",
     artist_id = 2,
     album_id = 7,
     duration = "0:59",
    #  created_at = random_date_2023(),
    )

    song21 = Song(
     songs_name ="Harmony in the Chaos",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/73d8cc923e32469a95297b4658654981.mp3",
     artist_id = 2,
     album_id = 8,
     duration = "0:54",
    #  created_at = random_date_2023(),
    )

    song22 = Song(
     songs_name ="Velvet Shadows",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/315b2e07fe1b41eb9d97f6228749d894.mp3",
     artist_id = 3,
     album_id = 9,
     duration = "2:11",
    #  created_at = random_date_2023(),
    )

    song23 = Song(
     songs_name ="Mystic Fireside Tales",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/d5a85c218780415e94024945d5514c48.mp3",
     artist_id = 3,
     album_id = 9,
     duration = "1:25",
    #  created_at = random_date_2023(),
    )

    song24 = Song(
     songs_name ="Dance of the Aurora",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/2452354139194e679347c444cfe0559d.mp3",
     artist_id = 3,
     album_id = 10,
     duration = "2:08",
    #  created_at = random_date_2023(),
    )

    song25 = Song(
     songs_name ="Whirlwind Romance",
     song_url = "https://rhythm-realm-img-bucket.s3.amazonaws.com/ac507172fde94765ae46c4bf1e4077a1.mp3",
     artist_id = 3,
     album_id = 10,
     duration = "0:52",
    #  created_at = random_date_2023(),
    )


    # song = Song(
    #  songs_name ="",
    #  song_url = "",
    #  artist_id = ,
    #  album_id = ,
    #  duration = "",
    # #  created_at = random_date_2023(),
    # )

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
        song12,
        song13,
        song14,
        song15,
        song16,
        song17,
        song18,
        song19,
        song20,
        song21,
        song22,
        song23,
        song24,
        song25
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
