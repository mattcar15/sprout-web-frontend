import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlanterCard from '../Custom/PlanterCard';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      cards: [{name: "Planter A", type: "Lettuce", health: "high", nutrients: "high", harvest: "med"}],
    };

  }

  render() {
    const {
      token,
    } = this.state;

    let account;
    if (token) {
      account = <button onClick={this.logout}>Logout</button>;
    } else {
      account = <button onClick={this.logout}>Logout</button>;;
    }

    return (
      <div>
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
    );
  }
}

export default Home;
