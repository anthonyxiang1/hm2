import React from "react";
import {Form, Button, Col, Row, Container, Modal} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ReactSearchBox from 'react-search-box'
import { throws } from "assert";
import axios from 'axios';

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
      hackathons: [],
      available: [
        {id: "5d5ace40432fa135145b2c96", value: "Ynze Beekhof"},
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
  }

  componentDidMount() {
    var url='http://localhost:5000/hackathons/get';
    var config = {
      headers: {'Authorization': 'Bearer ' + localStorage.auth_token.toString()}
    };
    axios.get(url, config)
      .then(res => {
        console.log(res);
        var hackathons = res.data['hackathons'];
        this.setState({hackathons: hackathons})
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
              <Form className="crea" onSubmit={this.handleCreateSubmit}>
                  <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Which Hackathon?</Form.Label>
                        <Form.Control as="select" name="hack" value={this.state.hack} onChange={this.handleCreateChange}>
                          <option>Choose...</option>
                            {this.state.hackathons.map((item, index) => ( 
                              <option>{item}</option>
                          ))}
                        </Form.Control>
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
                                    if (this.state.members.length < 3 && this.state.members.indexOf(record) === -1)
                                    this.setState({ members: this.state.members.concat(record) })}}
                    />
                    </div>

                    <MemberTags vals={this.state.members}/>
                    <br></br>
                    <Button variant="outline-danger" size="sm" onClick={() => this.deleteName()}>Remove Last Added</Button>
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
        
        var hackathonSelected = this.state.hack;
        console.log(this.state.hack)
        var url = "http://localhost:5000/hackathons/"+hackathonSelected+"/getmatch";
        var config = {
          headers: {'Authorization': 'Bearer ' + localStorage.auth_token.toString()}
        };
        axios.get(url, config)
          .then(res => {
            console.log(res);
            var hackers = res.data['hackers'];
            this.setState({available: hackers}) // doesnt work, reactsearchbox doesn't rerender on changing available hackers

            var queries = [];
            for(var i = 0; i < hackers.length; i++){
              var hacker = hackers[i];
              console.log(hacker);
              var query = {
                'key': i,
                'value': hacker['value']
              }
              queries.push(query);
            }
            console.log(queries);
            this.setState({
              available: queries
            });
          });
      };

  handleCreateSubmit(event){
    event.preventDefault();
        //if (this.state.hack !== "" && this.state.idea !== "" && this.state.goal !== "" && this.state.name !== ""){
        //  console.log(this.state);
          console.log('create clicked');
          var hackathonSelected = this.state.hack;
          var url = "http://localhost:5000/teams/new";
          var config = {
            headers: {'Authorization': 'Bearer ' + localStorage.auth_token.toString()}
          };
          var members = ['5d5ace40432fa135145b2c96', '5d5ace35432fa135145b2c7b']
          var data = {
            'hackathon': hackathonSelected,
            'members': members,//this.state.members,
            'name': this.state.name || '',
            'idea': this.state.idea || '',
            'goal': this.state.goal || '',
            'capacity': 4
            //'details': details
          }
          console.log(data);
          axios.post(url, data, config)
            .then(res => {
              console.log(res);
            });
        //}
  }

  deleteName(event){
    let members = this.state.members.slice();  
      members.splice(members.length-1, 1);
      this.setState({members}); 
  };

}

export default withRouter(Create1);
