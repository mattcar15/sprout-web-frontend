import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading/Loading';

import '../../styles/home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'My Account',
      newFarmName: '',
      loggedOut: false,
      lastFarm: null,
      loading: false,
    };
    
    this.farmNameChange = this.farmNameChange.bind(this);
    this.addFarmSubmit = this.addFarmSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    if( this.props.user && this.props.user._id) {
      this.setState({name: this.props.user.username})
      this.setState({loading: true});
      fetch(('/users/myFarms'), {
        type: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
      .then(json => {
        if (json.farms) {
          this.setState({lastFarm: json.farms[0]});
        }
        this.setState({loading: false});
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  farmNameChange(event) {
    this.setState({newFarmName: event.target.value});
  }

  addFarmSubmit() {
    //push new farm to farms with this user
    console.log('A farm was added: ' + this.state.newFarmName);
    this.setState({loading: true});
    fetch('/farms/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.newFarmName,
      }),
    }).then(res => res.json())
    .then(json => {
      this.setState({
        lastFarm: [json.farm._id, json.farm.name], 
      });
      this.setState({loading: false});
    });
  }

  render() {
    const {
      lastFarm,
      loading,
      loggedOut,
    } = this.state;
    if (loggedOut) {
      return (
        <Redirect to="/login" />
      )
    }
    if (loading) {
      return (
        <Loading/>
      )
    } else if (lastFarm) {
      return (
        <Redirect push to={{
          pathname: "/farm/"+ this.state.lastFarm[1],
          farmid: lastFarm[0]
          }}/>
      )
    } else if (!lastFarm) {
      return (
        <div>
          <nav className="navbar navbar-inversetransparent">
            <a className="navbar-brand" href="/">
              <img src={require("../../assets/sproutIcon.png")} height="50" alt=""/>
            </a>
            <div className="dropdown open">
              <button className="btn" data-toggle="dropdown"> 
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
                <button style={{margin:20}}className="btn btn-primary" data-toggle="modal" data-target="#addFarmModal">Add new farm</button>
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
                      <label htmlFor="farm-name" className="col-form-label">Farm Name:</label>
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
          { this.state.loggedOut ? <Redirect to="/login" /> : null }
        </div>
      );
    }
  }
}

export default Home;
