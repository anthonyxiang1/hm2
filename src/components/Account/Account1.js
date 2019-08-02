import React from "react";
import {Container, Row, Col, Form, Button, Card, Modal} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';
import axios from 'axios';

class Account1 extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleTechModal = this.handleTechModal.bind(this);
        this.handleLangModal = this.handleLangModal.bind(this);
        this.state = {
          page: true,
          techModal: false,
          langModal: false,
          username: "Anthony Xiang",
          educationLvl: "college",
          year: "2022",
          major: "art",
          school: "sbu",
          about: "about me goes here",
          languages: "java",
          tech: "AWS",
          fields: "ML",
          interests: "ML",
          hackathons: "CEWIT",
          password: "",
          confirmPass: ""
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

    const {page} = this.state;

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2
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
                            src={require("./assets/favicon.jpg")}
                            className="avatar"
                        />
                        <h1 >{this.state.username}</h1>
                        <Button variant="primary" onClick = {this.handleClick}>Edit Profile</Button>
                        
                    </Col>

                    <Col className ="about .col-md-8 ">
                        <h4 class="left">Education: {this.state.educationLvl}</h4><h4 class="right">Year: {this.state.year}</h4>​
                        <h3></h3>
                        <h4 class="left">Major: {this.state.major}</h4><h4 class="right">School: {this.state.school}</h4>​
                        <ColoredLine color="black"/>
                        <div className="texts">
                            {this.state.about}
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col sm={4}>
                        <Card className="center w-75">
                        <Card.Header><strong>Languages</strong></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                {this.state.languages}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br></br>
                        <Card className="center w-75">
                        <Card.Header><strong>Fields</strong></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                {this.state.fields}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <br></br>
                        <Card className="center w-75">
                        <Card.Header><strong>Hackathons</strong></Card.Header>
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
                    <div className="accent">Technologies</div>
                        {this.state.tech}
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
                                src={require("./assets/favicon.jpg")}
                                className="avatar"
                                />
                                <h1 >{this.state.username}</h1>
                                
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupFileAddon01">
                                        Upload
                                        </span>
                                    </div>
                                    <div className="custom-file">
                                        <input
                                        type="file"
                                        className="custom-file-input"
                                        id="inputGroupFile01"
                                        aria-describedby="inputGroupFileAddon01"
                                        />
                                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                                        Choose file
                                        </label>
                                    </div>
                                </div>

                                <Button variant="primary">Change Profile Picture</Button>
                                
                            </Col>

                                <Col className ="about .col-md-8">
                                    <div className="texts">
                                    <Form.Row>
                                        <Form.Group as={Col} className="form-inline">
                                            <Form.Label >Education Level:  </Form.Label>
                                            <Form.Control placeholder={this.state.educationLvl} />
                                        </Form.Group>

                                        <Form.Group as={Col} className="form-inline">
                                        <Form.Label >Year: </Form.Label>
                                        <Form.Control className="form-buffer" placeholder={this.state.year} />
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <Form.Row>
                                        <Form.Group as={Col}  className="form-inline">
                                            <Form.Label >Major: </Form.Label>
                                            <Form.Control placeholder={this.state.major} />
                                        
                                        </Form.Group>

                                        <Form.Group as={Col}  className="form-inline">
                                            <Form.Label >School: </Form.Label>
                                            <Form.Control placeholder={this.state.school} />
                                        </Form.Group>
                                    </Form.Row>
                                    <ColoredLine color="black"/>
                                    </div>

                                    <div className="texts">
                                        <Form.Label >About </Form.Label>
                                        <textarea
                                            className="form-control"
                                            placeholder={this.state.about}
                                            rows="5"
                                        />
                                    </div>
                                </Col>
                            </Row>
                
                <Row>
                    <Col sm={4}>
                        <Card className="center w-75">
                        <Card.Header><strong>Languages</strong></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                {this.state.languages}
                                <br/>
                                <Button variant="outline-primary" onClick={this.handleLangModal}>Add Languages</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Modal show={this.state.langModal} onHide={this.handleLangModal}>
                            <Modal.Header closeButton>
                            <Modal.Title>Languages</Modal.Title>
                            </Modal.Header> 
                            <Modal.Body>put languages here</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleLangModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleLangModal}>
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>

                        <br></br>
                        <Card className="center w-75">
                        <Card.Header><strong>Fields</strong></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                {this.state.fields}
                                <br/>
                                <Button variant="outline-primary" onClick={this.handleTechModal}>Add Fields</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Modal show={this.state.techModal} onHide={this.handleTechModal}>
                            <Modal.Header closeButton>
                            <Modal.Title>Fields</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>put stuff here</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleTechModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleTechModal}>
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>

                        <br></br>
                        <Card className="center w-75">
                        <Card.Header><strong>Hackathons</strong></Card.Header>
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
                    <div className="accent">Technologies</div>
                        {this.state.tech}
                        <br/>
                        <Button variant="outline-primary">Add Technologies</Button>
                    </Col>
                </Row>

                <Row>
                    <Col >
                        <br/>
                        <Button variant="failure" onClick = {this.handleClick}>Cancel</Button>
                        <Button variant="success" onClick = {this.handleClick}>Update Profile</Button>
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

    handleLangModal(event){
    this.setState({
        langModal: !this.state.langModal
    });
    };

    handleTechModal(event){
        this.setState({
            techModal: !this.state.techModal
        });
        };

}

export default withRouter(Account1);