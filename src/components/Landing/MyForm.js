import React from "react";
import {Form, Button, FormControl} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import { store } from '../../store.js'
import config from '../../config/client';
import { fetchItems } from '../../actions/items';

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.state = {
      email: "",
      password: "",
      errMsg: "errMsg"
    };
  }

  render() {
    const { email, password, errMsg } = this.state;
    return (
      <Form inline onSubmit={this.handleLoginSubmit.bind(this)}>
        <small>-{errMsg}-</small>
        <Form.Group>
            <FormControl
            name="email"
            type="email"
            placeholder="Email"
            required={true}
            value={email}
            onChange={this.handleLoginChange}
            />
        </Form.Group>
        <Form.Group>
            <FormControl
            name="password"
            type="password"
            placeholder="Password"
            required={true}
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
    var data = JSON.stringify({"email": this.state.email, "password": this.state.password});
  //  store.dispatch(fetchItems(url, data, "POST"));
    //     fetch(url,data,"POST").then(function(response) {
    //     if (response.status >= 400) {
    //         throw new Error("Bad response from server");
    //     }
    //     console.log("success");
    // })
    console.log(url);
    fetch(url, {
      method: 'POST',
      headers: {
          // Check what headers the API needs. A couple of usuals right below
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      data: JSON.stringify({"email": this.state.email, "password": this.state.password})
  }).then(function (response) {
      if (response.status != 200) {
          console.log("qwerqwer")
      }
      return response.json();
  }).then(function (json) {
    console.log("then2")
  }).catch(function(err){
      console.log(err);
  });
  };

}

export default withRouter(MyForm);