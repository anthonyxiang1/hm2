import React, {Component} from 'react';
import Header from '../components/Header.js';
import Profile1 from '../components/Profile/Profile';
import "./Profile.css";

class Profile extends Component {
    render() {
        return (
            <div className = "Account">
                <Header/>
                <Profile1/>
            </div>
        );
    }
}

export default Profile;