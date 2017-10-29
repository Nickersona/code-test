import React from 'react';
import withTransactions from './withTransactions';
import TransactionTable from '../../components/TransactionTable';

const TransactionsView = (props) => {
  return (
  		<TransactionTable {...props} />
    )
};

export default withTransactions(TransactionsView);

