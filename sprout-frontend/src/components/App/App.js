import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';

import NotFound from './NotFound';

import Home from '../Home/Home';

import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

import '../../styles/styles.scss';
import '../../styles/text.scss';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={SignUp}/>
      <Route component={NotFound}/>
    </Switch>
  )
}

export default App;
