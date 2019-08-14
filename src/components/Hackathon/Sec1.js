import React from 'react';
import { Container, Col, Button, Image, Row, ButtonToolbar } from 'react-bootstrap';
import UserCard from './UserCard'
class Sec1 extends React.Component {

    render() {
        return (
            <div className="sec1">
                <div className="rectangle" ></div>
                <Container className="flexbox" >
                    <Row>
                        <Col id="namebox" className="namebox" >StuyHacks</Col>
                    </Row>
                    <Row >
                        <Col id="date" className="date">DateDateDate</Col>
                        <Col>
                            <img id="hackathonImg"
                                src={require("./stuyhacks.png")}
                                className="hackathonImg">
                            </img>
                        </Col>
                        <Col id="location" className="location">LocationLocationLocation</Col>
                    </Row>
                </Container>
                <Container className="addbtn" >
                    <Row className="justify-content-center addtxt">
                        <Col>
                            <center>
                                <h1>Add Yourself To This Matching Pool!</h1>
                            </center>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <img
                                src={require("./downarrow.png")}
                                alt="clickme"
                                className="downarr">

                            </img>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col>
                            <center>
                                <Button className="addme" variant="primary" size="lg" block onClick={this.myFunction}>I'm Going!</Button>
                            </center>
                        </Col>
                    </Row>
                </Container>
                <ButtonToolbar className="btn-duo justify-content-center">
                    <Button id="matchme" className="matchme" variant="secondary" style={{ display: "none" }} onClick={this.showAvailable}>Match Me!</Button>
                    <Button id="alreadymatched" className="alreadymatched" variant="success" style={{ display: "none" }}onClick={this.showAvailable}>I Already Have A Team!</Button>
                </ButtonToolbar>


                <center className="addedtxt" id="addedtxt" style={{ display: "none" }}>
                    <h1>You Have Been Added!</h1>
                </center>


                <Container id="matchedUsers" className="matchedUsers" style={{ display: "none" }}>
                    <Row>
                        <Col>
                            <h2>Top Matched Users</h2>
                        </Col>
                        <Col >
                            <h2>Available Teams</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <UserCard/>
                        </Col>
                        
                        <Col>
                            <UserCard/>
                        </Col>
                        
                    </Row>

                    <Row >
                        <Col>
                         <UserCard/>
                        </Col>
                        
                        <Col>
                            <UserCard/>
                        </Col>
                    
                    </Row>
                    <Row>
                        <Col>
                            <UserCard/>
                        </Col>
                        
                        <Col>
                            <UserCard/>
                        </Col>
                    
                    </Row>
                    <Row>
                        {/* This is here to show how to move cards to a side */}
                        <Col>
                        </Col>
                        <Col>
                            <UserCard/>
                        </Col>
                        
                        
                    </Row>
                
                    
                </Container>

            </div>

        );
    }
    myFunction() {
        $("#matchme").fadeIn("slow")
        $("#alreadymatched").fadeIn("slow")
        //document.getElementById("matchme").style.visibility = "visible";
        //document.getElementById("alreadymatched").style.visibility = "visible";
    }
    showAvailable(){
        $("#addedtxt").fadeIn()
        setTimeout(function(){
        $("#matchedUsers").fadeIn("slow")
        
        $('html, body').animate({
            scrollTop: $("#matchedUsers").offset().top
        }, 2000);
        },1250);
    }
}

export default Sec1
