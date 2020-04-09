import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
//import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;

    let account;
    if (token) {
      account = <button onClick={this.logout}>Logout</button>;
    } else {
      account = (
        <div>
          <Link to="/login">
            <button type="button">
              Sign in
            </button>
          </Link>
          <Link to="/signup">
            <button type="button">
              Sign up
            </button>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <p>hello</p>
      </div>
    );
  }
}

export default Home;
