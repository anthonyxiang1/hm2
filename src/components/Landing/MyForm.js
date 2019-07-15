import React from "react";
import {Form, Button, FormControl} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { store } from '../../store.js'
import config from '../../config/client';
import { fetchItems } from '../../actions/items';
import decode from 'jwt-decode';
import axios from 'axios';

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    const { email, password } = this.state;
    return (
      <Form inline onSubmit={this.handleLoginSubmit.bind(this)}>
        <Form.Group>
            <FormControl
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={this.handleLoginChange}
            />
        </Form.Group>
        <Form.Group>
            <FormControl
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.handleLoginChange}
            />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    );
  }

  token(){
    console.log(localStorage.getItem('auth_token'));
  };

  handleLoginChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleLoginSubmit(event){
    event.preventDefault();
    axios.post(`http://127.0.0.1:5000/auth/login`, 
      {
        "email":"test@test.com",
        "password":"test"
      }).then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.data['auth_token']);
        localStorage.setItem('auth_token', res.data['auth_token']);
      })
    
    // var url = config.endpoint + 'login';
    // var data = JSON.stringify({"email":"abc@gmail.com", "password": "qwer"});
    // store.dispatch(fetchItems(url, data, "POST"));
  };

}

export default withRouter(MyForm);