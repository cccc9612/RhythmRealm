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

This page displays the five songs and five albums, as well as a navigation bar with login/signup or logout buttons. 

* `GET /`


## `/songs`

This page displays ten most recently created songs, with their duration and likes, a logged in user can play the songs, as well as like or unlike the songs.

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
* `DELETE /songs/:id/dislike`


## `/users/current`

 If the logged in user owns the album or the songs, this page also displays an update and delete button. 

* `GET /users/current`
* `POST /users/current/albums`
* `PUT /users/current/albums/:id`
* `DELETE /users/current/albums/:id`
* `POST /users/current/songs`
* `PUT /users/current/songs/:id`
* `DELETE /users/current/songs/:id`


## `/search/:params`
This page displays the results of the matched songs or artists
