
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Col, Button, Image, Row, ButtonToolbar } from 'react-bootstrap';
import UserCard from './UserCard'
import TeamCard from './TeamCard'

import axios from 'axios';

class Sec1 extends React.Component {
    constructor(props) {
        super(props);
        this.showAvailable = this.showAvailable.bind(this);
        this.myFunction = this.myFunction.bind(this);

        this.state = {
            hackName: "stuyhacks",
            about: "hellohello",
            address: "100 Nichols Road",
            startDate: "Sept 20",
            endDate: "Jan 28",
            hackLoc: "Stony Brook, NY",
            school: "Stony Brook University",
          members: [],
          teams: [
              {name: "Found 405", 
              goals: "i want to win winwin", 
              propic: ["http://api.randomuser.me/portraits/men/71.jpg", "http://api.randomuser.me/portraits/men/71.jpg", "http://api.randomuser.me/portraits/men/71.jpg"]},
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
              var hackathon = JSON.parse(res.data['hackathon']);
              this.setState({
                hackName: hackathon['name'],
                about: hackathon['about'],
                address:hackathon['address'],
                startDate:hackathon['start_date'],
                endDate:hackathon['end_date'],
                hackLoc: hackathon['city']+', '+hackathon['state'],
                school:hackathon['school']
            });
          })
        }


    render() {

        const {members} = this.state;

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
                        <Col id="namebox " className="namebox col-12" >{this.state.startDate}-{this.state.endDate}</Col>
                        <Col id="namebox " className="namebox col-12" >{this.state.address}, {this.state.hackLoc} - {this.state.school}</Col>
                        
                        <Col id="namebox " className="namebox col-12" >{this.state.about}</Col>
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

                        {members.map((item, index) => ( 

                          <Row>
                            <UserCard name={item.name} school={item.school} major={item.major}
                            goals={item.goals}  tags={item.tags} propic={item.propic} id={item.id}
                            />
                        </Row>
                      ))}

                        
                    </Col>
                    <Col xs={{span:12}} sm={{span:12}} md={{span:12}} lg={{span:6}} xl={{span:6}}>
                        <Row>
                            <h2><strong>Available Teams</strong></h2>
                        </Row>
                        {this.state.teams.map((item, index) => ( 
                        <Row>
                        <TeamCard name={item.name} goals={item.goals}  tags={item.tags} propic={item.propic}
                        />
                        </Row>
                        ))}
 
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
        if(localStorage.auth_token){
            var hackathonName = this.props.match.params.name;
            var config = {
                headers: {'Authorization': 'Bearer ' + localStorage.auth_token.toString()}
            };
            axios.get('http://127.0.0.1:5000/hackathons/'+hackathonName+'/addmatch', config)
            .then(res => {
                console.log(res)
                if(res.status == 200){
                    // add to pool success!
                }else if(res.status == 201){
                    // already in pool
                }
                axios.get('http://127.0.0.1:5000/hackathons/'+hackathonName+'/findmymatches', config)
                  .then(res => {
                    console.log(res);
                    console.log(res.data);
                    var hackers = res.data['hackers'];
                  
                    for (var i=0;i<hackers.length;i++) {
                        this.setState({ members: this.state.members.concat([{name: JSON.parse(hackers[i]['hacker'])['firstname'],
                                                                    email: JSON.parse(hackers[i]['hacker'])['email'],
                                                                    id: JSON.parse(hackers[i]['hacker'])['id'],
                                                                    propic: JSON.parse(hackers[i]['hacker'])['profile_pic']}]) });  
                    }

                  });
            }).catch((err) =>{      //todo: handle error
                console.log(err);
            });
        }


        $("#matchedUsers").fadeIn("slow");
        $('html,body').animate({
            scrollTop: $("#matchedUsers").offset().top - 100
         });
    }
}
export default withRouter(Sec1);