# **Database Schema**

## `users`

| column name | data type | details                   |
|-------------|-----------|---------------------------|
| id          | integer   | not null, primary key     |
| username    | varchar   | not null, unique          |
| email       | varchar   | not null, unique          |
| password    | varchar   | not null                  |
| first_name  | varchar   | not null                  |
| last_name   | varchar   | not null                  |

## `songs`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name        | varchar   | not null              |
| artist_id   | integer   | not null, foreign key |
| album_id    | integer   | not null, foreign key |
| duration    | integer   | not null              |
| created-at  | datetime  | not null              |
| updated-at  | datetime  | not null              |

* `artist_id` references `users` table
* `album_id` references `albums` table


## `albums`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name        | varchar   | not null              |
| artist_id   | integer   | not null, foreign key |
| cover_img   | file      | not null              |
| created-at  | datetime  | not null              |
| updated-at  | datetime  | not null              |


* `artist_id` references `users` table


## `likes`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| user_id     | integer   | not null, foreign key |
| song_id     | integer   | not null, foreign key |

* `user_id` references `users` table
* `song_id` references `songs` table


<!-- ## `playlists`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| playlist_name| varchar  | not null              |
| creator_id  | integer   | not null, foreign key |
| song_id     | integer   | not null, foreign key |
| created-at  | datetime  | not null              |
| updated-at  | datetime  | not null              |

* `creator_id` references `users` table
* `song_id` references `songs` table -->
