import React from 'react';
import Pt1 from '../components/Landing/Pt1';
import Pt2 from '../components/Landing/Pt2';
import Pt3 from '../components/Landing/Pt3';
import Pt4 from '../components/Landing/Pt4';
import NavigationBar from '../components/Landing/LandingNavBar';
import "./Landing.css";

class Landing extends React.Component {
  render() {
  return (
    <div className="Landing">
      <NavigationBar/>
      <Pt1/>
      <Pt2/>
      <Pt3/>
      <Pt4/>
    </div>
  );
}
}

export default Landing;