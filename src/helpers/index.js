function normalizeStringToFloat(floatString) {
  return Math.round(parseFloat(floatString) * 100);
}

function reduceTransactionsToTotal(idx, transaction, acc) {
  const { Amount } = transaction;
  return acc += normalizeStringToFloat(Amount);
}

export {
	reduceTransactionsToTotal,
}