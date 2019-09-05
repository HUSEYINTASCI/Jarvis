//npm i axios
const axios = require('axios');
//npm i dotenv
require("dotenv").config();
//api key
const keys = require("./keys.js");
//node function
const fs = require("fs");
//npm i node-spotify-api
const Spotify = require("node-spotify-api");
//Key for spotify
const spotify = new Spotify(keys.spotify);
//
var userpa2 = process.argv[2];
var userpa3 = process.argv.slice(3).join(" ");

//Execute function
Usertype(userpa2, userpa3);

//Functions node 
function Usertype(userpa2, userpa3) {
    switch (userpa2) {
        case 'concert-this':
            Concert(userpa3);
            break;
        case 'spotify-this-song':
            Song(userpa3);
            break;
        case 'movie-this':
            Movie(userpa3);
            break;
        case 'do-what-it-says':
            Random();
            break;
        default:
            console.log("Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

//Funtion for Concert Info: Bands in Town
function Concert(userpa3) {

    axios.get("https://rest.bandsintown.com/artists/" + userpa3 + "/events?app_id=codingbootcamp").then((res) => {

        for (var i = 0; i < res.data.length; i++) {

            console.log(i);
            fs.appendFileSync("log.txt", i + "\n");
            console.log("Name of the Venue: " + res.data[i].venue.name);
            fs.appendFileSync("log.txt", "Name of the Venue: " + res.data[i].venue.name + "\n");
            console.log("Venue Location: " + res.data[i].venue.city);
            fs.appendFileSync("log.txt", "Venue Location: " + res.data[i].city + "\n");
            console.log("Date of the Event: " + res.data[i].datetime);
            fs.appendFileSync("log.txt", "Date of the Event: " + res.data[i].datetime + "\n");

        }

    });
}

//Funtion for Music Info: Spotify
function Song(userpa3) {
    if (userpa3 === undefined) {
        userpa3 = "The Sign"; //default Song
    }
    spotify.search(
        {
            type: "track",
            query: userpa3
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {

                console.log(i);
                fs.appendFileSync("log.txt", i + "\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url + "\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");

            }
        }
    );
};

//Funtion for Movie Info: OMDB
function Movie(userpa3) {
    if (userpa3 === undefined) {
        userpa3 = "Mr. Nobody"
        console.log("-----------------------");
        fs.appendFileSync("log.txt", "-----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n");
        console.log("It's on Netflix!");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
    }
    var omdblink = "http://www.omdbapi.com/?t=" + userpa3 + "&plot=short&apikey=trilogy";
    axios.get(omdblink, {

    }).then(dt => {



        console.log("Title: " + dt.data.Title);
        fs.appendFileSync("log.txt", "Title: " + dt.data.Title + "\n");
        console.log("Release Year: " + dt.data.Year);
        fs.appendFileSync("log.txt", "Release Year: " + dt.data.Year + "\n");
        console.log("IMDB Rating: " + dt.data.imdbRating);
        fs.appendFileSync("log.txt", "IMDB Rating: " + dt.data.imdbRating + "\n");
        console.log("Country of Production: " + dt.data.Country);
        fs.appendFileSync("log.txt", "Country of Production: " + dt.data.Country + "\n");
        console.log("Language: " + dt.data.Language);
        fs.appendFileSync("log.txt", "Language: " + dt.data.Language + "\n");
        console.log("Plot: " + dt.data.Plot);
        fs.appendFileSync("log.txt", "Plot: " + dt.data.Plot + "\n");
        console.log("Actors: " + dt.data.Actors);
        fs.appendFileSync("log.txt", "Actors: " + dt.data.Actors + "\n");


    });
}


//function for reading out of random.txt file  
function Random() {
    fs.readFile("random.txt", 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        Usertype(dataArr[0], dataArr[1]);
    });
}
