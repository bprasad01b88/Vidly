import http from './httpService'
import  config  from '../config.json';

const apiEndpoint = config.apiUrl;

export function getMovies() {
    return http.get(apiEndpoint + '/movies'); 
}

export function getMovie(movieId) {
    return http.get(apiEndpoint + '/movies' + '/' + movieId); 
}

export function saveMovie(movie){
    // check if movie is exists
    if(movie._id){
        // clone of the movie object and assign it into a new variable
        const body = {...movie};
        // delete the id of the clone movie object
        delete body._id;
        return http.put(apiEndpoint + '/movies' + '/' + movie._id, body)
    }

    return http.post(apiEndpoint + '/movies', movie);
}

export function deleteMovie(movieId){
    console.log(movieId);
    return http.delete(apiEndpoint + '/movies' + '/' + movieId);
}