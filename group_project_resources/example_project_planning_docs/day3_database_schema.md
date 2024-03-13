# **Database Schema**

## `users`

| column name | data type | details                   |
|-------------|-----------|---------------------------|
| id          | integer   | not null, primary key     |
| username    | varchar   | not null,                 |
| email       | varchar   | not null, indexed, unique |
| password    | varchar   | not null                  |
| first_name  | varchar   | not null                  |
| last_name   | varchar   | not null                  |

## `songs`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name        | varchar   | not null              |
| author_id   | integer   | not null, foreign key |
| song_length | integer   | not null              |
| num_of_plays| integer   | not null              |
| created-at  | datetime  | not null              |
| updated-at  | datetime  | not null              |

## `albums`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| name        | varchar   | not null              |
| author_id   | integer   | not null, foreign key |
| song_id     | integer   | not null, foreign key |
| created-at  | datetime  | not null              |
| updated-at  | datetime  | not null              |

* `author_id` references `users` table
* `song_id` references `songs` table


## `likes`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| user_id     | integer   | not null, foreign key |
| song_id     | integer   | not null, foreign key |

* `user_id` references `users` table
* `song_id` references `songs` table


## `search`
| column name | data type | details               |
|-------------|-----------|-----------------------|
