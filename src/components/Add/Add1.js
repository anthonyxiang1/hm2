import React from "react";
import {Form, Button, Col, Row, Container} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Add1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);

    this.state = {
      errMsg: "",
      hackList: [],
      idea: "made when choosing a hackathon",
      goal: "",
      name: "",
      available: ["ant", "bob", "cat", "dog"],
      memberList: ["george"]
    };
  }

  componentDidMount() {
    var url='http://localhost:5000/api/account';
    fetch(url, {
      method: 'GET',
    }).then(response =>{
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const {errMsg} = this.state;

        return (
        <div className="add">
          <Container>      
          <h1>Add to Team</h1>
          <br></br>
          <small>{errMsg}</small>
          <br></br>
            <Col > 
              <Row >
              <Form className="reg" onSubmit={this.handleAddSubmit}>
                  <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Which Hackathon?</Form.Label>
                        <Form.Control as="select" onChange={this.handleAddChange}>
                          <option>Choose...</option>
                          <option>From ones you are going to</option>
                        </Form.Control>
                    </Form.Group>

                    <h1>search goes here</h1>

                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Project Idea</Form.Label>
                                    <textarea className="form-control" rows="5"
                                    type="text"
                                    name="idea"
                                    value={this.state.idea}
                                    onChange={this.handleAddChange}
                                    >{this.state.idea}</textarea>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>How much do your team want to win?</Form.Label>
                    <Form.Control as="select" name="goal" value={this.state.goal} onChange={this.handleAddChange}>
                        <option>Choose...</option>
                        <option>Not that important</option>
                        <option>A bit important</option>
                        <option>Somewhat important</option>
                        <option>Very important</option>
                        <option>The most important</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control name="name" placeholder="405 Found" value={this.state.name} onChange={this.handleAddChange}>
                        
                    </Form.Control>
                </Form.Group>

                <Button variant="success" type="submit">
                  Add
                </Button>
              </Form> 
            </Row>
                
            </Col>
          </Container>
          <div className="bottom"></div>
        </div>
       
        );
      }

  handleAddChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleAddSubmit(event){
    event.preventDefault();
    console.log(this.state)
  };
}

export default withRouter(Add1);
