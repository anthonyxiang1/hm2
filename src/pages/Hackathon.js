import React, {Component} from 'react';
import Header from '../components/Header.js';
import Sec1 from '../components/Hackathon/Sec1'
import "./Hackathon.css";

class Hackathon extends Component{
    render(){
        return(
            <div className="Hackathon">
                <Header/>
                <Sec1/>
            </div>
        )
    }

}

export default Hackathon; 