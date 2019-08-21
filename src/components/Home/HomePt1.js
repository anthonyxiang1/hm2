
import React from 'react';
import axios from 'axios';

class HomePt1 extends React.Component {
  constructor(props) {
  	super(props)
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
        console.log(hackathons);
      });
  }
  render(){
	  return (
	      <div className="home">
	        <h2>
	            Choose Your Hackathon
	        </h2>

	      </div>
	  );
  }
}

export default HomePt1;