import React from 'react';
import { Container, Col, Button, Image, Row, ButtonToolbar } from 'react-bootstrap';
class UserCard extends React.Component {

    render() {
        return (
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
                                        <h3 className="font-weight-light d-inline"><a className="text-dark" href="">Mary Chesnut</a></h3><span className="badge badge-pill badge-success sup small align-top">4</span>
                                        <h6>Triathlete, mom & wife</h6>
                                        <ul className="list-inline mt-3">
                                            <li className="list-inline-item">
                                                <button className="btn btn-light rounded-circle">
                                                    <i className="h4 far fa-star icon-star lnr lnr-star ion-ios-star-outline align-middle"></i>
                                                </button>
                                            </li>
                                            <li className="list-inline-item">
                                                <button className="btn btn-light rounded-circle">
                                                    <i className="h4 fa fa-cog icon-settings lnr lnr-cog ion-ios-settings-outline align-middle"></i>
                                                </button>
                                            </li>
                                            <li className="list-inline-item">
                                                <button className="btn btn-light rounded-circle">
                                                    <i className="h4 fa fa-user icon-user lnr lnr-user ion-ios-contact-outline align-middle"></i>
                                                </button>
                                            </li>
                                            <li className="list-inline-item ml-3">
                                                <button className="btn btn-outline-success rounded">Follow +</button>
                                            </li>
                                        </ul>
                                    </Col>
                                    <div className="col-lg-auto col-sm-8 mx-auto">
                                        <Row className="text-center">
                                            <Col>
                                                <button className="btn rounded p-3 btn-outline-secondary text-center w-100">
                                                    <h4 className="font-weight-light">123</h4>
                                                    <a href=""><span className="badge badge-pill badge-dark font-weight-light">posts</span></a>
                                                </button>
                                            </Col>
                                            <Col>
                                                <button className="btn rounded p-3 btn-outline-secondary text-center w-100">
                                                    <h4 className="font-weight-light">19</h4>
                                                    <a href=""><span className="badge badge-pill badge-dark font-weight-light">friends</span></a>
                                                </button>
                                            </Col>
                                            <Col>
                                                <button className="btn rounded p-3 btn-outline-secondary text-center w-100">
                                                    <h4 className="font-weight-light">45</h4>
                                                    <a href=""><span className="badge badge-pill badge-dark font-weight-light">badges</span></a>
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
                    )
    }

}

export default UserCard