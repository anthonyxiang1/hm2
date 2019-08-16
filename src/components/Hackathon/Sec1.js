import React from 'react';
import { Container, Col, Button, Image, Row, ButtonToolbar } from 'react-bootstrap';
import UserCard from './UserCard'
import TeamCard from './TeamCard'
import HackathonCard from '../Home/HackathonCard'
class Sec1 extends React.Component {

    render() {
        return (
            <div className="sec1">
                <div className="rectangle" ></div>

                <Container>
                    <Row>
                        <Col id="namebox " className="namebox col-12" >StuyHacks</Col>
                    </Row>
                </Container> 

                <Container className="flexbox" >
                    
                    <Row >
                         <Col xs={{span:12}} sm={{span:12}} md={{span:4, order:2}} lg={{span:4, order:2}} xl={{span:4, order:2}}>
                            <img id="hackathonImg"
                                src={require("./stuyhacks.png")}
                                className="hackathonImg">
                            </img>
                        </Col>
                        <Col id="date" xs={{span:12}} sm={{span:12}} md={{span:4, order:1}} lg={{span:4, order:1}} xl={{span:4, order:1}} className="date">DateDateDate</Col>
                        <Col id="location" xs={{span:12}} sm={{span:12}} md={{span:4, order:3}} lg={{span:4, order:3}} xl={{span:4, order:3}} className="location">LocationLocationLocation</Col>
                    </Row>
                </Container>


                <Container className="addbtn" >
                    <Row className="justify-content-center addtxt">
                        <Col>
                            <center>
                                <h1 id="addyourself">Add Yourself To This Matching Pool!</h1>
                            </center>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <img
                                id="downarr"
                                src={require("./downarrow.png")}
                                alt="clickme"
                                className="downarr">

                            </img>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col>
                            <center>
                                <Button type="button" id="addme" className="addme" variant="primary" size="lg" onClick={this.myFunction}>I'm Going!</Button>
                            </center>
                        </Col>
                    </Row>
                </Container>
                <ButtonToolbar className="btn-duo justify-content-center">
                    <Button type="button" id="matchme" className="matchme" variant="secondary" style={{ display: "none" }} onClick={this.showAvailable}>Match Me!</Button>
                    <Button type="button" id="alreadymatched" className="alreadymatched" variant="success" style={{ display: "none" }}onClick={this.showAvailable}>I Already Have A Team!</Button>
                </ButtonToolbar>


                <center className="addedtxt" id="addedtxt" style={{ display: "none" }}>
                    <h1>You Have Been Added!</h1>
                </center>
                
                <Container fluid={true} id="matchedUsers" className="matchedUsers" style={{ display: "none" }}>
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
                            <TeamCard/>
                        </Col>
                        
                    </Row>

                    <Row >
                        <Col>
                         <UserCard/>
                        </Col>
                        
                        <Col>
                            <TeamCard/>
                        </Col>
                    
                    </Row>
                    <Row>
                        <Col>
                            <UserCard/>
                        </Col>
                        
                        <Col>
                            <TeamCard/>
                        </Col>
                    
                    </Row>
                    <Row>
                        {/* This is here to show how to move cards to a side */}
                        <Col>
                            <HackathonCard/>
                        </Col>
                        <Col>
                            <TeamCard/>
                        </Col>
                        
                        
                    </Row>
                
                    
                </Container>
                <div className="pgbottom">
                </div>
            </div>
            
        );
        
    }
    myFunction() {
        $("#downarr").fadeOut("slow")
        $("#addme").fadeOut("slow")
        setTimeout(function(){
        $("#addedtxt").fadeIn()
        //document.getElementById("matchme").style.visibility = "visible";
        //document.getElementById("alreadymatched").style.visibility = "visible";
        },1250);
        $("#matchme").fadeIn("slow")
        $("#alreadymatched").fadeIn("slow")
        $('html, body').animate({
            scrollTop: $("#matchme").offset().top
        }, 3000);
    }
    showAvailable(){
        $("#addyourself").fadeOut("slow")
        
        $("#alreadymatched").fadeOut("slow")
        $("#matchme").fadeOut("slow")
        setTimeout(function(){
        $("#matchedUsers").fadeIn("slow")
        setTimeout(function(){
            $('html, body').animate({
                scrollTop: $("#matchedUsers").offset().top
            }, 2000);
        },1250)
        },2500);
    }
}

export default Sec1
