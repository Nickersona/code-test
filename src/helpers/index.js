import _ from 'lodash';

function normalizeStringToFloat(floatString) {
  return Math.round(parseFloat(floatString) * 100);
}

function reduceTransactionsToTotal(idx, transaction, acc) {
  const { Amount } = transaction;
  return acc += normalizeStringToFloat(Amount);
}

const mapTransactionKeysToLower = (idx, transaction) => _.keyBy(transaction, _.toLower);

export {
	reduceTransactionsToTotal,
	mapTransactionKeysToLower,
}