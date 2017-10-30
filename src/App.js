import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import TransactionsView from './views/Transactions';

class App extends Component {
  render() {
    return (
      <div className="app">
        <TransactionsView />
      </div>
    );
  }
}

export default App;
