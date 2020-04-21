import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PlanterCard from '../Custom/PlanterCard';
import Loading from '../Loading/Loading';

import '../../styles/farm.scss';

class Farm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      cards: [{name: "Planter A", type: "Lettuce", health: "low", nutrients: "low", harvest: "med"},
              {name: "Planter B", type: "Lettuce", health: "high", nutrients: "high", harvest: "med"}],
      name: 'My Account',
      newId: '',
      newType: '',
      curFarm: 'My Farm',
      farms: [],
      newFarmName: '',
      newFarm: null,
      newUser: '',
      loggedOut: false,
      loading: false,
      members: [],
    };

    this.addPlanterSubmit = this.addPlanterSubmit.bind(this);
    this.planterIdChange = this.planterIdChange.bind(this);
    this.planterTypeChange = this.planterTypeChange.bind(this);
    this.farmNameChange = this.farmNameChange.bind(this);
    this.addFarmSubmit = this.addFarmSubmit.bind(this);
    this.addUserSubmit = this.addUserSubmit.bind(this);
    this.userChange = this.userChange.bind(this);
    this.logout = this.logout.bind(this);
    this.getMembers = this.getMembers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    if(this.props.match.params.farmName) {
      this.setState({curFarm: this.props.match.params.farmName});
    }
    this.getMembers();

    if( this.props.user && this.props.user._id) {
      this.setState({name: this.props.user.username})
      fetch(('/users/myFarms'), {
        type: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
      .then(json => {
        this.setState({farms: json.farms});
      });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  getMembers() {
    if(this.props.location.farmid) {
      fetch(('/farms/' + this.props.location.farmid + '/members'), {
        type: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
      .then(json => {
        this.setState({members: json.members});
      });
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

  userChange(event) {
      this.setState({newUser: event.target.value});
  }

  farmNameChange(event) {
    this.setState({newFarmName: event.target.value});
  }

  addFarmSubmit() {
    //push new farm to farms with this user
    console.log('A farm was added: ' + this.state.newFarmName);
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
      console.log('json', json.farm);
      this.setState({
        newFarm: json.farm, 
      });
    });
  }

  addUserSubmit() {
      //do request here to add user to farm
      this.setState({newUser: ''});
      if (this.props.location.farmid) {
        console.log(this.props.location.farmid);
        fetch(('/farms/' + this.props.location.farmid + '/addMember'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.state.newUser,
          })
        }).then(res => res.json())
        .then(json => {
          console.log(this.state.newUser + " has been added to " + this.state.curFarm);
          this.getMembers();
        });
      } else {
        console.log("Farm ID error in add user");
      }
  }

  deleteUser(id) {
    console.log(id);
    if (this.props.location.farmid) {
      fetch(('/farms/' + this.props.location.farmid + '/member/' + id), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(json => {
        console.log("deleted member");
        this.getMembers();
      });
    } else {
      console.log("Farm ID error in delete member");
    }
  }

  render() {
    const {
      loggedOut,
      loading,
      newFarm
    } = this.state;
    if (loggedOut) {
      return (
        <Redirect to="/login" />
      )
    } else if (loading) {
      return(
        <Loading/>
      );
    } else if (newFarm) {
      return(
        <Redirect push to={{
          pathname: "/farm/"+ this.state.newFarm.name,
          farmid: newFarm._id
          }}/>
      );
    } else {
      return (
        <div>
          <nav className="navbar navbar-inversetransparent">
            <a className="navbar-brand" href="/">
              <img src={require("../../assets/sproutIcon.png")} height="50" alt=""/>
            </a>
            <div id="farmsWrapper">
              <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                <div className="btn-group" role="group">
                    <button className="btn dropdown-toggle btn-primary" type="button" data-toggle="dropdown"> 
                        {this.state.curFarm}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2" style={{overflowY:'scroll', maxHeight:'300px'}}>
                        {this.state.farms.map((farm) => (
                            <Link className="hidden-link" 
                              to={{
                                pathname: '/farm/'+ farm[1], 
                                farmid: farm[0],
                              }}>
                                    <button className="btn" style={{width:'100%', textAlign:'left'}}>{farm[1]}</button>
                            </Link>
                        ))}
                    </div>
                </div>
                <button className="btn btn-primary" data-toggle="modal" data-target='#addUserModal'>Permissions</button>
                </div>
                <button style={{marginLeft:10}} className="btn btn-primary" data-toggle="modal" data-target="#addFarmModal">Add farm</button>
            </div>
            <div className="dropdown open">
              <button type="button" className="btn" data-toggle="dropdown"> 
                {this.state.name}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button className="dropdown-item" type="button" onClick={this.logout}>Logout</button>
              </div>
            </div>
          </nav>
          <div className="main-container">
            <h1 className="stage-title">
              Planters
            </h1>

            <button style={{verticalAlign:'unset'}}type="button" className="btn btn-primary" data-toggle="modal" data-target="#addPlanterModal">Add Planter</button>
            <div className="modal fade" id="addPlanterModal" tabIndex="-1" role="dialog" aria-labelledby="addPlanterModal" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addPlanterModal">Add New Planter</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.addPlanterSubmit}>
                      <div className="form-group">
                        <label htmlFor="planter-id" className="col-form-label">Planter Name:</label>
                        <input type="text" value={this.state.newId} onChange={this.planterIdChange} className="form-control" id="planter-id"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label">Plant Type:</label>
                        <input type="text" value={this.state.newType} onChange={this.planterTypeChange} className="form-control" id="planter-type"/>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" onClick={this.addPlanterSubmit} className="btn btn-primary">Add</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-5">
            {this.state.cards.map((card) => (
              <Link className="hidden-link" to={'/planter/' + card.name}>
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




          <div className="modal fade" id="addUserModal" tabIndex="-1" role="dialog" aria-labelledby="addUserModal" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addUserModal">Permissions</h5>
                  <button className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ul className="list-group" style={{marginBottom:10}}>
                    {this.state.members.map((member) => (
                      <li className="list-group-item">{member.username}
                      <button className="close" onClick={() => this.deleteUser(member._id)}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                      </li>
                    ))}
                  </ul>
                  <form onSubmit={this.addUserSubmit}>
                    <div className="form-group">
                      <label htmlFor="farm-name" className="col-form-label">Invite user:</label>
                      <div className="input-group">
                        <input type="text" value={this.state.newUser} onChange={this.userChange} placeholder="Username to invite" className="form-control" id="farm-name"/>
                        <div className="input-group-append">
                          <button onClick={this.addUserSubmit} data-dismiss="modal" className="btn btn-primary">Add</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" data-dismiss="modal">Close</button>
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
