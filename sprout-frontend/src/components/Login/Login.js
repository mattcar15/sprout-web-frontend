import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
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

  render() {
    const {
      token,
      signInError,
      signInEmail,
      signInPassword,
    } = this.state;

    if (!token) {
      return (
        <div className="container">
          <div className="signin-wrapper">
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p className="medium-bold">Please sign in</p>
            <input
              className="signin-textbox"
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              className="signin-textbox"
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button 
              className="large-button gradient-button"
              onClick={this.onSignIn}>
                Sign In
            </button>
            <p>No account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p>You're already signed in!</p>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default Login;
