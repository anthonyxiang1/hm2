import React from "react";
import {Form, Button, FormControl} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { store } from '../../store.js'
import config from '../../config/client';
import { fetchItems } from '../../actions/items';


class RegPt1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //gender: "",
      // school: "",
      // major: "",
      // grad: "",
      // education: "",
      // hackCount: ""
    };
  }

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
    //const { gender, school, major, grad, education, hackCount } = this.state;
  return (
      <div className="registration">
        <div>REG1</div>
        <Form inline onSubmit={this.handleSubmit.bind(this)}>
          <Button type="submit">Register</Button>
        </Form>
      </div>
      
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

export default withRouter(RegPt1);
