import React, { Component } from 'react';
import 'whatwg-fetch';

class SignUp extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          token: '',
          signUpError: '',
          signUpEmail: '',
          signUpPassword: '',
          confirmPassword: '',
        };
    
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onTextboxChangeConfirmPassword = this.onTextboxChangeConfirmPassword.bind(this);
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

      onTextboxChangeConfirmPassword(event) {
        this.setState({
          confirmPassword: event.target.value,
        });
      }
    
      render() {
        const {
          token,
          confirmPassword,
          signUpEmail,
          signUpPassword,
          signUpError,
        } = this.state;
    
        if (!token) {
          return (
            <div className="container">
                <div className="signin-wrapper">
                {
                  (signUpError) ? (
                    <p>{signUpError}</p>
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
            </div>
          );
        }
    
        return (
          <div>
            <p>Account</p>
            <button onClick={this.logout}>Logout</button>
          </div>
        );
    }
}

export default SignUp;
