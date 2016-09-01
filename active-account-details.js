// for now, pass contents of uiData (like activeAccount),
// don't pass contents of dataset
// TODO: decision to be revisited
var activeAccountDetails = function(activeAccount) {
  var activeAccountObject = dataset.getAccount({id: activeAccount});
  var accountType = activeAccountObject.accountType;
  var csvImportPossible = konto.csvImportConfig.hasOwnProperty(accountType);
  var activateImport = function() {
    uiData.importActive = accountType;
    rerender();
  };
  return React.createElement(
    'div', {}, 
    React.createElement('div', {}, 'id: '+activeAccountObject.id),
    csvImportPossible ? React.createElement('button', {onClick: activateImport}, 'Import CSV') : '',
    uiData.importActive ? csvImportForm(uiData.importActive) : ''
  );
};

var csvImportForm = function(accountId) {
  return React.createElement('form', {},
    React.createElement('div', {},
      'Import from a ', dataset.getAccount({id: accountId}).accountType, ' CSV file'),
    React.createElement('label', {'for': 'current_balance_input'}, 'Current balance:'),
    React.createElement('input', {type: 'number', step: '0.01', id: 'current_balance_input'}),
    React.createElement('br'),
    React.createElement('input', {type: 'file', id: 'csv_input'}),
    React.createElement('button', {
        type: 'button',
        onClick: function() {loadCsvFile(accountId)}
      },
      'Load CSV'
    )
  );
};

var loadCsvFile = function(accountId) {
  var csvFile = document.querySelector('#csv_input').files[0];
  var currentBalance = parseFloat(document.querySelector('#current_balance_input').value);
  var encoding = konto.csvImportConfig[uiData.importActive].encoding;
  var reader = new FileReader();
  reader.onload = function(event) {
    var transactionData = konto.csvToKonto(event.target.result, uiData.importActive);
    transactionData.forEach(function(transaction) {
      if (transaction.amount < 0) {
        transaction.origin = accountId;
        transaction.destination = 'world';
        transaction.amount = Math.abs(transaction.amount);
      } else {
        transaction.origin = 'world';
        transaction.destination = accountId;
      }
      dataset.addTransaction(transaction);
    });
    dataset.setCurrentAccountBalance(accountId, currentBalance);
    uiData.importActive = '';
    rerender();
  };
  reader.readAsText(csvFile, encoding);
};
