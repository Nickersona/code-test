import React from 'react';
import Transactions from '../../models/Transactions';

const withTransactions = (WrappedComponent) => {
  return class WithTransactions extends React.Component {
    componentDidMount() {
        new Transactions()
          .then(transactions => this.setState({ transactions }))
          .catch(console.error);
    }

      render() {
        return <WrappedComponent {...this.state}/>
      }
  }
}

export default withTransactions;