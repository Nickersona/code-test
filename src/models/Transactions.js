import _ from 'lodash';

import {
  mapTransactionKeysToLower,
} from '../helpers';

// If there's more than MAX_PAGE_FETCH pages of transaction records, limit fetches to prevent 
// exploding the network. 
// TODO add ability to fetch additional transactions (pagination) when this limit reached
const MAX_PAGE_FETCH = 5;
const ENDPOINT = 'http://resttest.bench.co/transactions/' 
const getPageEndpoint = pageNumber => `${ENDPOINT}${pageNumber}.json`;

class Transactions {
  constructor() {
    return new Promise((resolve, reject) => {
        this.get()
          .then(data => data.json())
          .then(data => this.getAll.call(this, data))
          .then(resolve)
          .catch(reject);
    });
  }

  get(page = 1) {
    return fetch(getPageEndpoint(page));
  }

  // Based on initial Transaction request data, calculate the number of additional fetch requests
  // needed to fetch all and return a promise that resolves to the initial request transactions
  // merged in with the additional request transactions
  getAll(initialData) {
    const { 
      totalCount, 
      page,
      transactions
    } = initialData;

    const transactionsPerPage = transactions.length;
    const totalPages = _.ceil(totalCount/transactionsPerPage)

    const pagesToFetch = (totalPages > MAX_PAGE_FETCH) 
      ? MAX_PAGE_FETCH
      : totalPages;

    return this.getTransactionsInPageRange(page + 1, pagesToFetch)
      .then(rangeData => _.concat(transactions, rangeData.transactions))
      .then(this.normalizeTransactions);
  }

  // Given a start page and end page range, fetch all transactions for those pages
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

      // When all promises have been resolved our returnData should be ready
      Promise.all(promises)
        .then(() => {
          resolve(returnData);
        });
    });
  }

  // Preform any data normalization here to smooth over issue with the endpoint
  // @TODO Normalize amount so they're not strings 
  // @TODO Normalize dates to Date objects so the FE can decide how to output them
  normalizeTransactions(transactions) {
    let formattedTransactions = [];
    formattedTransactions = _.map(transactions, mapTransactionKeysToLower);
    return formattedTransactions;
  }
}

export default Transactions;