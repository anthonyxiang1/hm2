import React from 'react';
import { Container, Col, Button, Image, Row, ButtonToolbar, Form } from 'react-bootstrap';
import UserCard from '../Hackathon/UserCard'

class Sec1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          teamname: "405 Found",
          idea: "a projecto make corn oil powered caasdabout cars and gas efficiency. We are looking to make corn oil powered caasdabout cars and gas efficiency. We are looking to make corn oil powered caasd to make corn oil powered caasdfasdfasfaffasrs.",
          members: [
              {name: "mary", school: "sbu", major: "business", goals: "to win the competition a lot a lot", tags: ["ai", "cv", "full stack"], propic: "http://api.randomuser.me/portraits/women/71.jpg"},
              {name: "scotty", school: "sbu", major: "business", goals: "hello hello this is it hello lhewrqer!", tags: ["ai", "cv", "full stack"], propic: "http://api.randomuser.me/portraits/men/71.jpg"}
          ]
        };
      }

    render() {

        return (
            <div className="tmpgsec1">
                <div className="rectangle">
                </div>
                
                <Container className="topCont">
                    <Row>

                        <Col className="text-center" xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}} >
                            <Form.Label><h4><u>Team Name</u></h4></Form.Label>
                            <h3 ><strong>{this.state.teamname}</strong></h3>
                            <br></br>
                        </Col>
                        <Col className="text-center" xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}}>
                            <Form.Label><h4><u>Idea</u></h4></Form.Label>
                            <p>
                            {this.state.idea}
                            </p>
                        </Col>
                    </Row>
                </Container>
                

                <Container id="tmembers" className="tmembers">
                    <h2><u><strong>Members</strong></u></h2>
                    <small>{this.state.members.length < 4 ? "Interested in this team? Don't be shy, click on a member's profile, message them, and ask to join!" : ''}</small>
                    
                    <div className="separate"></div>
                    <Row>
                    
                    <Col xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}}>
                        <Row>
                            <UserCard name={this.state.members[1].name} school={this.state.members[1].school} major={this.state.members[1].major}
                                goals={this.state.members[1].goals}  tags={this.state.members[1].tags} propic={this.state.members[1].propic}
                                />
                        </Row>
                        <Row>
                            <UserCard name={this.state.members[0].name} school={this.state.members[0].school} major={this.state.members[0].major}
                            goals={this.state.members[0].goals}  tags={this.state.members[0].tags} propic={this.state.members[0].propic}
                            />
                        </Row>
                    </Col>
                    <Col xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}}>
                        <Row>
                           <UserCard/>
                        </Row>
                        <Row>
                           
                        </Row>
                    </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default Sec1 