import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import './transactionTable.css';

const TransactionRow = (props) => {
  const {
    Amount,
    Company,
    Date,
    Ledger,
  } = props;

  const className = classNames(
    'transaction-table_row',
    {
      'transaction-table_row--credit': (Amount > 0),
    }
  );

  return (
    <tr className={className}>
      <td>{Date}</td>
      <td>{Company}</td>
      <td>{Ledger}</td>
      <td>{Amount}</td>
    </tr>
  );
}

//Emtpty <td>'s are a quick hack to keep spacing even on the no transactions row
const EmptyTransactionRow = (
  <tr className="transaction-table_row">
    <td>No transactions Found</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
);

const TransactionHeader = (props) => {
  return (
    <thead className="transaction-table_header">
        <tr>
          <th>Date</th>
          <th>Company</th>
          <th>Ledger</th>
          <th>{props.total}</th>
        </tr>
      </thead>
  );
}

const TransactionTable = (props) => {
  const {
    total,
    transactions,
  } = props;

  const transactionRows = (transactions.length) 
      ? _.map(transactions, (transaction) => <TransactionRow {...transaction}/>)
      : EmptyTransactionRow

  return (
    <table className="transaction-table">
      <TransactionHeader total={total}/>
      {transactionRows}
    </table>
  );
}

export default TransactionTable;