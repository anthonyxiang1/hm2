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
      memberList: [{value: "Ynze Beekhof"}],
      available: [
        {id: "5d5ace3f432fa135145b2c93", value: "Patsy Ortiz"},
        {id: "5d5ace38432fa135145b2c82", value: "Adam Gonzalez"},
        {id: "5d5ace37432fa135145b2c81", value: "Etienne Denys"},
        {id: "5d5ace34432fa135145b2c7a", value: "Louis Banks"},
        {id: "5d5ace3c432fa135145b2c8b", value: "Evelyn Carlson"},
        {id: "5d5ace3d432fa135145b2c8f", value: "Emilie Jensen"},
        {id: "5d5ace36432fa135145b2c7e", value: "Julian Hammes"},
        {id: "5d5ace3f432fa135145b2c95", value: "Julie Petersen"},
        {id: "5d5ace2c432fa135145b2c70", value: "Emile Meunier"},
        {id: "5d5ace33432fa135145b2c77", value: "Elisabetha Gaillard"},
        {id: "5d5ace3a432fa135145b2c87", value: "Bianca Thiem"},
        {id: "5d5ace2c432fa135145b2c6f", value: "Elias Makela"},
        {id: "5d5ace34432fa135145b2c79", value: "Gabe Daniels"},
        {id: "5d5ace30432fa135145b2c71", value: "Colette Riviere"},
        {id: "5d5ace43432fa135145b2c9a", value: "Addison Thompson"},
        {id: "5d5ace39432fa135145b2c86", value: "Marianne Miller"},
        {id: "5d5ace36432fa135145b2c7f", value: "Marvin Leclercq"},
        {id: "5d5ace3f432fa135145b2c94", value: "Olivia Christiansen"},
        {id: "5d5ace30432fa135145b2c72", value: "Ema Walstad"},
        {id: "5d5ace31432fa135145b2c74", value: "Aapo Lahti"},
        {id: "5d5ace38432fa135145b2c84", value: "Jen Hill"},
        {id: "5d5ace41432fa135145b2c99", value: "Annabelle Slawa"},
        {id: "5d5ace3d432fa135145b2c8e", value: "test test"}
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
              <Form className="crea" onSubmit={this.handleAddSubmit}>
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
