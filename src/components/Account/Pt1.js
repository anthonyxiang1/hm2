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
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),
    });
     /*ApiCall().then((data) => {
         this.setState({data, loading: false})
     })*/
  }
  render() { 
    return (
       <div>PT1</div>
    );
  }

}

export default withRouter(Pt1);