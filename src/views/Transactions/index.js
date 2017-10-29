import React from 'react';
import withTransactions from './withTransactions';

const TransactionsView = (props) => {
  console.log(props);
  return (
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    )
};

export default withTransactions(TransactionsView);
