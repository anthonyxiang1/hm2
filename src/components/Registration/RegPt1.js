import React from "react";
import {Form, Button, Col, Row, Container, ProgressBar} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { store } from '../../store.js'
import config from '../../config/client';
import { fetchItems } from '../../actions/items';


class RegPt1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      school: "",
      major: "",
      year: "",
      education: "",
      hackCount: ""
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
    return (
        <div className="registration">
          <Container>      
          <ProgressBar variant="success" animated now={33} label={`${33}%`}/>
          <br/>
          <h1>Register</h1>
            <Col > 
              <Row >
              <Form className="reg">
                <Form.Row>
                  <Form.Label>Gender:  </Form.Label>
                {['radio'].map(type => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check inline label="Male" type={type} id={`inline-${type}-1`} />
                    <Form.Check inline label="Female" type={type} id={`inline-${type}-2`} />
                    <Form.Check inline label="Other" type={type} id={`inline-${type}-3`} />
                  </div>
                ))}
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                  <Form.Label>School</Form.Label>
                  <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Major</Form.Label>
                    <Form.Control as="select">
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Control>
                  </Form.Group>

                <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Grad Year</Form.Label>
                    <Form.Control as="select">
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Education Level</Form.Label>
                    <Form.Control as="select">
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Hackathons</Form.Label>
                    <Form.Control as="select">
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                  Next
                </Button>
              </Form> 
            </Row>
                
            </Col>
          </Container>
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
