import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  // method for validation using JOI
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    //check if result of error is falsy then return null
    if (!result.error) return null;
    //define an empty error object
    const errors = {};
    // iterating over the array
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  // method for validating input property using Joi
  validateProperty = ({ name, value }) => {
    // creating a new object and get the input name dynamically
    const obj = { [name]: value };
    // define a new schema object & this obj have only one property and set them in dynamically
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    // check if error is null return null otherwise return error message
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    // clone the errors object using spread operator
    const errors = { ...this.state.errors };
    // call the validateProperty method and pass the input parameter
    const errorMessage = this.validateProperty(input);
    // check if the errorMsg is truthy then set to the property name
    if (errorMessage) errors[input.name] = errorMessage;
    // if the errorMsg is falsy then delete the errorMsg
    else delete errors[input.name];

    //clone the data array/object using spread operator
    const data = { ...this.state.data };
    // currentTarget returns input field and then get the value using value property
    data[input.name] = input.value;
    // update the state
    this.setState({ data, errors });
  };

  //method for handle form submit
  handleSubmit = (e) => {
    e.preventDefault();

    // call validate method
    const errors = this.validate();
    console.log(errors);
    // update the error object in he state
    this.setState({ errors: errors || {} });
    // check if error is occured then return the error msg
    if (errors) return;

    this.doSubmit();
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;
