import React from 'react';
import { Container, Col, Button, Image, Row, ButtonToolbar } from 'react-bootstrap';
class TeamCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: (props.name != null) ? props.name: '------', 
            goals: (props.goals != null) ? props.goals: '------', 
            propic: (props.propic != null) ? props.propic: require("./graysquare.png"),
            id: (props.id != null) ? props.id: "",
        };
      }

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
                                                    <img className="d-block mx-auto rounded-circle" src={this.state.propic[0]}></img>
                                                    <img className="d-block mx-auto rounded-circle" src={this.state.propic.length>1 ? this.state.propic[1]: require("./graysquare.png")}></img>
                                                </Row>
                                                <Row >
                                                    <img className="d-block mx-auto rounded-circle " src={this.state.propic.length>2 ? this.state.propic[2]: require("./graysquare.png")}></img>
                                                    <img className="d-block mx-auto rounded-circle " src={this.state.propic.length>3 ? this.state.propic[3]: require("./graysquare.png")}></img>
                                                </Row>
                                            </Col>

                                        <Col className="text-left">
                                            <Row>
                                                    <h3 className="font-weight-light d-inline"><a className="text-dark card-btn" id="card-btn" href={`/team/${this.state.id}`}>{this.state.name}</a></h3>

                                                </Row>
                                                <Row>
                                                    {this.state.goals}
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