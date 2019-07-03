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
      <Form inline onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group>
            <FormControl
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            />
        </Form.Group>
        <Form.Group>
            <FormControl
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    );
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  handleSubmit(event){
    event.preventDefault();

    console.log(config.endpoint + 'items');
    store.dispatch(fetchItems(config.endpoint + 'items'));

    console.log("Submitting");
    console.log(this.state);
    if (this.state.email === 'q@q') {
      this.props.history.push("/home");
    }
  };
}

export default withRouter(MyForm);