
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Col, Button, Image, Row, ButtonToolbar } from 'react-bootstrap';
import UserCard from './UserCard'
import TeamCard from './TeamCard'

import axios from 'axios';

class Sec1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hackName: "stuyhacks",
            hackDate: "Jan 27",
            hackLoc: "Stony Brook, NY",
          members: [
              {name: "mary", school: "sbu", major: "business", goals: "to win the competition a lot a lot", tags: ["ai", "cv", "full stack"], propic: "http://api.randomuser.me/portraits/women/71.jpg"},
              {name: "scotty", school: "sbu", major: "business", goals: "hello hello this is it hello lhewrqer!", tags: ["ai", "cv", "full stack"], propic: "http://api.randomuser.me/portraits/men/71.jpg"}
          ],
          teams: [
              {name: "Found 405", goals: "i want to win winwin", propic: ["http://api.randomuser.me/portraits/men/71.jpg", "http://api.randomuser.me/portraits/men/71.jpg", "http://api.randomuser.me/portraits/men/71.jpg"]},
              {name: "ANOTHER TEAM", goals: "i want tolo hello this is it hello lhewrqer!lo hello this is it hello lhewrqer!lo hello this is it hello lhewrqer! win winwin", propic: ["http://api.randomuser.me/portraits/men/71.jpg", 
              "http://api.randomuser.me/portraits/men/71.jpg", "http://api.randomuser.me/portraits/men/71.jpg"]}
            ]
        };
      }

      componentDidMount(){
          
           var hackathonName = this.props.match.params.name;
           console.log(hackathonName);
           var url = 'http://127.0.0.1:5000/hackathons/'+hackathonName;
          axios.get(url)
          .then((res) =>{
              console.log(res);
          })
        }

    render() {
        return (
            <div className="sec1">
                <div className="rectangle" ></div>

                

                <Container className="flexbox" >

                    <Row>
                         <Col xs={{span:12}} sm={{span:12}} md={{span:4, order:2}} lg={{span:4, order:2}} xl={{span:4, order:2}}>
                            <img id="hackathonImg"
                                src={require("./stuyhacks.png")}
                                className="hackathonImg">
                            </img>
                        </Col>
                        <Col id="date" xs={{span:12}} sm={{span:12}} md={{span:4, order:1}} lg={{span:4, order:1}} xl={{span:4, order:1}} className="date"></Col>
                        <Col id="location" xs={{span:12}} sm={{span:12}} md={{span:4, order:3}} lg={{span:4, order:3}} xl={{span:4, order:3}} className="location"></Col>
                    </Row>
                </Container>
                <br></br>
                <Container>
                    <Row>
                        <Col id="namebox " className="namebox col-12" ><strong>{this.state.hackName}</strong></Col>
                        <Col id="namebox " className="namebox col-12" >{this.state.hackLoc}, {this.state.hackDate}</Col>
                    </Row>
                </Container> 


                <Container className="addbtn" >
                    <Row className="justify-content-center addtxt">
                        <Col>
                            <center>
                                <h1 className="addyourself">Add Yourself To This Matching Pool!</h1>
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
                            className="matchme" variant="primary"  size="lg"
                            onClick={this.showAvailable.bind(this)} 
                            style={{display:"None"}} 
                            
                            >Match Me!
                    </Button>
                    <Button type="button" id="alreadymatched" 
                        className="alreadymatched" variant="secondary" size="sm"
                        onClick={this.showAvailable.bind(this)} 
                         
                        style={{display:"None"}} 
                        
                        >I Already Have A Team!</Button>
                      
                      
                      
    
                </ButtonToolbar>
                <center className="addedtxt" id="addedtxt" style={{display:"None"}} >
                    <h1>You Have Been Added!</h1>
                </center>
                
                <Container id="matchedUsers" className="matchedUsers" style={{display:"None"}}  >
                    <Row>
                    <Col xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}}>
                        <Row>
                            <h2><strong>Top Matched Users</strong></h2>
                        </Row>
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
                        <Row>
                        <UserCard name={this.state.members[1].name} school={this.state.members[1].school} major={this.state.members[1].major}
                                goals={this.state.members[1].goals}  tags={this.state.members[1].tags} propic={this.state.members[1].propic}
                                />
                        </Row>
                    </Col>
                    <Col xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}}>
                        <Row>
                            <h2><strong>Available Teams</strong></h2>
                        </Row>
                        <Row>
                            <TeamCard name={this.state.teams[0].name} goals={this.state.teams[0].goals} propic={this.state.teams[0].propic}/>
                        </Row>
                        <Row>
                            <TeamCard name={this.state.teams[1].name} goals={this.state.teams[1].goals} propic={this.state.teams[1].propic}/>
                        </Row>
                        <Row>
                            <TeamCard name={this.state.teams[0].name} goals={this.state.teams[0].goals} propic={this.state.teams[0].propic}/>
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
        setTimeout(function(){
            $("#matchme").fadeIn("slow");
            $("#alreadymatched").fadeIn("slow");
            $("#addedtxt").fadeIn("fast");
            $('html,body').animate({
                scrollTop: $("#addedtxt").offset().top
             });
        },1000);
    }

    showAvailable(){
        $("#matchedUsers").fadeIn("slow");
        $('html,body').animate({
            scrollTop: $("#matchedUsers").offset().top - 100
         });
    }
}
export default withRouter(Sec1);