import React from "react";
import {Container, Row, Col, Form, Button, FormControl} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { store } from '../../store.js'
import config from '../../config/client';
import { fetchItems } from '../../actions/items';

class Account1 extends React.Component {
  componentDidMount() {
    var url='http://localhost:5000/api/account';
    fetch(url, {
      method: 'GET',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({
      //   firstParam: 'yourValue',
      //   secondParam: 'yourOtherValue',
      // }),
    }).then(response => (console.log(response)));
     /*ApiCall().then((data) => {
         this.setState({data, loading: false})
     })*/
  }
  render() { 
    return (
      <div className="account">
      <img
         alt="propic"
         src={require("./assets/favicon.png")}
         width="200px"
         height="200px"
       />

       <h2>
           Username
       </h2>
       
       <h3>
           School | Grad Year
       </h3>
       <h3>
           Major | High School
       </h3>
       <Button variant="outline-primary" onClick={() => console.log(this.innerText)}>Edit Profile</Button>

       <Container className="boxes">
           <Row>
               <Col className="preferences col-md-4">
                   <div className="accent">Interests</div>
               </Col>
               <Col className="preferences col-md-4">
                   <div className="accent">Technologies</div>
               </Col>
               <Col className="preferences col-md-4">
                   <div className="accent">Fields</div>
               </Col>
           </Row>
           <Row>
               <Col className="preferences col-md-4">
                   <div className="accent">Languages</div>
                   Python
               </Col>
               <Col className="preferences col-md-4">
                   <div className="accent">Hackathons</div>
               </Col>
               <Col className="preferences col-md-4">
                   <div className="accent">About Me</div>
               </Col>
           </Row>
       </Container>
       <div className="bottom">
           
       </div>
     </div>
    );
  }

}

export default withRouter(Account1);