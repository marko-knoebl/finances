var transactionList = function(activeAccount) {
  if (dataset.transactions.length === 0) {
    return 'no transactions'
  } else {
    return React.createElement('table', {},
      React.createElement('tbody', {},
        dataset.getTransactionsByAccount(activeAccount).reverse().map(function(transaction) {
          var positive = transaction.destination === activeAccount;
          return React.createElement('tr', {},
            React.createElement('td', {}, (positive?'':'-') + transaction.amount.toFixed(2)),
            React.createElement('td', {}, transaction.details),
            React.createElement('td', {}, transaction.date),
            React.createElement('td', {}, transaction.origin),
            React.createElement('td', {}, transaction.destination)
          );
        })
      )
    );
  }
  
  
};
