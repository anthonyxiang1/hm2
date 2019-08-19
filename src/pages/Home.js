import React from "react";
import "./Home.css";
import HomePt1 from "../components/Home/HomePt1";
import Header from '../components/Header';

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
      <Header/>
      <HomePt1/>
      </div>
    )
  }
}