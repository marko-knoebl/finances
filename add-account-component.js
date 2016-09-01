var showAddAccountDialog = function() {
  uiData.accountId = 'bawagpsk'
  uiData.addAccountActive = true;
  rerender();
};

var AccountDropdown = React.createClass({
  displayName: 'AccountDropdown',
  render: function() {
  var that = this;
    return React.createElement(
      'select', {
        value: uiData.addAccountType,
        onChange: function(event) {
          uiData.addAccountType = event.target.value;
          uiData.accountId = event.target.value;
          rerender();
        }
      },
      konto.csvImportConfigIds.map(function(configId) {
        return React.createElement('option', {value: configId},
          konto.csvImportConfig[configId].name
        )
      })
    );
  }
});

var addBankAccountUi = function(accountList, callback) {
  return React.createElement('div', {style: {border: '1px solid black'}},
    React.createElement(AccountDropdown),
    React.createElement('div', {},
      React.createElement(
        'div', {}, 'Adding new ', konto.csvImportConfig[uiData.addAccountType].name, ' account'),
      React.createElement('div', {}, 'Account name: ',
        React.createElement('input', {
          onChange: function(event) {
            uiData.accountName = event.target.value;
            this.setState({value: event.target.value});
          },
          value: konto.csvImportConfig[uiData.addAccountType].name
        })
      ),
      React.createElement('div', {}, 'Account id: ',
        React.createElement('input', {
          onChange: function(event) {
            uiData.accountId = event.target.value;
            this.setState({value: event.target.value});
          },
          value: uiData.addAccountType
        })
      )
    ),
    React.createElement('div', {},
      React.createElement('button',
        {
          onClick: function() {
            uiData.addAccountActive = false;
            rerender();
          }
        },
        'Cancel'
      ),
      React.createElement('button',
        {
          onClick: function() {
            dataset.addAccount({id: uiData.accountId, name: uiData.accountName});
            uiData.addAccountActive = false;
            rerender();
          }
        },
        'OK'
      )
    )
  )
};
