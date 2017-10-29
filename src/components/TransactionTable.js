import React from 'react';
import _ from 'lodash';

const TransactionRow = (props) => {
	const {
		Amount,
		Company,
		Date,
		Ledger,
	} = props;

	return (
		<tr className="transaction-table_row">
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