import React from 'react';
import { withRouter } from 'react-router-dom';
import {Form, Button, FormControl} from 'react-bootstrap';
import axios from 'axios';

class UpdatePassword extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        newPassword: "",
        confirmPassword: "",
        errMsg: "qwer"

      };
    }

  render() {
    const { newPassword, confirmPassword, errMsg } = this.state;

    return (
      <div>
      <h1>Update Password</h1>
      <br/>

      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Group controlId="formNewPassword">
                <FormControl 
                name="newPassword"
                type = "password"
                placeholder="New Password"
                required={true}
                value={newPassword}
                onChange={this.handleChange}
                 />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
              <FormControl 
                name="confirmPassword"
                type = "password"
                placeholder="Confirm Password"
                required={true}
                value={confirmPassword}
                onChange={this.handleChange}
                 />
                 <small>{errMsg}</small>
        </Form.Group>


        <Button variant="primary" type="submit">
          Update Password
        </Button>
      </Form>
      </div>
    )
  }

        handleChange(event){
          this.setState({
            [event.target.name]: event.target.value
          });
        };

        handleSubmit(event){
          event.preventDefault();

          if (this.state.newPassword !== this.state.confirmPassword)
            this.setState({
            errMsg: "password and confirm password do not match."
          });

          if (this.state.newPassword.length < 6)
            this.setState({
            errMsg: "password needs to be at least 6 characters long."
          });

          console.log("update pass")
          // axios.post(`http://127.0.0.1:5000/auth/signup`, 
          // {
          //   "username":this.state.firstName,
          //   "email":this.state.email,
          //   "password":this.state.password
          // }).then(res => {
          //   console.log(res);
          //   console.log(res.data);
          //   console.log(res.data['auth_token']);
          //   localStorage.setItem('auth_token', res.data['auth_token']);
          //   this.props.history.push("/register");
          // })
        };

}

export default withRouter(UpdatePassword);
