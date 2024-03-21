# User-facing routes

## `/login`

### Log in page

This page displays a log in form

* `GET /login`
* `POST /login`

## `/signup`

This page displays a signup form.

### Sign up page

* `GET /signup`
* `POST /signup`

## `/`

This page displays the ten songs and ten albums, as well as a navigation bar with login/signup or logout buttons. 

* `GET /`
* `GET /songs`
* `GET /albums`


## `/songs`

This page displays five most recently created songs, with their duration and likes, a logged in user can play the songs, as well as like or unlike the songs.

* `GET /songs`
* `GET /songs/:id`
* `POST /songs/:id/like`
* `DELETE /songs/:id/dislike`

## `/albums`

This page displays ten most recently created albums.

* `GET /albums`


## `/albums/:id`

This page displays individual album with associated songs and likes, a logged in user can play the songs, as well as like or unlike the songs.

* `GET /albums/:id`
* `POST /songs/:id/like`
* `PUT /albums/:id/add`
* `DELETE /songs/:id/dislike`


## `/users/current/albums`

This page displays all the albums belonging to the logged-in user, this page also displays an update, delete, and add songs button.

* `GET /users/current`(get current user)
* `GET /users/current/albums`
* `POST /users/current/albums`
* `PUT /users/current/albums/:id/update`
* `DELETE /users/current/albums/:id/delete` 


## `/users/current/songs`

This page displays all the songs belonging to the logged-in user, this page also displays an update, delete, and add songs to album button.

* `GET /users/current`(get current user)
* `GET /users/current/songs`
* `POST /users/current/songs`
* `PUT /users/current/songs/:id/update`
* `DELETE /users/current/songs/:id/delete` 


## `/search/albums`
This page displays the results of the matched albums

* `POST /search/albums`

## `/search/songs`
This page displays the results of the matched songs

* `POST /search/songs`
