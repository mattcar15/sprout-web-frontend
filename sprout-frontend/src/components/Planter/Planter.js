import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/planter.scss';

class Planter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      name: 'My Account',
    };

  }

  logout() {
    alert("You logged out");
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inversetransparent">
          <a className="navbar-brand" href="/">
            <img src={require("../../assets/sproutIcon.png")} height="50" alt=""/>
          </a>
          <div class="dropdown open">
            <button class="btn" data-toggle="dropdown"> 
              {this.state.name}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button class="dropdown-item" onClick={this.logout}>Logout</button>
            </div>
          </div>
        </nav>
        <div className="main-container">
          <h1 className="stage-title">
            <div style={{opacity:0.6}}>
                <Link className="hidden-link" to="/">
                    Planters
                </Link>
            </div>
          </h1>
          <h1 className="stage-title">
            {this.props.match.params.planterId[0].toUpperCase() + this.props.match.params.planterId.slice(1)}
          </h1>
        </div>
      </div>
    );
  }
}

export default Planter;
