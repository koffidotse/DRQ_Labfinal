// Server Setup local host 4000 
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require("body-parser");


//to avoid cors error 
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Routing point
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Routing point 2 Movies passing down to server
app.get('/api/movies', (req, res) => {

    const mymovies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },

    ];

    //Passing object mymovies and ok message
    res.status(200).json({
        message: "Everything is ok",
        movies: mymovies
    });
})

//Routing point listening for post request and it will pull title year and poster out of the body
app.post('api/movies', (req, res) => {
    console.log('Movie Received!');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
