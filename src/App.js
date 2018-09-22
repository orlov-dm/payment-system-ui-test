import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import CardForm from './components/CardForm';
import SecurityForm from './components/SecurityForm';
import CheckoutForm from './components/CheckoutForm';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={CardForm}/>
        <Route exact path='/security' component={SecurityForm}/>
        <Route exact path='/checkout' component={CheckoutForm}/>        
      </Switch>      
    );
  }
}

export default App;
