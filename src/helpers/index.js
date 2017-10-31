import _ from 'lodash';

function normalizeStringToFloat(floatString) {
  return Math.round(parseFloat(floatString) * 100);
}

function reduceTransactionsToTotal(idx, transaction, acc) {
  const { amount } = transaction;
  return acc += normalizeStringToFloat(amount);
}

const mapTransactionKeysToLower = (transaction, idx) => {
  return _.mapKeys(transaction, (val, key) => _.toLower(key));
};

export {
  reduceTransactionsToTotal,
  mapTransactionKeysToLower,
}