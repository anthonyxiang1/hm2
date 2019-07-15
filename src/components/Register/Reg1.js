import React from "react";
import {Form, Button, FormControl} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { store } from '../../store.js'
import config from '../../config/client';
import { fetchItems } from '../../actions/items';

class Pt1 extends React.Component {
  componentDidMount() {
    var url='http://localhost:5000/api/account';
    fetch(url, {
      method: 'GET',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
      // data: JSON.stringify({
      //   firstParam: 'yourValue',
      //   secondParam: 'yourOtherValue',
      // }),
    }).then(response =>{
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
     /*ApiCall().then((data) => {
         this.setState({data, loading: false})
     })*/
  }
  render() { 
    return (
       <div>REG1</div>
        <Form inline onSubmit={this.handleSubmit.bind(this)}>
          <Button type="submit">Register</Button>
        </Form>
    );
  }

  handleSubmit(event){
    event.preventDefault();
    var url = config.endpoint + 'register';
    var data = JSON.stringify({"email":"abc@gmail.com", "password": "qwer"});
    //store.dispatch(fetchItems(url, data, "POST"));
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: data
    }).then(response =>{
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  };

}

export default withRouter(Pt1);