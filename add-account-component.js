var showAddAccountDialog = function() {
  uiData.accountId = 'bawagpsk'
  uiData.addAccount.active = true;
  rerender();
};

var AccountDropdown = React.createClass({
  displayName: 'AccountDropdown',
  render: function() {
  var that = this;
    return React.createElement(
      'select', {
        value: uiData.addAccount.type,
        onChange: function(event) {
          uiData.addAccount.type = event.target.value;
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
        'div', {}, 'Adding new ', konto.csvImportConfig[uiData.addAccount.type].name, ' account'),
      React.createElement('div', {}, 'Account name: ',
        React.createElement('input', {
          onChange: function(event) {
            uiData.addAccount.name = event.target.value;
            this.setState({value: event.target.value});
          },
          value: konto.csvImportConfig[uiData.addAccount.type].name
        })
      ),
      React.createElement('div', {}, 'Account id: ',
        React.createElement('input', {
          onChange: function(event) {
            uiData.accountId = event.target.value;
            this.setState({value: event.target.value});
          },
          value: uiData.addAccount.type
        })
      )
    ),
    React.createElement('div', {},
      React.createElement('button',
        {
          onClick: function() {
            uiData.addAccount.active = false;
            rerender();
          }
        },
        'Cancel'
      ),
      React.createElement('button',
        {
          onClick: function() {
            dataset.addAccount({
              id: uiData.accountId,
              name: uiData.addAccount.name,
              accountType: uiData.addAccount.type
            });
            uiData.addAccount.active = false;
            rerender();
          }
        },
        'OK'
      )
    )
  )
};
