import React from 'react';
import { Container, Col, Button, Image, Row, ButtonToolbar } from 'react-bootstrap';
class UserCard extends React.Component {

    render() {
        return (
            <div className="usercard" id="usercard">
            <Container>
                <Row>
                    <Col>
                        <div className="card shadow">
                            <div className="card-body">
                                <Row>
                                    <Col className="text-left">
                                        <Row>
                                            <img className="d-block mx-auto rounded-circle img-fluid" src="http://api.randomuser.me/portraits/women/73.jpg"></img>

                                        </Row>
                                        <Row >
                                            Goals Goals Goals
                                            Goals Goals Goals
                                            Goals Goals Goals
                                            Goals Goals Goals
                                            Goals Goals Goals
                                            Goals Goals Goals
                                        </Row>
                                    </Col>
                                    <Col className="text-left">
                                        <Row>
                                        <h3 className="font-weight-light d-inline"><a className="text-dark card-btn" id="card-btn" href="" >Mary Chesnut</a></h3>
                                        <h6>School School School School </h6>
                                        <h6>Major Major Major</h6>
                                        </Row>
                                        <Row>
                                        <ul className="list-inline mt-3 tag-list">
                                            <li className="list-inline-item">
                                                <button className="btn btn-light">
                                                    Artificial Intelligence
                                                </button>
                                            </li>
                                            <li className="list-inline-item">
                                                <button className="btn btn-light">
                                                    Computer Vision
                                                </button>
                                            </li>
                                            <li className="list-inline-item">
                                                <button className="btn btn-light">
                                                    Full-Stack Engineering
                                                </button>
                                            </li>

                                        </ul>
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

export default UserCard 