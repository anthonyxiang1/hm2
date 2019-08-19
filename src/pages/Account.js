import React, {Component} from 'react';
import Header from '../components/Header.js';
import Account1 from '../components/Account/Account1';
import "./Account.css";

class Account extends Component {
    render() {
        return (
            <div className = "Account">
                <Header/>
                <Account1/>
            </div>
        );
    }
}

export default Account;