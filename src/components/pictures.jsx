import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";

class Pictures extends Component {
    state = { 
        movies : getMovies()
    }

    handleDelete = movie => {
        console.log(movie);
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
    }
    render() { 

        const {length : count } = this.state.movies;
        if(count === 0) return <h2>There is no available movies</h2>
        return (
            <React.Fragment>
            <h2>Movies Component</h2>
            <p>Showing {count} movies are available</p>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.movies.map(movie => (
                    <tr  key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td><button onClick={ () => this.handleDelete(movie)} className='btn btn-danger btn-sm'>DELETE</button></td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
            </React.Fragment>
        );
    }
}
 
export default Pictures;