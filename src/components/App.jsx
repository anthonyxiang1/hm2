import React from 'react';
import Header from './Header.js';
import './App.css';

export default class AppWrapper extends React.Component {
  render() {
    return (
      <div className='app-container'>
        <Header/>
        {this.props.children}
      </div>
    )
  }
}