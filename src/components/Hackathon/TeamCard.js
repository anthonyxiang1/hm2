import React from 'react';
import { Container, Col, Button, Image, Row, ButtonToolbar } from 'react-bootstrap';
class TeamCard extends React.Component {

    render() {
        return (
            <div className="teamcard" id="teamcard">
                <Container>
                    <Row>
                        <Col>
                            <div className="card shadow">
                                <div className="card-body">
                                    <Row>
                                            <Col className="text-center">
                                                <Row>
                                                    <img className="d-block mx-auto rounded-circle" src="http://api.randomuser.me/portraits/women/73.jpg"></img>
                                                    <img className="d-block mx-auto rounded-circle" src="http://api.randomuser.me/portraits/women/73.jpg"></img>

                                                </Row>
                                                <Row >
                                                    <img className="d-block mx-auto rounded-circle " src="http://api.randomuser.me/portraits/women/73.jpg"></img>
                                                    <img className="d-block mx-auto rounded-circle " src="http://api.randomuser.me/portraits/women/73.jpg"></img>
                                                </Row>
                                            </Col>

                                        <Col className="text-left">
                                            <Row>
                                                    <h3 className="font-weight-light d-inline"><a className="text-dark card-btn" id="card-btn" href="">Team Name</a></h3>

                                                </Row>
                                                <Row>
                                                    Goals Goals Goals
                                                    Goals Goals Goals
                                                    Goals Goals Goals
                                                    Goals Goals Goals
                                                    Goals Goals Goals
                                                    Goals Goals Goals

                                                </Row>
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

export default TeamCard 