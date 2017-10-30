import _ from 'lodash';

import {
  mapTransactionKeysToLower,
} from '../helpers';

const ENDPOINT = 'http://resttest.bench.co/transactions/' 
const getPageEndpoint = pageNumber => `${ENDPOINT}${pageNumber}.json`;

class Transactions {
  constructor() {
        return new Promise((resolve, reject) => {
            this.get()
              .then(data => data.json())
              .then(data => this.getAll.call(this, data))
              .then(resolve)
              .catch(reject)
        })
  }

  get(page = 1) {
    return fetch(getPageEndpoint(page));
  }

  getAll(initialData) {
    const { 
      totalCount, 
      page,
      transactions
    } = initialData;

    const transactionsPerPage = transactions.length;
    const totalPages = _.ceil(totalCount/transactionsPerPage)

    return this.getTransactionsInPageRange(page + 1, totalPages)
      .then(rangeData => _.concat(transactions, rangeData.transactions))
      .then(this.normalizeTransactions);
  }

  // given a start and end range, fetch all transactions for that range
  getTransactionsInPageRange(start, end) {
    return new Promise((resolve, reject) => {
      const returnData = {
        transactions: [],
        error: null,
      };

      const promises = [];
      while(end >= start) {
        const fetchPromise = this.get(start)
          .then(data => data.json())
          .then(data => {
            returnData.transactions = _.concat(returnData.transactions, data.transactions)
          })
          .catch(err => returnData.error = err);

        promises.push(fetchPromise)
        start++;
      }

      Promise.all(promises)
        .then(() => {
          resolve(returnData);
        });
    });
  }

  // Preform any data normalization here to smooth over issue with the endpoint
  normalizeTransactions(transactions) {
    let formattedTransactions = [];
    
    formattedTransactions = _.map(mapTransactionKeysToLower);
    return formattedTransactions;
  }

}

export default Transactions;