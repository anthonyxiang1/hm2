import React from 'react';
import { withRouter } from 'react-router-dom';
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import axios from 'axios';

class DeleteAccount extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: ""
      };
    }

  render() {
    return (
      <div>
      <h1>Delete Account</h1>
      <br/>
      You can delete your account, but keep in mind this action is irreversible.
      <br/>
      <br/>

        <Button variant="danger" type="submit">
          Delete Account
        </Button>

      </div>
    )
  }
}

export default withRouter(DeleteAccount);
