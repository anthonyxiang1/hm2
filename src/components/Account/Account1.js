import React from "react";
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';
import axios from 'axios';

class Account1 extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
          page: true,
          username: "sarm",
          educationLvl: "college",
          year: "2022",
          major: "art",
          school: "sbu",
          about: "about me goes here",
          languages: "java",
          tech: "AWS",
          fields: "ML",
          interests: "ML",
          hackathons: "CEWIT"
        };
      }

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

    const { page, username, major, year, educationLvl, school } = this.state;

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 5
            }}
        />
    );

        // This is default
        if (page === true) {

            return (
            <div className="account">
                    
            <Container className="boxes">      
               <Row >
                    <Col className="info" sm={4}>
                        {/* <div className="accent">Interests</div> */}
                        <img
                            alt="propic"
                            src={require("./assets/favicon.png")}
                            width="200px"
                            height="200px"
                            border ="10px"
                        />
                        <Button variant="primary" onClick = {this.handleClick}>Edit Profile</Button>
                        
                    </Col>

                    <Col className ="about .col-md-8 ">
                        <h1 >{this.state.username}</h1>
                        <h3>{this.state.educationLvl} | {this.state.year}</h3>
                        <h3>{this.state.major} | {this.state.school}</h3>

                        <div className="texts">
                            {this.state.about}
                        </div>
                    </Col>

                </Row>

                <Row>
                    <Col >
                        <Card >
                        <Card.Header>Languages</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                {this.state.languages}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br></br>
                        <Card >
                        <Card.Header>Technologies</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                {this.state.tech}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br></br>
                        <Card >
                        <Card.Header>Hackathons</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                {this.state.hackathons}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="preferences">
                    <div className="accent">Interests</div>
                        {this.state.interests}
                    </Col>
                    <Col className="preferences">
                    <div className="accent">Fields</div>
                        {this.state.fields}
                    </Col>
                </Row>
            </Container>

                <div className="bottom"></div>

            </div>
            );
        }
        // ***************************
        // EDIT PROFILE 
        // ***************************
        else if (page === false) {  // this is edit profile

            return (
                <div className="account">
                    <Container className="boxes">      
                        <Row >
                            <Col className="info" sm={4}>
                                <img
                                    alt="propic"
                                    src={require("./assets/favicon.png")}
                                    width="200px"
                                    height="200px"
                                    border ="10px"
                                />
                                <Button variant="primary" onClick = {this.handleClick}>Change Profile Picture</Button>
                            </Col>

                                <Col className ="about .col-md-8">
                                    <h1 >{this.state.username}</h1>

                                    <Form.Row>
                                        <Form.Group as={Col}>
                                        <Form.Control className="form-inline" placeholder={this.state.educationLvl} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                        <Form.Control className="form-inline" placeholder={this.state.year} />
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                        <Form.Control className="form-inline" placeholder={this.state.major} />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                        <Form.Control className="form-inline" placeholder={this.state.school} />
                                        </Form.Group>
                                    </Form.Row>

                                    <div className="texts">
                                        <textarea
                                            className="form-control"
                                            placeholder={this.state.about}
                                            rows="5"
                                        />
                                    </div>
                                </Col>
                            </Row>
                
                <Row>
                    <Col >
                        <Card >
                        <Card.Header>Languages</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                {this.state.languages}
                                <br/>
                                <Button variant="outline-primary">Add Languages</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br></br>
                        <Card >
                        <Card.Header>Technologies</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                {this.state.tech}
                                <br/>
                                <Button variant="outline-primary">Add Technologies</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br></br>
                        <Card >
                        <Card.Header>Hackathons</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                {this.state.hackathons}
                                <br/>
                                <Button variant="outline-primary">Add Hackathons</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="preferences">
                    <div className="accent">Interests</div>
                        {this.state.interests}
                        <br/>
                        <Button variant="outline-primary">Add Interest</Button>
                    </Col>

                    <Col className="preferences">
                    <div className="accent">Fields</div>
                        {this.state.fields}
                        <br/>
                        <Button variant="outline-primary">Add Field</Button>
                    </Col>
                </Row>

                <Row>
                    <Col >
                        <br/>
                        <Button variant="success">Update Profile</Button>
                    </Col>
                </Row>

                <Row>
                    <Col >
                        <br/>
                        <ColoredLine color="blue"/>
                    </Col>
                </Row>

                <Row>
                    <Col >
                        <div >
                            <UpdatePassword />
                        </div>
                    </Col>
                    
                    <Col >
                        <div >
                            <DeleteAccount />
                        </div>
                    </Col>
                </Row>

            </Container>

            <div className="bottom">
                
            </div>
            </div>
            
                );
        }
    }

    handleClick(event){
        this.setState({
          page: !this.state.page
        });
      };

}

export default withRouter(Account1);