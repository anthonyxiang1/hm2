import React from "react";
import "./Home.css";
import HomePt1 from "../components/Home/HomePt1";
import Header from '../components/Header';
import axios from 'axios';
export default class Home extends React.Component {
  componentDidMount() {
      axios.get(`http://127.0.0.1:5000/hackathons`)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })

  } 

  render() {
    return (
      <div className="Home">
      <Header/>
      <HomePt1/>
      </div>
    )
  }
}