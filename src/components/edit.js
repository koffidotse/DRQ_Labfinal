import React from 'react';
import '../App.css';
import axios from 'axios';

export class Edit extends React.Component {
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
    
    componentDidMount() {
        console.log(this.props.match.params.id);
        //Reading data from server and returnback data as response
        axios.get('http://localhost:4000/api/movies/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    Title: response.data.title,
                    Year: response.data.year,
                    Poster: response.data.poster
                })

            })
            .catch((error) => {
                console.log(error);
            });

    }


    // Display Movie title
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
    //submit method will allow user to post movie data into server
    onSubmit(e) {
        e.preventDefault();
        alert("Movie: " + this.state.Title + " "
            + this.state.Year + " " +
            this.state.Poster);

        //object
        const newMovie = {
            title: this.state.Title,
            year: this.state.Year,
            poster: this.state.Poster,
            _id: this.state._id
        }

        //callback method 
        axios.put('http://localhost:4000/api/movies/' + this.state._id, newMovie)
            .then(res => {
                console.log(res.data)
            })
            .catch();

        // Sending data to server copied url from local host 4000
        // axios.post('http://localhost:4000/api/movies',newMovie)
        // .then((res)=>{
        //  console.log(res);
        //})
        //.catch((err)=>{
        // console.log(err);
        // });

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

                    <input type="submit" value="Edit Movie"></input>
                </form>
            </div>
        );
    }

}