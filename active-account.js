var activeAccountComponent = function(activeAccount) {
  return React.createElement('div', {},
    React.createElement('h2', {}, 'Active Account'),
    React.createElement('button', {onClick: function() {uiData.accountDetails.active = false; rerender()}}, 'close'),
    activeAccountDetails(activeAccount),
    React.createElement('h3', {}, 'Transaction List'),
    transactionList(activeAccount)
  );
};
