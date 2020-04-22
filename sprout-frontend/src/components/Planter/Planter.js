import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import '../../styles/planter.scss';
import '../../styles/styles.scss';

class Planter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      name: 'My Account',
      planterId: this.props.location.planterid,
      curCycle: true,
      loggedOut: false,
      newPlantCrop: '',
      firstCycle: null,
      cycles: null,
      frames: null,
      selectedFrame: null,
      frameHumidity: null,
      frameLight: null,
      frameTemp: null,
    };
    this.logout = this.logout.bind(this);
    this.checkCurrentCycle = this.checkCurrentCycle.bind(this);
    this.plantCropChange = this.plantCropChange.bind(this);
    this.addPlantSubmit = this.addPlantSubmit.bind(this);
    this.harvest = this.harvest.bind(this);
    this.getCycles = this.getCycles.bind(this);
    this.getFrames = this.getFrames.bind(this);
    this.getFrameData = this.getFrameData.bind(this);
  }
  
  componentDidMount() {
    if( this.props.user && this.props.user._id) {
      this.setState({name: this.props.user.username})
      if (this.props.location.planterid) {
        console.log(this.props.location.planterid);
        this.checkCurrentCycle();
        this.getCycles();
      }
    }
  }

  logout() {
    fetch('/users/logout', {
      method: 'POST'
    })
    .then(res => res.json()).then((data) => {
      if (data.success) {
        this.setState({
          loggedOut: true,
        });
      }
    });
  }

  checkCurrentCycle() {
    fetch(('/planters/' + this.state.planterId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .then(json => {
      console.log(json);
      this.setState({
        curCycle: json.planter?.plantCycle ? json.planter.plantCycle : null,
      });
      console.log(this.state.curCycle);
    });
  }

  plantCropChange(event) {
    this.setState({newPlantCrop: event.target.value});
  }

  harvest() {
    fetch(('/plant/harvest'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        planterid: this.state.planterId,
      })
    }).then(res => res.json())
    .then(json => {
      console.log(json);
      this.checkCurrentCycle();
      //this.getPlanters();
    });
  }

  addPlantSubmit(){
    this.setState({newPlantCrop: ''});
    fetch(('/plant/create'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        crop: this.state.newPlanterCrop,
        planterid: this.state.planterId,
      })
    }).then(res => res.json())
    .then(json => {
      console.log(json);
      this.checkCurrentCycle();
    });
  }

  getCycles() {
    fetch(('/planters/' + this.state.planterId + '/withPlants'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .then(json => {
      console.log(json);
      this.setState({
        firstCycle: json.allData?.plant,
        cycles: json.allData?.harvested,
      });
    });
  }

  getFrames(cycle) {
    console.log(cycle);
    fetch(('/plant/' + cycle._id + '/frames'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .then(json => {
      console.log(json);
      this.setState({
        selectedFrame: false,
        frames: json.info,
      });
    });
  }

  getFrameData(frame) {
    this.setState({
      selectedFrame: true,
      frameHumidity: frame.humidity,
      frameLight: frame.lightingTime,
      frameTemp: frame.temperature,
    });
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  render() {
    const {
      curCycle,
      firstCycle,
      cycles,
      frames,
      selectedFrame,
      frameHumidity,
      frameLight,
      frameTemp,
    } = this.state;
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
                <Link className="hidden-link" 
                to={{
                  pathname: "/farm/" + this.props.location.farmname,
                  farmid: this.props.location.farmid,
                }}>
                    Planters
                </Link>
            </div>
          </h1>
          <h1 className="stage-title">
            {this.props.match.params.planterId[0].toUpperCase() + this.props.match.params.planterId.slice(1)}
          </h1>
          {curCycle ? 
          <button style={{verticalAlign:'unset'}} className="btn btn-primary" onClick={this.harvest}>Harvest</button>
          : 
          <button style={{verticalAlign:'unset'}} className="btn btn-primary" data-toggle="modal" data-target="#addPlantModal">Add Cycle</button>
          }
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-6 main-container" style={{amrginTop:20}}>
          <div class="col" style={{marginBottom:20, maxHeight: 300}}>
            <div class="list-group" id="list-tab" role="tablist">
              <button href="#" class="list-group-item list-group-item-action list-group-item-dark disable">Cycles</button>
              {firstCycle ? 
                <button class="list-group-item list-group-item-action" data-toggle="list" onClick={() => this.getFrames(firstCycle)} role="tab">{new Date(firstCycle.cycle.datePlanted).toISOString().split('T')[0]}</button>
              : null}
              {cycles ? 
              cycles.map((cycle) => (
                <button class="list-group-item list-group-item-action" data-toggle="list" onClick={() => this.getFrames(cycle)} role="tab">{new Date(cycle.cycle.datePlanted).toISOString().split('T')[0]}</button>
              ))
              :
              <button class="list-group-item list-group-item-action disabled" data-toggle="list" role="tab">Create a cycle</button>
            }
            </div>
          </div>
          <div class="col" style={{marginBottom:20, maxHeight: 300}}>
            <div class="list-group" id="list-tab" role="tablist">
            <button href="#" class="list-group-item list-group-item-action list-group-item-dark disable">Frames</button>
              {frames ? frames.map((frame) => (
                <button class="list-group-item list-group-item-action" data-toggle="list" onClick={() => this.getFrameData(frame)} role="tab">{new Date(frame.insertedAt).toISOString().split('T')[0]}</button>
              )) : 
              <button class="list-group-item list-group-item-action disabled" data-toggle="list" role="tab">Select a cycle</button>
              }
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-8">
            {selectedFrame ? 
            <div class="card">
              <div class="card-header">
                Frame Data
              </div>
              <div class="card-body">
                <p class="card-text">Temperature: {frameTemp} °F</p>
                <p class="card-text">Humidity: {frameHumidity}%</p>
                <p class="card-text">Light time: {frameLight} Hours</p>
              </div>
            </div>
            :
            <div class="list-group" id="list-tab" role="tablist">
              <button href="#" class="list-group-item list-group-item-action list-group-item-dark disable">Frame Data</button>
              <button class="list-group-item list-group-item-action disabled" data-toggle="list" role="tab">Select a frame to view data</button>
            </div>
            }
          </div>
        </div>

        <div className="modal fade" id="addPlantModal" tabIndex="-1" role="dialog" aria-labelledby="addPlantModal" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addPlantModal">Add New Cycle</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.addPlantSubmit}>
                      <div className="form-group">
                        <label htmlFor="plant-crop" className="col-form-label">Crop:</label>
                        <input type="text" value={this.state.newPlantCrop} onChange={this.plantCropChange} className="form-control" id="plant-crop"/>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" onClick={this.addPlantSubmit} data-dismiss="modal" className="btn btn-primary">Add</button>
                  </div>
                </div>
              </div>
            </div>

        { this.state.loggedOut ? <Redirect to="/login" /> : null }
      </div>
    );
  }
}

export default Planter;
