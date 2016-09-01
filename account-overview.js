var accountOverview = function() {
  // get a list of all accounts (except 'world') and display names and balance
  return React.createElement('div', {},
    React.createElement('div', {style: {'fontSize':'120%'}}, 'Total: ', (-dataset.getBalance('world')).toFixed(2)),
    React.createElement('div', {},
      dataset.accounts
        .filter(function(account) {return account.id !== 'world'})
        .map(function(account) {
          return React.createElement(
            'div', 
            {
              onClick: function() {
                uiData.accountDetails.activeAccount = account.id;
                uiData.accountDetails.active = true;
                rerender();
              },
              style: {color: 'blue', cursor: 'pointer'}
            },
            (account.name || account.id) + ': ' + dataset.getBalance(account.id).toFixed(2)
          );
      })
    )
  );
};
