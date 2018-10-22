// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
//require and configure dotenv npm
require("dotenv").config();

// Includes the FS package for reading and writing packages
var fs = require("fs");

// Moment.js is a lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates
// require moment npm
var moment = require('moment');

// require keys.js
var keys = require("./keys")

// require request npm
var request = require("request");

// user's command
var command = process.argv[2];

// user's input followed above command
var query = process.argv.slice(3).join(" ");

// ================= CONCERT-THIS =================
// bandsintown API
var bandintownURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";

// function for concert-this command =======================
var concertThis = function() {
    request(bandintownURL, function(error, response, body) {
        // parse the response body (string) to a JSON object
      
        var jsonData = JSON.parse(body);
        for (var i = 0; i < jsonData.length; i++) {
            // if no error
            if (!error && response.statusCode === 200) {
                var concertData = [
                    '\n---------------\n',
                    "* Queried Artist/ Band Name: " + query.toUpperCase(),
                    "* Name of the Venue:         " + jsonData[i].venue.name,
                    "* Venue Location:            " + jsonData[i].venue.city + ', ' + jsonData[i].venue.country,
                    "* Date of the Event:         " + moment(jsonData[i].datetime).format('MM/DD/YYYY')
                ].join("\n");
                
                // Append concertData to log.txt, print concertData to the console
                fs.appendFile("log.txt", concertData, function(err) {
                    if (err) throw err;
                    console.log(concertData);
                });
            }
        }
    });
}

// ================= SPOTIFY-THIS-SONG =================
// require node-spotify-api
var Spotify = require('node-spotify-api');

// import the `keys.js` file and store it in a variable
var spotify = new Spotify(keys.spotify);

var spotifyThisSong = function(songQuery) {
    if(songQuery === undefined || songQuery === '') {
        songQuery = "the sign ace of base"; 
    }

    spotify.search({ type: 'track', query: songQuery }, function(error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        } else {
            var jsonData = data.tracks.items;
                
            for (var i = 0; i < jsonData[0].artists.length; i++) {
                var songData = [
                    '\n---------------\n',
                    "* Song:         " + data.tracks.items[0].name,
                    "* Artist:       " + jsonData[0].artists[i].name,
                    "* Preview Link: " + data.tracks.items[0].preview_url,
                    "* Album:        " + data.tracks.items[0].album.name
                ].join("\n");
                
            }
        }

        // Append songData to log.txt, print songData to the console
        fs.appendFile("log.txt", songData, function(err) {
            if (err) throw err;
            console.log(songData);
        });
    });
}

// ================= MOVIE-THIS =================
// require OMDB-api
var movieThis = function(movieQuery) {
	// Load request npm module
    var request = require("request");
    

	// if query that is passed in is undefined, Mr. Nobody becomes the default
	if(movieQuery === undefined || movieQuery === '') {
		movieQuery = "mr nobody";
    }
    var omdbURL = "https://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";
   
    request(omdbURL, function(error, response, body) {
        // parse the response body (string) to a JSON object
        
        var jsonData = JSON.parse(body);
        
        // if no error
        if (!error && response.statusCode === 200) {
            //console.log(jsonData.Title)
            var movieData = [
                '\n---------------\n',
                "* Title of the movie:                    " + jsonData.Title,
                "* Year the movie came out:               " + jsonData.Year,
                "* IMDB Rating of the movie:              " + jsonData.imdbRating,
                "* " + jsonData.Ratings[1].Source + " Rating of the movie:   " + jsonData.Ratings[1].Value,
                "* Country where the movie was produced:  " + jsonData.Country,
                "* Language of the movie:                 " + jsonData.Language,
                "* Plot of the movie:                     " + jsonData.Plot,
                "* Actors in the movie:                   " + jsonData.Actors,
            ].join("\n");

            // Append movieData to log.txt, print movieData to the console
            fs.appendFile("log.txt", movieData, function(err) {
                if (err) throw err;
                console.log(movieData);
            });
        }
    
    });
    
}

// ================= COMMAND AND USER'S QUERY =================
// Apply each command with user's query

if(command === "concert-this") {
	concertThis();
} else if(command === "spotify-this-song") {
	spotifyThisSong(query);
} else if(command === "movie-this") {
	movieThis(query);
} else if (command === "do-what-it-say") {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
      
        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");
        command = output[0];
        query = output[1];
        if(command === "concert-this") {
            concertThis();
        } else if(command === "spotify-this-song") {
            spotifyThisSong(query);
        } else if(command === "movie-this") {
            movieThis(query);
        }

      });
} else if (command === undefined) {
    console.log("ERROR: Missing Command")
} else {
    console.log("ERROR: Command Invalid")
}

