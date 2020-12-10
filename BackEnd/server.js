
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');//import path


//to avoid cors error 
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//configuration methods ,static methods and build methods
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

 //Configure build and static
app.use(express.static(path.join(__dirname,'..build')));
app.use('/static', express.static(path.join(__dirname,'build//static')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Connection with mongoDb
const myConnectionString = 'mongodb+srv://admin:admin2@cluster0.jnlag.mongodb.net/movies?retryWrites=true&w=majority';

mongoose.connect(myConnectionString, { useNewUrlParser: true });
// schema defined for the data stored in mongodb
const Schema = mongoose.Schema;
var movieSchema = new Schema({
    title: String,
    year: String,
    poster: String
});

//create model for database
var MovieModel = mongoose.model("movie", movieSchema);

//Routing point
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Routing point 2 Movies passing down to server
app.get('/api/movies', (req, res) => {

    // const mymovies = [
    //     {
    //         "Title": "Avengers: Infinity War",
    //         "Year": "2018",
    //         "imdbID": "tt4154756",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //         "Title": "Captain America: Civil War",
    //         "Year": "2016",
    //         "imdbID": "tt3498820",
    //         "Type": "movie",
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     },

    // ];

    MovieModel.find((err, data) => {
        res.json(data);
    })

})

app.get('/api/movies/:id', (req, res) => { // Listening for post request
    console.log(req.params.id);
    MovieModel.findById(req.params.id, (err, data) => {
        res.json(data);
    })

})
//The Put method to update/Edit records 
app.put('/api/movies/:id', (req,res) =>{
    console.log("Update movie: "+req.params.id);
    console.log(req.body);

    MovieModel.findByIdAndUpdate(req.params.id,req.body, {new:true},
      (err,data) =>{
          res.send(data);
      } )

})

app.post('/api/movies', (req, res) => {
    console.log('Movie Received!');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);
   
    MovieModel.create({  //Movie model
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster

    })
    res.send('item Added');

})
//* to use for all route and this method will send back all index files
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+ '/../build/index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
