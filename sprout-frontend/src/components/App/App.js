import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import NotFound from './NotFound';

import Home from '../Home/Home';
import Planter from '../Planter/Planter'
import Farm from '../Farm/Farm'

import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

import '../../styles/styles.scss';
import '../../styles/text.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      doneAuth: false,
    };
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.updateUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.updateUser();
    }
  }

  updateUser() {
    fetch('/users/auth').then(
      results => results.json(),
    ).then((data) => {
      this.setState({
        user: data,
        doneAuth: true,
      });
      console.log(this.state.user);
    });
  }

  render() {
    return (
      <main>
        <Switch>
          <PrivateRoute exact path="/" component={Home} user={this.state.user} />
          <PrivateRoute path="/farm/:farmId" component={Farm} user={this.state.user}/>
          <PublicRoute path="/login" component={Login} user={this.state.user}/>
          <PublicRoute path="/signup" component={SignUp} user={this.state.user}/>
          <PrivateRoute path="/planter/:planterId" component={Planter} user={this.state.user}/>
          <PublicRoute component={NotFound}/>
        </Switch>
      </main>
    )
  }
}

export default withRouter(props => <App {...props} />);
