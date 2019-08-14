import React from 'react';
import Pt1 from '../components/LoggedLanding/Pt1';
import Pt2 from '../components/Landing/Pt2';
import Pt3 from '../components/Landing/Pt3';
import Pt4 from '../components/Landing/Pt4';
import NavigationBar from '../components/LoggedLanding/LoggedLandingNavBar';
import "./LoggedLanding.css";

class LoggedLanding extends React.Component {
  render() {
  return (
    <div className="LoggedLanding">
      <NavigationBar/>
      <Pt1/>
      <Pt2/>
      <Pt3/>
    </div>
  );
}
}

export default LoggedLanding;