import React, {Component} from 'react';
import Header from '../components/Header.js';
import Sec1 from '../components/TeamPage/Sec1'
import "./TeamPage.css";


class TeamPage extends Component{
    render(){
        return(
            <div className="TeamPage">
                <Header/>
                <Sec1/>
            </div>
        )
    }

}

export default TeamPage;  