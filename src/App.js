import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import Customer from "./components/customer";
import Rental from "./components/rentals";
import NotFound from "./components/not-found";
import MovieForm from "./components/movieForm";
import RegisterForm from "./components/registerForm";
import Login from "./components/login";
import Logout from './components/logout';
import auth from "./services/authService";
import ProtectedRoute from './components/common/protectedRoute';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount(){
   const user = auth.getCurrentUser();
    // updating the state
    this.setState({ user });
  }

  render() {

    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar  user={user}/>
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" 
              render={ props => <Movies { ...props } user={this.state.user} /> } />
            <Route path="/customers" component={Customer} />
            <Route path="/rentals" component={Rental} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
