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
                                    <Row className="text-center text-lg-left">
                                        <h3 className="font-weight-light d-inline"><a className="text-dark" href="">Team Name Name</a></h3>
                                    </Row>
                                    <Row className="align-items-center">

                                        <a href="">
                                            <img className="d-block mx-auto rounded-circle img-fluid" src="http://api.randomuser.me/portraits/women/73.jpg"></img>
                                        </a>

                                        <a href="">
                                            <img className="d-block mx-auto rounded-circle img-fluid" src="http://api.randomuser.me/portraits/women/73.jpg"></img>
                                        </a>

                                        <Col className="text-left">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                    Donec varius sem vel metus pharetra, a finibus nisl accumsan.
                                                    Vivamus eu elit diam. Phasellus quam lorem, malesuada sed auctor ut,
                                                    condimentum ac nisl. Ut consequat ultrices sem, sed lacinia massa egestas porttitor.
                                                     Aenean sodales posuere congue. Curabitur tempus sem at ligula fermentum suscipit.
                                        </Col>

                                    </Row>
                                    <Row className="align-items-center">

                                        <a href="">
                                            <img className="d-block mx-auto rounded-circle img-fluid" src="http://api.randomuser.me/portraits/women/73.jpg"></img>
                                        </a>

                                        <a href="">
                                            <img className="d-block mx-auto rounded-circle img-fluid" src="http://api.randomuser.me/portraits/women/73.jpg"></img>
                                        </a>
                                        <Col className="text-center text-lg-left">

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