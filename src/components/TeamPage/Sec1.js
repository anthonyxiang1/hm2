import React from 'react';
import { Container, Col, Button, Image, Row, ButtonToolbar } from 'react-bootstrap';
import UserCard from '../Hackathon/UserCard'

class Sec1 extends React.Component {

    render() {
        return (
            <div className="tmpgsec1">
                <div className="rectangle">

                </div>
                <Container className="topCont">
                    <Row>
                        <Col className="text-left" xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}}>
                            <h3>Team Name Team Name Team Name</h3>
                        </Col>
                        <Col className="text-left" xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}}>
                            <h3>
                            Idea Idea Idea Idea Idea Idea Idea
                            Idea Idea Idea Idea Idea Idea Idea
                            Idea Idea Idea Idea Idea Idea Idea
                            Idea Idea Idea Idea Idea Idea Idea
                            Idea Idea Idea Idea Idea Idea Idea
                            
                            </h3>
                        </Col>
                    </Row>
                </Container>
                <div className="memberslabel"><h3><strong>Members</strong></h3></div>

                <Container id="tmembers" className="tmembers">
                    <Row>
                    <Col xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}}>
                        <Row>
                            <UserCard/>
                        </Row>
                        <Row>
                            <UserCard/>
                        </Row>
                    </Col>
                    <Col xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}}>
                        <Row>
                         <UserCard/>
                        </Row>
                        <Row>
                         <UserCard/>
                        </Row>
                    </Col>
                    </Row>
                
                    
                </Container>
                
            </div>
        )
    }
}

export default Sec1