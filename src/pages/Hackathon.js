import React, {Component} from 'react';
import Header from '../components/Header.js';
import Hackathon1 from '../components/Hackathon/Hackathon1'
import "./Hackathon.css";

class Hackathon extends Component{
    render(){
        return(
            <div className="Hackathon">
                <Header/>
                <Hackathon1/>
            </div>
        )
    }

}

export default Hackathon; 