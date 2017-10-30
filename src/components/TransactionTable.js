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

  return (
    <table className="transaction-table">
      <TransactionHeader total={total}/>
      {_.map(
        transactions, 
        (transaction) => <TransactionRow {...transaction}/>,
      )}
    </table>
  );
}

export default TransactionTable;