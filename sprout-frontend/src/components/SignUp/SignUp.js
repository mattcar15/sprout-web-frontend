import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';

class SignUp extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          signUpError: '',
          validEmail: false,
          signUpEmail: '',
          signUpPassword: '',
          confirmPassword: '',
          signedUp: false,
        };
    
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onTextboxChangeConfirmPassword = this.onTextboxChangeConfirmPassword.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
      }
    
      onTextboxChangeSignUpEmail(event) {
        let re = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
        this.setState({
          signUpEmail: event.target.value,
          validEmail: re.test(event.target.value),
        });
      }
    
      onTextboxChangeSignUpPassword(event) {
        this.setState({
          signUpPassword: event.target.value,
        });
      }

      onTextboxChangeConfirmPassword(event) {
        this.setState({
          confirmPassword: event.target.value,
        });
      }

      onSignUp() {
        this.setState({signUpError: ""});
        if (this.state.signUpPassword.length == 0) {
          this.setState({signUpError: "Password fields must be filled"});
        } else if ((this.state.signUpPassword == this.state.confirmPassword) && this.state.validEmail) {
          fetch(('/users/signup'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: this.state.signUpEmail,
              password: this.state.signUpPassword,
            })
          }).then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Something went wrong");
            }
          })
          .then(json => {
            console.log('json', json);
            this.setState({signedUp: true});
          })
          .catch((error) => {
            console.log(error);
            this.setState({signUpError: error.message})
          });
        } else if (this.state.signUpPassword != this.state.confirmPassword) {
          this.setState({signUpError: "Password must match"});
        } else {
          this.setState({signUpError: "Email must be a vaid email"});
        }
      }
    
      render() {
        const {
          confirmPassword,
          signUpEmail,
          signUpPassword,
          signUpError,
        } = this.state;
    
        return (
          <div className="container">
              <div className="signin-wrapper">
              {
                (signUpError) ? (
                  <p style={{color:'red'}}>{signUpError}</p>
                ) : (null)
              }
              <p className="medium-bold">Sign Up</p>
              <input
                  className="signin-textbox"
                  type="email"
                  placeholder="Email"
                  value={signUpEmail}
                  onChange={this.onTextboxChangeSignUpEmail}
              /><br />
              <input
                  className="signin-textbox"
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={this.onTextboxChangeSignUpPassword}
              /><br />
              <input
                  className="signin-textbox"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={this.onTextboxChangeConfirmPassword}
              /><br />
              <button 
                  onClick={this.onSignUp}
                  className="large-button gradient-button"
              >
                  Sign Up
              </button>
            </div>
            { this.state.signedUp ? <Redirect to="/" /> : null }
          </div>
        );
    }
}

export default SignUp;
