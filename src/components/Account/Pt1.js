import React from "react";
import {Form, Button, FormControl} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { store } from '../../store.js'
import config from '../../config/client';
import { fetchItems } from '../../actions/items';
import decode from 'jwt-decode';
import axios from 'axios';

class Pt1 extends React.Component {
  componentDidMount() {
    if(localStorage.auth_token){
      var config = {
        headers: {'Authorization': 'Bearer ' + localStorage.auth_token.toString()}
      };
      axios.get(`http://127.0.0.1:5000/auth/account`, config)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }
  }
  render() { 
    return (
       <div>PT1</div>
    );
  }

}

export default withRouter(Pt1);