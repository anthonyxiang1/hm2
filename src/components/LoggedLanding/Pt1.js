import React from 'react';
import {Button} from 'react-bootstrap';

class Pt1 extends React.Component {
  render() {
  return (

    <div className="center" id="about-box">
      <div className="pt1">
        <h1>
          Hacker Matcher
        </h1>

        <img
          alt="gif"
          id="gif"
          src={require("../Landing/assets/landing_demo.gif")}
        />

        <h2>
          Meet your perfect team
        </h2>

      </div>
    </div>
  );
  }
}

export default Pt1;