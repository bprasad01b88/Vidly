import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";
import _ from "lodash";
import Link from "react-router-dom/Link";

class Movies extends Component {
  state = {
    // defined an empty array
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery : "",
    selectedGenre : null,
    sortColumn: { path: "title", order: "asc" },
  };

  // initializing the movies and genre property of the state object
  async componentDidMount() {
    const { data } = await getGenres();
    const { data : movies} = await getMovies();
    // define new constant and set into new array and
    // spread the array thet is reurn from the getGenres function
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }
  // function for delete movie
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try{
     await deleteMovie(movie._id);
    } catch(ex){
      if(ex.response && ex.response.status === 404)
        toast.error("This Movie Has Already Been Deleted!...");
      this.setState({ movies : originalMovies });
    }
  };

  // function for like movie
  handleLike = (movie) => {
    // clone of the movie object and assign into a new variable named movies
    const movies = [...this.state.movies];
    // In this array find index of the object
    const index = movies.indexOf(movie);
    // clone of this new object it copies all of the property here
    movies[index] = { ...movies[index] };
    // Toggle the object so if it is true it becomes false otherwise it becomes true
    movies[index].liked = !movies[index].liked;
    // update the state object using setState method
    this.setState({ movies });
  };

  // function for set pagination
  handlePageChange = (page) => {
    // set the current page property to this page
    this.setState({ currentPage: page });
  };

  // function for select genre
  handleGenreSelect = (genre) => {
    // store the genre in state
    this.setState({ selectedGenre: genre, searchQuery : "", currentPage: 1 });
  };

  // function for handling sorting
  handleSort = (sortColumn) => {
    // update the state based on sortColumn
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery : query, selectedGenre : null, currentPage : 1});
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;


    let filtered = allMovies;
    if(searchQuery)
      filtered = allMovies.filter(
        m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
      else if(selectedGenre && selectedGenre._id)
        filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

    // // apply filter method to get tha data based on their respective genre
    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
    //     : allMovies;

    // apply orderBy method to sort the data and it will take filtered array,
    // path and order as an argument and return a new array
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // calling the paginate function and pass the sorted function as an argument
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // find length of the movies object
    const { length: count } = this.state.movies;

    const { totalCount, data: movies } = this.getPagedData();

    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { user } = this.props;

    if (count === 0) return <p>There Are No Movies Available</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          { user && <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>}
          <SearchBox value={searchQuery} onChange={this.handleSearch}/>
          <p>Showing {totalCount} Movies Available.</p>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
