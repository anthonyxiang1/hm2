import React from 'react';
import { Container, Col, Button, Image, Row, ButtonToolbar } from 'react-bootstrap';
class HackathonCard extends React.Component {

    render() {
        return (
            <div className="hackathoncard" id="hackathoncard">
                <Container>
                    <Row >
                        <Col>
                            <div className="card shadow">
                                <div className="card-body">
                                    <Row className="align-items-center">
                                        <div className="hackathonpic">
                                        <Col className="text-nowrap text-center">
                                            <a href="">
                                                <img className="d-block mx-auto rounded-circle img-fluid" src="http://api.randomuser.me/portraits/women/73.jpg"></img>
                                            </a>
                                        </Col>
                                        </div>
                                        <Col className="text-center text-lg-left">
                                            <h3>Name : Jane Doe <br></br> Date: 11/11/11<br></br>Location:Location</h3>
                                        </Col>

                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default HackathonCard