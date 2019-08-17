import React from "react";
import {Form, Button, Col, Row, Container} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Create1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleCreateChange = this.handleCreateChange.bind(this);

    this.state = {
      errMsg: "",
      hack: "",
      idea: "",
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
        <div className="create">
          <Container>      
          <h1>Create a Team</h1>
          <br></br>
          <small>{errMsg}</small>
          <br></br>
            <Col > 
              <Row >
              <Form className="reg" onSubmit={this.handleCreateSubmit}>
                  <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Which Hackathon?</Form.Label>
                        <Form.Control as="select" name="hack" value={this.state.hack} onChange={this.handleCreateChange}>
                          <option>Choose...</option>
                          <option>SBUHacks</option>
                          <option>HackCEWIT</option>
                          <option>PennApps</option>
                        </Form.Control>
                    </Form.Group>

                    <h1>search goes here</h1>

                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Project Idea</Form.Label>
                                    <textarea className="form-control" rows="5"
                                    type="text"
                                    name="idea"
                                    placeholder="What is your project about? What are you using to make it? What skill level are you looking
                                    for in a possible teammate?" 
                                    value={this.state.idea}
                                    onChange={this.handleCreateChange}
                                    ></textarea>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>How much do your team want to win?</Form.Label>
                    <Form.Control as="select" name="goal" value={this.state.goal} onChange={this.handleCreateChange}>
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
                    <Form.Control name="name" placeholder="405 Found" value={this.state.name} onChange={this.handleCreateChange}>
                        
                    </Form.Control>
                </Form.Group>

                <Button variant="success" type="submit">
                  Create
                </Button>
              </Form> 
            </Row>
                
            </Col>
          </Container>
          <div className="bottom"></div>
        </div>
       
        );
      }

  handleCreateChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCreateSubmit(event){
    event.preventDefault();
    console.log(this.state)
  };
}

export default withRouter(Create1);
