import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionId: Cookies.get('session-id'),
      signInError: '',
      signInEmail: '',
      signInPassword: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
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

  onSignIn() {
    console.log(Cookies.get('session-id'));
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('http://localhost:2000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
          });
          this.props.history.push('/');
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });

      fetch('http://localhost:2000/farms/create', {
        method: 'POST',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          creator: 'fake_id',
          name: 'first fancy farm',
        }),
      }).then(() => {
        console.log('it works')
      })
  }

  render() {
    const {
      sessionId,
      signInError,
      signInEmail,
      signInPassword,
    } = this.state;

    if (!sessionId) {
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
        <Redirect push to="/login"/>
      </div>
    );
  }
}

export default Login;
