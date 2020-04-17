import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PlanterCard from '../Custom/PlanterCard';

import '../../styles/farm.scss';

class Farm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      sessionId: '',
      cards: [{name: "Planter A", type: "Lettuce", health: "low", nutrients: "low", harvest: "med"},
              {name: "Planter B", type: "Lettuce", health: "high", nutrients: "high", harvest: "med"}],
      name: 'My Account',
      newId: '',
      newType: '',
      curFarm: 'My Farm',
      farms: [],
      newFarmName: '',
      newUser: '',
    };

    this.addPlanterSubmit = this.addPlanterSubmit.bind(this);
    this.planterIdChange = this.planterIdChange.bind(this);
    this.planterTypeChange = this.planterTypeChange.bind(this);
    this.farmNameChange = this.farmNameChange.bind(this);
    this.addFarmSubmit = this.addFarmSubmit.bind(this);
    this.addUserSubmit = this.addUserSubmit.bind(this);
    this.userChange = this.userChange.bind(this);
  }

  componentDidMount() {
      if(this.props.match.params.farmId) {
        this.setState({curFarm: this.props.match.params.farmId});
      }
  }

  logout() {
    //add logout fetch here
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

  farmNameChange(event) {
    this.setState({newFarmName: event.target.value});
  }

  addFarmSubmit() {
    //push new farm to farms with this user
    console.log('A farm was added: ' + this.state.newFarmName);
    this.setState({
        farms: this.state.farms.concat([this.state.newFarmName]),
        newFarmName: ''
    });
    console.log(this.state.farms);
  }

  userChange(event) {
      this.setState({newUser: event.target.value});
  }

  addUserSubmit() {
      //do request here to add user to farm
      console.log(this.state.newUser + " has been added to " + this.state.curFarm);
      this.setState({newUser: ''});
  }

  render() {
    const {
      sessionId,
    } = this.state;
    /*if (!sessionId) {
      return (
        <Redirect push to="/login"/>
      )
    }*/
    if (true) {
      return (
        <div>
          <nav className="navbar navbar-inversetransparent">
            <a className="navbar-brand" href="/">
              <img src={require("../../assets/sproutIcon.png")} height="50" alt=""/>
            </a>
            <div id="farmsWrapper">
                <div className="dropdown">
                    <button className="btn dropdown-toggle" role="button" type="button" data-toggle="dropdown"> 
                        {this.state.curFarm}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        {this.state.farms.map((farm) => (
                            <Link className="hidden-link" to={'/' + farm}>
                                    <button className="btn">{farm}</button>
                            </Link>
                        ))}
                    </div>
                </div>
                <button className="btn btn-primary" data-toggle="modal" data-target="#addFarmModal">Add farm</button>
                <button className="btn btn-primary" data-toggle="modal" data-target='#addUserModal'>Add user</button>
            </div>
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

          <div className="modal fade" id="addFarmModal" tabIndex="-1" role="dialog" aria-labelledby="addFarmModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addFarmModal">Add New Farm</h5>
                  <button className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.addFarmSubmit}>
                    <div className="form-group">
                      <label for="farm-name" className="col-form-label">Farm Name:</label>
                      <input type="text" value={this.state.newFarmName} onChange={this.farmNameChange} className="form-control" id="farm-name"/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button onClick={this.addFarmSubmit} data-dismiss="modal" className="btn btn-primary">Add</button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal fade" id="addUserModal" tabIndex="-1" role="dialog" aria-labelledby="addUserModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addUserModal">Add New Farm</h5>
                  <button className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.addUserSubmit}>
                    <div className="form-group">
                      <label for="farm-name" className="col-form-label">Farm Name:</label>
                      <input type="text" value={this.state.newUser} onChange={this.userChange} className="form-control" id="farm-name"/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button onClick={this.addUserSubmit} data-dismiss="modal" className="btn btn-primary">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Farm;
