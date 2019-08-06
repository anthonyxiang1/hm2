import React from "react";
import {Container, Row, Col, Form, Button, Card, Modal, ProgressBar} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';
import { SocialIcon } from 'react-social-icons';
import axios from 'axios';

class Account1 extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleTechModal = this.handleTechModal.bind(this);
        this.handleLangModal = this.handleLangModal.bind(this);
        this.handleFieldModal = this.handleFieldModal.bind(this);
        this.handleHack = this.handleHack.bind(this);
        this.handleSocial = this.handleSocial.bind(this);
        this.handleInterestModal = this.handleInterestModal.bind(this);
        this.state = {
          page: true,
          techModal: false,
          langModal: false,
          fieldModal: false,
          hackModal: false,
          interestModal: false,
          username: "Anthony Xiang",
          url: ["http://linkedin.com/in/jaketrent", "http://twitter.com", 'a@gmail.com', 'github.com', 'facebook.com'],
          educationLvl: "college",
          year: "2022",
          major: "art",
          school: "sbu",
          about: "about me goes here, any projects, what your goal is (looking to win)",
          languages: {"java": 6, 'python': 8},
          tech: "AWS",
          fields: {'ML': 8, 'IDK': 6},
          interests: "ML",
          hackathons: ["CEWIT", 'SBUHACKS'],
          password: "",
          confirmPass: "", 
          langList: ["a", "b", "c", "d", "java"],
          langNot: []
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

    const SocialMedia = ({vals}) => (
        <div>
            {
            vals.map((item) => ( 
        <SocialIcon url={item} style={{ height: 35, width: 35}}/>
            ))
            }
            
        </div>
    );

    const MappingForm = ({vals}) => (
        <div>
        {
            vals.map((item) => ( 
                <Form.Control placeholder={item} />
            ))
        }
        </div>
    )

    const MappingList = ({vals}) => (
        <div>
        {
            vals.map((item) => ( 
            <p> {item}</p> 
            ))
        }
        </div>
    )

    const MappingModal = ({vals}) => (
        <div>
        {
            vals.map((item) => ( 
                <Form.Check label={item} />
                
            ))
        }
        </div>
    )

    const Mapping = ({vals}) => (
            <div>
            {
                Object.keys(vals).map((key, index) => ( 
                <p key={index}> {index+1}.  {key} <ProgressBar now={vals[key]} label={`${vals[key]}/10`} max={10}/></p>
                ))
            }
            </div>
    )

    const MappingKeys = ({vals}) => (
        <div className="right">
        {
            Object.keys(vals).map((key, index) => ( 
            <p key={index}> 
                <Form.Group className="form-inline">
                <Form.Label>{index+1}.  {key}   </Form.Label>
                <Form.Control as="select" >
                    <option>{vals[key]}</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </Form.Control>
                </Form.Group>
            </p>
            
            ))
        }
        </div>
    )

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
                    <SocialMedia vals={this.state.url}/>
                    
                    <Button variant="primary" onClick = {this.handleClick}>Edit Profile</Button>
                    
                </Col>

                <Col className ="about">
                    <div className="texts">
                    <h4 className="left">Education:  {this.state.educationLvl}</h4><h4 className="right">Year: {this.state.year}</h4>​
                    <h3></h3>
                    <h4 className="left">Major:  {this.state.major}</h4><h4 className="right">School: {this.state.school}</h4>​
                    
                    <ColoredLine color="black"/>
                    
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
                                <Mapping vals={this.state.languages}/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br></br>
                    <Card className="center w-75">
                    <Card.Header><strong>Fields</strong></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Mapping vals={this.state.fields}/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br></br>
                    <Card className="center w-75">
                    <Card.Header><strong>Hackathons</strong></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <MappingList vals={this.state.hackathons}/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="preferences">
                <div className="accent">Interests</div>
                    1. {this.state.interests}
                </Col>
                <Col className="preferences">
                <div className="accent">Technologies</div>
                    1. {this.state.tech}
                    
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
                                    <span className="input-group-text">
                                    Upload
                                    </span>
                                </div>
                                <div className="custom-file">
                                    <form>
                                    <div class="form-group">
                                        <label for="exampleFormControlFile1"></label>
                                        <input type="file" class="form-control-file" id="exampleFormControlFile1"></input>
                                    </div>
                                    </form>
                                </div>
                            </div>
                            <br></br>
                            <Button variant="primary">Change Profile Picture</Button>
                            
                        </Col>

                            <Col className ="about">
                                <div className="texts">
                                <Form.Row>
                                    <Form.Group as={Col} className="form-inline">
                                    <Form.Label>Education Level: </Form.Label>
                                    <Form.Control as="select">
                                        <option>{this.state.educationLvl}</option>
                                        <option>High School</option>
                                    </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} className="form-inline">
                                    <Form.Label>Graduation Year: </Form.Label>
                                    <Form.Control as="select">
                                        <option>{this.state.year}</option>
                                        <option>2022</option>
                                    </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                
                                <Form.Row>
                                    <Form.Group as={Col} className="form-inline">
                                    <Form.Label>Major: </Form.Label>
                                    <Form.Control as="select">
                                        <option>{this.state.major}</option>
                                        <option>Business</option>
                                    </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col}  className="form-inline">
                                        <Form.Label >School:</Form.Label>
                                        <Form.Control placeholder={this.state.school}/>
                                    </Form.Group>
                                </Form.Row>
                                <ColoredLine color="black"/>
                                
                                    <Form.Label >About: </Form.Label>
                                    <textarea className="form-control" rows="5">{this.state.about}</textarea>
                                
                             </div>
                
                                
                            </Col>
                        </Row>
            
            <Row>
                {/****************** LANGUAGES FIELDS AND HACKATHONS */}
                
                <Col sm={4}>
                    <Card className="center w-75">
                    <Card.Header><strong>Social Media</strong></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <MappingForm vals={this.state.url}/>
                                <br></br>
                            <Button variant="outline-primary" onClick={this.handleSocial}>Add Link</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br></br>

                    <Card className="center w-75">
                    <Card.Header><strong>Languages</strong></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <MappingKeys vals={this.state.languages}/>
                            <Button variant="outline-primary" onClick={this.handleLangModal}>Add Languages</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Modal show={this.state.langModal} onHide={this.handleLangModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Languages</Modal.Title>
                        </Modal.Header> 
                        <Modal.Body>
                            <MappingModal vals={this.state.langList}/>
                        </Modal.Body>
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
                            <MappingKeys vals={this.state.fields}/>
                        
                            <Button variant="outline-primary" onClick={this.handleFieldModal}>Add Fields</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Modal show={this.state.fieldModal} onHide={this.handleFieldModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Fields</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>put fields here</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleFieldModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleFieldModal}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    <br></br>
                    <Card className="center w-75">
                    <Card.Header><strong>Hackathons</strong></Card.Header>
                        <Card.Body>
                            <Card.Text>
                            <MappingForm vals={this.state.hackathons}/>
                            <br></br>
                            <Button variant="outline-primary" onClick={this.handleHack}>Add Hackathons</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col className="preferences">
                <div className="accent">Interests</div>
                    {this.state.interests}
                    <br/>
                    <Button variant="outline-primary" onClick={this.handleInterestModal}>Add Interest</Button>

                    <Modal show={this.state.interestModal} onHide={this.handleInterestModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Interests</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>put interests here</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleInterestModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleInterestModal}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>

                <Col className="preferences">
                <div className="accent">Technologies</div>
                    {this.state.tech}
                    <br/>
                    <Button variant="outline-primary" onClick={this.handleTechModal}>Add Technologies</Button>

                    <Modal show={this.state.techModal} onHide={this.handleTechModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Technologies</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>put tech here</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleTechModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleTechModal}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
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
        
    handleFieldModal(event){
        this.setState({
            fieldModal: !this.state.fieldModal
        });
        };

    handleHack(event){
            this.state.hackathons.push("Hackathon Name");
        };

    handleSocial(event){
            this.state.url.push("Link");
        };


    handleInterestModal(event){
        this.setState({
            interestModal: !this.state.interestModal
        });
        };

    

}

export default withRouter(Account1);