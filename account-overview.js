var accountOverview = function() {
  // get a list of all accounts (except 'world') and display names and balance
  return React.createElement('div', {},
    React.createElement('div', {style: {'font-size':'120%'}}, 'Total: ', (-dataset.getBalance('world')).toFixed(2)),
    React.createElement('div', {},
      dataset.accounts
        .filter(function(account) {return account.id !== 'world'})
        .map(function(account) {
          return React.createElement(
            'div', 
            {
              onClick: function() {uiData.activeAccount = account.id; rerender();},
              style: {color: 'blue', cursor: 'pointer'}
            },
            (account.name || account.id) + ': ' + dataset.getBalance(account.id).toFixed(2)
          );
      })
    )
  );
};
