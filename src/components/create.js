import React from 'react';
import '../App.css';
import axios from 'axios';

export class Create extends React.Component {
    // Constructors
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeMovieName = this.onChangeMovieName.bind(this);
        this.onChangeMovieYear = this.onChangeMovieYear.bind(this);
        this.onChangeMoviePoster = this.onChangeMoviePoster.bind(this);

        this.state = {
            Title: '',
            Year: '',
            Poster: ''
        }
    }
    //here we display movie function 
    onChangeMovieName(e) {
        this.setState({ Title: e.target.value }); 
    }
    //Display movie year
    onChangeMovieYear(e) {
        this.setState({ Year: e.target.value });
    }
    //Display movie poster
    onChangeMoviePoster(e) {
        this.setState({ Poster: e.target.value });
    }
    //submit function this will allow user to post movie data into server
    onSubmit(e) {
        e.preventDefault();
        alert("Movie: " + this.state.Title + " "
            + this.state.Year + " " +
            this.state.Poster);

        //objects
        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster
        }
        //url send data to local host 4000
        axios.post('http://localhost:4000/api/movies',newMovie)
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            });

    }
    // 3 Div for Movie Title,year,poster data display onSubmit function in form will save all movie data.
    render() {
        return (
            <div>
                <h3>Hello from create component</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Please add movie title</label>
                        <input type="text" className="form-control" value={this.state.Title} onChange={this.onChangeMovieName}></input>
                    </div>

                    <div className="form-group">
                        <label>Please add movie year</label>
                        <input type="text" className="form-control" value={this.state.Year} onChange={this.onChangeMovieYear}></input>
                    </div>

                    <div className="form-group">
                        <label>Please add movie poster</label>
                        <input type="text" className="form-control" value={this.state.Poster} onChange={this.onChangeMoviePoster}></input>
                    </div>

                    <input type="submit" value="Add Movie"></input>
                </form>
            </div>
        );
    }

}
