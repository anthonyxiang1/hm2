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

                    <Row>
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
                                <Button type="button" id="addme" className="addme" variant="primary" size="lg" onClick={this.myFunction.bind(this)}>I'm Going!</Button>
                            </center>
                        </Col>
                    </Row>
                </Container>
                <ButtonToolbar className="btn-duo justify-content-center">
                    <Button type="button" id="matchme" 
                            className="matchme" variant="secondary" 
                            onClick={this.showAvailable.bind(this)} 
                            /*style={{display:"None"}} */
                            
                            >Match Me!
                    </Button>

                    <Button type="button" id="alreadymatched" 
                        className="alreadymatched" variant="success"
                        onClick={this.showAvailable.bind(this)} 
                         
                        /*style={{display:"None"}} */
                        
                        >I Already Have A Team!</Button>

                      
                      
                      
    
                </ButtonToolbar>
                <center className="addedtxt" id="addedtxt" /*style={{opacity:0}}*/ >
                    <h1>You Have Been Added!</h1>
                </center>
                
                <Container id="matchedUsers" className="matchedUsers" /*style={{display:"None"}} */ >
                    <Row>
                    <Col xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}}>
                        <Row>
                            <h2><strong>Top Matched Users</strong></h2>
                        </Row>
                        <Row>
                            <UserCard/>
                        </Row>
                        <Row>
                         <UserCard/>
                        </Row>
                        <Row>
                         <UserCard/>
                        </Row>
                    </Col>
                    <Col xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}}>
                        <Row>
                            <h2><strong>Available Teams</strong></h2>
                        </Row>
                        <Row>
                            <TeamCard/>
                        </Row>
                        <Row>
                         <TeamCard/>
                        </Row>
                        <Row>
                         <TeamCard/>
                        </Row>
                    </Col>
                    </Row>
                   
                    
                        
                
                
                    
                </Container>
                
            </div>
            
        );
        
    }
   
    myFunction() {
        console.log("called")
        $("#addme").fadeOut("fast");
        $("#downarr").fadeOut("fast");
        $("#addedtxt").fadeTo(1000, 1);
        
        setTimeout(function(){
            $("#matchme").fadeTo(1000, 1);
            $("#alreadymatched").fadeTo(1000, 1);
            //$('#matchme').prop('disabled', false);
            //$('#alreadymatched').prop('disabled',false);
            //$('#alreadymatched').attr('onclick',"this.showAvailable");
            $("#matchme").fadeIn("slow");
            $("#alreadymatched").fadeIn("slow");
        },1500);

        
    }
    showAvailable(){
        $("#matchedUsers").fadeIn("slow");
        $('html,body').animate({
            scrollTop: $("#matchedUsers").offset().top - 100
         });
    }
}
export default Sec1