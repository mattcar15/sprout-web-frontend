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
      cards: [{name: "Planter A", type: "Lettuce", health: "low", nutrients: "low", harvest: "med"},
              {name: "Planter B", type: "Lettuce", health: "high", nutrients: "high", harvest: "med"}],
      name: 'My Account',
      newId: '',
      newType: '',
    };

    this.addPlanterSubmit = this.addPlanterSubmit.bind(this);
    this.planterIdChange = this.planterIdChange.bind(this);
    this.planterTypeChange = this.planterTypeChange.bind(this);
  }

  logout() {
    alert("You logged out");
  }

  addPlanterSubmit() {
    console.log('A planter was added: ' + this.state.newId + ' | type: ' + this.state.newType);
    this.setState({cards: this.state.cards.concat([{name: this.state.newId, type: this.state.newType, health: "med", nutrients: "med", harvest: "med"}])});
  }

  planterIdChange(event) {
    this.setState({newId: event.target.value});
  }

  planterTypeChange(event) {
    this.setState({newType: event.target.value});
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
          <h1 className="stage-title">
            Planters
          </h1>

          <button style={{verticalAlign:'unset'}}type="button" class="btn btn-primary" data-toggle="modal" data-target="#addPlanterModal">Add Planter</button>
          <div class="modal fade" id="addPlanterModal" tabindex="-1" role="dialog" aria-labelledby="addPlanterModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="addPlanterModal">Add New Planter</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form onSubmit={this.addPlanterSubmit}>
                    <div class="form-group">
                      <label for="planter-id" class="col-form-label">Planter Name:</label>
                      <input type="text" value={this.state.newId} onChange={this.planterIdChange} class="form-control" id="planter-id"/>
                    </div>
                    <div class="form-group">
                      <label for="message-text" class="col-form-label">Plant Type:</label>
                      <input type="text" value={this.state.newType} onChange={this.planterTypeChange} class="form-control" id="planter-type"/>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" onClick={this.addPlanterSubmit} class="btn btn-primary">Add</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-5">
          {this.state.cards.map((card) => (
            <Link className="hidden-link" to={'planter/' + card.name}>
              <PlanterCard name={card.name} type={card.type} health={card.health} 
                nutrients={card.nutrients} harvest={card.harvest}/>
            </Link>
          ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
