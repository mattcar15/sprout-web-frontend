import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PlanterCard from '../Custom/PlanterCard';

import '../../styles/home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      farms: '',
      name: 'My Account',
      newFarmName: '',
      farms: null,
    };
    
    this.farmNameChange = this.farmNameChange.bind(this);
    this.addFarmSubmit = this.addFarmSubmit.bind(this);
  }

  logout() {
    //add logout fetch here
    alert("You logged out");
  }

  farmNameChange(event) {
    this.setState({newFarmName: event.target.value});
  }

  addFarmSubmit() {
    //push new farm to farms with this user
    console.log('A farm was added: ' + this.state.newFarmName);
    this.setState({farms: this.state.newFarmName});
  }

  render() {
    const {
      farms,
    } = this.state;
    if (farms) {
      return (
        <Redirect push to={"/farm/"+ this.state.newFarmName}/>
      )
    }
    else if (!farms) {
      return (
        <div>
          <nav className="navbar navbar-inversetransparent">
            <a className="navbar-brand" href="/">
              <img src={require("../../assets/sproutIcon.png")} height="50" alt=""/>
            </a>
            <div className="dropdown open">
              <button role="button" className="btn" data-toggle="dropdown"> 
                {this.state.name}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button className="dropdown-item" onClick={this.logout}>Logout</button>
              </div>
            </div>
          </nav>
          <div className="main-container" style={{textAlign:'center'}}>
              <div style={{marginTop:'200px'}}>
                <h2>To begin you'll need a farm!</h2>
                <button className="btn btn-primary" data-toggle="modal" data-target="#addFarmModal">Add new farm</button>
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
        </div>
      );
    }
  }
}

export default Home;
