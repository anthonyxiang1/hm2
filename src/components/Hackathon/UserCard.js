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
                                <Row className="align-items-center">
                                    <Col className="text-nowrap text-center">
                                        <a href="">
                                            <img className="d-block mx-auto rounded-circle img-fluid" src="http://api.randomuser.me/portraits/women/73.jpg"></img>
                                        </a>
                                    </Col>
                                    <Col className="text-center text-lg-left">
                                        <h3 className="font-weight-light d-inline"><a className="text-dark" href="">Mary Chesnut</a></h3>
                                        <h6>School School School School </h6>
                                        <h6>Major Major Major</h6>
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
                                    </Col>
                                    <div className="col-lg-auto col-sm-8 mx-auto">
                                        <Row className="text-left">
                                            <Col>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                            Donec varius sem vel metus pharetra, a finibus nisl accumsan. 
                                            Vivamus eu elit diam. Phasellus quam lorem, malesuada sed auctor ut, 
                                            condimentum ac nisl. Ut consequat ultrices sem, sed lacinia massa egestas porttitor.
                                             Aenean sodales posuere congue. Curabitur tempus sem at ligula fermentum suscipit.
                                            </Col>
                                        </Row>
                                    </div>
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