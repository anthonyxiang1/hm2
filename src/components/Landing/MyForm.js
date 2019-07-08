import React from "react";
import {Form, Button, FormControl} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { store } from '../../store.js'
import config from '../../config/client';
import { fetchItems } from '../../actions/items';

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

  handleLoginChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleLoginSubmit(event){
    event.preventDefault();
    var url = config.endpoint + 'login';
    var data = JSON.stringify({"email":"abc@gmail.com", "password": "qwer"});
    store.dispatch(fetchItems(url, data, "POST"));
  };

}

export default withRouter(MyForm);