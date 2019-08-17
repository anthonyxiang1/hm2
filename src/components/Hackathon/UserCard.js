import React from 'react';
import { Container, Col, Button, Image, Row, ButtonToolbar } from 'react-bootstrap';
class UserCard extends React.Component {
  
    render() {
        return(
        <div className="usercard">
            <Container>
                <Row>
                    <Col className="profilepic text-right">
                        <img
                            alt="propic"
                            src={require("../Account/assets/favicon.jpg")}
                            className="avatar"
                        />
                    </Col>
                    <Col>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin vulputate diam egestas mi posuere viverra.
                        Pellentesque justo erat, ullamcorper sit amet varius et,
                        aliquam elementum ligula.
                     
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Goals Goals Goals Goals Goals Goals Goals Goals Goals Goals
                    </Col>
                    <Col>
                        TAG1 TAG2 TAG3 TAG4
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
    
}

export default UserCard