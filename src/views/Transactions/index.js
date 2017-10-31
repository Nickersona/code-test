import React from 'react';
import withTransactions from './withTransactions';
import TransactionTable from '../../components/TransactionTable/';
import ErrorMessage from '../../components/ErrorMessage/';

const TransactionsView = (props) => {
  const {
    error,
  } = props;
  
  return (error)
    ? <ErrorMessage error={error}/>
    : <TransactionTable {...props} />
};

export default withTransactions(TransactionsView);