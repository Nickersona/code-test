import React from 'react';
import _ from 'lodash';

import Transactions from '../../models/Transactions';
import {
  reduceTransactionsToTotal,
} from '../../helpers';

const withTransactions = (WrappedComponent) => {
  return class WithTransactions extends React.Component {
    constructor() {
      super();
      this.state = {
        transactions: [],
        total: 0,
        error: null,
      };
    }

    componentDidMount() {
      new Transactions()
        .then(transactions => {
          const total = _.reduce(transactions, reduceTransactionsToTotal, 0);
          
          this.setState({ 
            transactions,
            total,
          })
        })
        .catch(error => this.setState({ error }));
    }

    render() {
        return <WrappedComponent {...this.state}/>;
    }
  }
}

export default withTransactions;