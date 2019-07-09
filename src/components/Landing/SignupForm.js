import React from "react";
import {Form, Button, Col, FormControl} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { store } from '../../store.js'
import config from '../../config/client';
import { fetchItems } from '../../actions/items';


class SignupForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        errMsg: ""
      };
    }

    render() {
        const { firstName, lastName, email, password, confirmPassword, errMsg } = this.state;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <Form.Row>
                <Form.Group as={Col} controlId="formFirstName">
                <FormControl 
                name="firstName"
                type = "text"
                placeholder="First Name"
                required={true}
                value={firstName}
                onChange={this.handleChange}
                 />
                </Form.Group>

                <Form.Group as={Col} controlId="formLastName">
                <FormControl 
                name="lastName"
                type = "text"
                placeholder="Last Name"
                required={true}
                value={lastName}
                onChange={this.handleChange}
                 />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formEmail">
              <FormControl 
                name="email"
                type = "email"
                placeholder="Email"
                required={true}
                value={email}
                onChange={this.handleChange}
                 />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <FormControl 
                name="password"
                type = "password"
                placeholder="Password"
                required={true}
                value={password}
                onChange={this.handleChange}
                 />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
              <FormControl 
                name="confirmPassword"
                type = "password"
                placeholder="Confirm Password"
                required={true}
                value={confirmPassword}
                onChange={this.handleChange}
                 />
                 <small>{errMsg}</small>
              </Form.Group>
              
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
        );
    }

    handleChange(event){
        this.setState({
          [event.target.name]: event.target.value
        });

       // if (event.target.value.length === 3)
       //   alert('hi');
      };
  
    handleSubmit(event){
      event.preventDefault();

      if (this.state.password !== this.state.confirmPassword)
        this.setState({
        errMsg: "password and confirm password do not match."
      });

      if (this.state.password.length < 6)
        this.setState({
        errMsg: "password needs to be at least 6 characters long."
      });

      var url = config.endpoint + 'register';
      var data = JSON.stringify({"name": "kenny GOng", "email":"abc@gmail.com", "password": "qwer"});
      store.dispatch(fetchItems(url, data, "POST"));
    };


}
export default withRouter(SignupForm)
