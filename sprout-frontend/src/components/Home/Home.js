import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlanterCard from '../Custom/PlanterCard';

import '../../styles/home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      cards: [{name: "Planter A", type: "Lettuce", health: "high", nutrients: "high", harvest: "med"}],
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
            <button role="button" type="button" class="btn" data-toggle="dropdown"> 
              {this.state.name}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button class="dropdown-item" type="button" onClick={this.logout}>Logout</button>
            </div>
          </div>
        </nav>
        <div className="main-container">
          <h1>
            Planters
          </h1>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-5">
          {this.state.cards.map((card) => (
            <PlanterCard name={card.name} type={card.type} health={card.health} 
              nutrients={card.nutrients} harvest={card.harvest}/>
          ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
