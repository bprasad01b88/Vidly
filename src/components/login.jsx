import React, { Component } from "react";
import Form from "./common/form";
import auth from '../services/authService';
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  //define joi validation schema
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    // call from server
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const {state} = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (ex) {
      if(ex.response && ex.response.status === 400){
        // clone the errors object and set them into a new object calles errors
        const errors = {...this.state.errors};
        // check if username is invalid then return a error msg
        errors.username = ex.response.data;
        // updating a state using setState and pass them the new errors object
        this.setState({ errors });  
      }
    }
    
  };

  render() {
   if(auth.getCurrentUser()) return <Redirect to="/" />
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput( "username", "Username" )}
          {this.renderInput( "password", "Password", "password" )}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
