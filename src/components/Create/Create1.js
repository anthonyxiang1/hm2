import React from "react";
import {Form, Button, Col, Row, Container, Modal} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ReactSearchBox from 'react-search-box'
import { throws } from "assert";

class Create1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleCreateChange = this.handleCreateChange.bind(this);
    this.deleteName = this.deleteName.bind(this);

    this.state = {
      modalPop: false,
      hack: "",
      idea: "",
      goal: "",
      name: "",
      members: [],
      available: [
        {
          value: 'John Doe',
        },
        {
          value: 'Jane Doe',
        },
        {
          value: 'Mary Phillips',
        },
        {
          value: 'Robert',
        },
        {
          value: 'Karius',
        },
      ]
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
    const {errMsg, modalPop} = this.state;
    const {available} = this.state;  // write the query here, make a constant of available hackers

    const MemberTags = ({vals}) => (
            <div>
            {
            vals.map((item, index) => ( 
                <Button key={index} variant="info" size="sm" disabled>{item.value}</Button>
                ))
            }
            </div>
      )

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

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Choose Teammates (max 3) </Form.Label>
                    <br></br>
                    <small>(Note: they must select that they are attending this hackathon)</small>
                    <br></br>
                    <ReactSearchBox
                      placeholder="Teammate name"
                      data={available}
                      dropDownBorderColor="blue"
                      onFocus={() =>  event.target.value = null}
                      onSelect={(record) => {
                                    if (this.state.members.length < 3 && this.state.members.indexOf(record) === -1)
                                    this.setState({ members: this.state.members.concat(record) })}}
                    />
                    <MemberTags vals={this.state.members}/>
                    <br></br>
                    <Button variant="outline-danger" size="sm" onClick={() => this.deleteName()}>Remove Last Added</Button>
                    </Form.Group>

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
                    <Form.Label>How important is winning the competition to your team?</Form.Label>
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
        if (this.state.hack !== "" && this.state.idea !== "" && this.state.goal !== "" && this.state.name !== ""){
        console.log(this.state)
        }
  }

  deleteName(event){
    let members = this.state.members.slice();  
      members.splice(members.length-1, 1);
      this.setState({members}); 
  };

}

export default withRouter(Create1);
