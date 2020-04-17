import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';

import NotFound from './NotFound';

import Home from '../Home/Home';
import Planter from '../Planter/Planter'
import Farm from '../Farm/Farm'

import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

import '../../styles/styles.scss';
import '../../styles/text.scss';

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          Cookies.get('session-id') ?
            <Component {...props} /> :
            <Redirect to='/login' />
        )} 
      />
    )
  }
}

class App extends Component {

  render() {
    return (
      <main>
        <Switch>
          <ProtectedRoute exact path="/" component={Home}/>
          <ProtectedRoute path="/farm/:farmId" component={Farm}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <ProtectedRoute path="/planter/:planterId" component={Planter}/>
          <Route component={NotFound}/>
        </Switch>
      </main>
    )
  }
}

export default App;
