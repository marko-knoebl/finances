var showAddTransactionDialog = function() {
  uiData.addTransaction.active = true;
  rerender();
};

var hideAddTransactionDialog = function() {
  uiData.addTransaction.active = false;
  rerender();
};

var addTransactionComponent = function() {
  return React.createElement('form', {},
    React.createElement('h2', {}, 'Add Transaction'),
    React.createElement('div', {},
      React.createElement('label', {'for': 'amount_input'}, 'Amount:'),
      React.createElement('input', {id: 'amount_input', type: 'number', defaultValue: '0', step: '0.01'})
    ),
    React.createElement('div', {},
      React.createElement('label', {'for': 'details_input'}, 'Details:'),
      React.createElement('input', {id: 'details_input'})
    ),
    React.createElement('div', {},
      React.createElement('label', {'for': 'date_input'}, 'Date:'),
      React.createElement('input', {id: 'date_input', type: 'date', defaultValue: new Date().toISOString().slice(0, 10)})
    ),
    React.createElement('div', {},
      React.createElement('label', {'for': 'origin_account_select'}),
      React.createElement('select', {id: 'origin_account_select', name: 'origin_account'}, 
        dataset.accounts.map(function(account) {
          return React.createElement('option', {value: account.id}, account.id)
        })
      )
    ),
    React.createElement('div', {},
      React.createElement('label', {'for': 'destination_account_select'}),
      React.createElement('select', {id: 'destination_account_select', name: 'destination_account'},
        dataset.accounts.map(function(account) {
          return React.createElement('option', {value: account.id}, account.id)
        })
      )
    ),
    React.createElement('button', {onClick: hideAddTransactionDialog}, 'Cancel'),
    React.createElement('button', {onClick: addTransaction}, 'Add Transaction')
  );
};

var addTransaction = function() {
  // TODO: test for negative amount
  var amount = parseFloat(document.querySelector('#amount_input').value);
  origin = document.querySelector('#origin_account_select').value;
  destination = document.querySelector('#destination_account_select').value;
  var details = document.querySelector('#details_input').value;
  var date = document.querySelector('#date_input').value;
  dataset.addTransaction({
    amount: Math.abs(amount),
    origin: origin,
    destination: destination,
    details: details,
    date: date,
  });
  document.querySelector('#amount_input').value = '0';
  document.querySelector('#details_input').value = '';
  document.querySelector('#date_input').value = new Date().toISOString().slice(0, 10);
  rerender();
};
