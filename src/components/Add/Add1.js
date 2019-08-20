import React from "react";
import {Form, Button, Col, Row, Container} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import ReactSearchBox from 'react-search-box'

class Add1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
    this.deleteName = this.deleteName.bind(this);

    this.state = {
      errMsg: "",
      hackathonchoice: "",
      hackathons: [{hackathon: "hackcewit", name: "404 found"}, {hackathon: "sbuhacks", name: "another name found"}],
      memberList: [{value: "george"}],
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
    this.baseState = this.state;
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
    const {available} = this.state;  // write query here for available people
    const {hackathons} = this.state; // get user's teams + hackathon name - list of objects
    const {memberList} = this.state; // get members on that team - 

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
                  <Form.Label>Which Team?</Form.Label>
                  <Form.Control as="select" name="hackathonchoice" value={this.state.hackathonchoice} onChange={this.handleAddChange}>
                    <option>Choose...</option>
                      {hackathons.map((item, index) => ( 
                          <option>{item.name} - {item.hackathon}</option>
                      ))}
                  </Form.Control>
                </Form.Group>

                

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Choose Teammates (max 3) </Form.Label>
                    <br></br>
                    <small>(Note: they must select that they are attending this hackathon)</small>
                    <br></br>
                    <div class="search">
                      <span class="fa fa-search"></span>
                      <ReactSearchBox
                      placeholder="Teammate name"
                      data={available}
                      dropDownBorderColor="blue"
                      onFocus={() =>  event.target.value = null}
                      onSelect={(record) => {
                                    if (memberList.length < 3 && memberList.indexOf(record) === -1)
                                    this.setState({ memberList: this.state.memberList.concat(record) })}}
                    />
                    </div>
                    
                    <MemberTags vals={memberList}/>
                    <br></br>
                    <Button variant="outline-danger" size="sm" onClick={() => this.deleteName()}>Remove Last Added</Button>
                    </Form.Group>

                <Button variant="success" type="submit">
                  Add Teammates
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
    if (this.baseState.memberList.length < this.state.memberList.length && this.state.hackathonchoice != "")
      console.log(this.state)
    else 
      alert("fill in all fields")
  };

  deleteName(event){
    let memberList = this.state.memberList.slice();
      if (this.baseState.memberList.length < this.state.memberList.length) {
      memberList.splice(memberList.length-1, 1);
      this.setState({memberList}); 
      }
  };
}

export default withRouter(Add1);
