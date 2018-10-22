# liri-node-app

## Table of Contents 
1. [Overview](#overview)
2. [Technologies](#technologies)
3. [Local Installation](#installation)
4. [Code Explain](#display)

<a name="overview"></a>
## Overview 
LIRI is like iPhone's SIRI. While SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

<a name="technologies"></a>
## Technologies

* JavaScript
* Node.js
* Moment.js
* Bands In Town API
* Spotify API
* OMDB API
* Node packages: Node-Spotify-API, Moment, DotEnv, Request

<a name="installation"></a>
## Local Installation

Download the files to your computer from https://github.com/hyxhuynh/liri-node-app 


<a name="display"></a>
## Code Explain
* Authentication keys for Spotify are stored in "keys.js", and we are exporting its contents to the main "liri.js" file
* There are four main function to this app depending on user's command which will render the information about each event/song/movie from the corresponding API to the terminal: 
    * (1) `concert-this <artist/band name here>`: venue name, venue location, date of the event (MM/DD/YYYY) by making a HTTP request to the Bands In Town API
    * (2) `spotify-this-song '<song name here>`: song name, artist(s), preview link, album of the song using the `search` method from Node Spotify API 
    * (3) `movie-this '<movie name here>'`: title, year, IMDB rating, Rotten Tomatoes rating, country, language, plot, and actors of the movie by making a HTTP request to the OMDB API
    * (4) `do-what-it-says`: Using the `fs` Node package, LIRI will take the text inside of `random.txt` and then use it to call one of LIRI's commands
* In addition to logging the data to the terminal/bash window, output the data to a .txt file called `log.txt`.
* Error-checking mechanism is in place if command is invalid or missing.

