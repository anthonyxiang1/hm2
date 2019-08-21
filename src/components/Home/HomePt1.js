
import React from 'react';
import { Container, Col, Button, Image, Row, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import HackathonCard from './HackathonCard';

class HomePt1 extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isGood : false,
      hackathons : {
                    hackName: "hiqwerqrqewrqwer", 
                    hackLoc: "stony brook, NY", 
                    school: "sbu", 
                    startDate: "8/17", 
                    endDate: "8/18", 
                    propic: "",
                    num: 50,
                    id: "SBUHacks"
                    }
  };
  }
  componentDidMount() {
    var url='http://localhost:5000/hackathons';
    var config = {
      headers: {'Authorization': 'Bearer ' + localStorage.auth_token.toString()}
    };
    axios.get(url, config)
      .then(res => {
        console.log(res);
        var hackathons = res.data['hackathons'];
        console.log(JSON.parse(hackathons[0])['name']);
        this.setState({
          hackathons: hackathons,
          isGood: true
      });
      });
  }


  render(){
      let stuff;

      if (this.state.isGood) {
          stuff = <div className="squish">
          <Container>
          <Row>
            <Col className="hackcard">
                <HackathonCard hackInfo={JSON.parse(this.state.hackathons[0])}/>
            </Col>
            <Col className="hackcard">
                <HackathonCard hackInfo={JSON.parse(this.state.hackathons[1])}/>
            </Col>
          </Row>
    
          <Row>
            <Col className="hackcard">
                <HackathonCard hackInfo={JSON.parse(this.state.hackathons[2])}/>
            </Col>
            <Col className="hackcard">
                <HackathonCard hackInfo={JSON.parse(this.state.hackathons[3])}/>
            </Col>
          </Row>
          </Container>
          </div>
      } else {
        stuff = <h1>Rendering..</h1>
      }


	  return (
	      <div className="home">
	        <h2>
	            Choose Your Hackathon
	        </h2>

            {stuff}
          

	      </div>
	  );
  }
}

export default HomePt1;