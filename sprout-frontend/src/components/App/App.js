import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NotFound from './NotFound';

import Home from '../Home/Home';
import Planter from '../Planter/Planter'

import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

import '../../styles/styles.scss';
import '../../styles/text.scss';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/planter/:planterId" component={Planter}/>
        <Route component={NotFound}/>
      </Switch>
    </main>
  )
}

export default App;
