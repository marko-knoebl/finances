var inverseBalances = function(balanceList) {
  return balanceList.map(function(element) {
    return {date: element.date, balance: -element.balance}
  });
};

var dailyBalanceChart = function() {
  return React.createElement(NVD3Chart, {
    type: 'lineChart',
    datum: [{
      key: 'Total assets',
      values: inverseBalances(dataset.getDailyBalances('world'))
    }],
    x: function(d) {return new Date(d.date)},
    y: 'balance',
    options: {
      xAxis: {
        tickFormat: function(dateString) {
          return d3.time.format('%Y-%m-%d')(new Date(dateString))
        },
        axisLabel: 'Date'
      },
      yAxis: {
        tickFormat: d3.format('.2f'),
        axisLabel: 'Balance'
      }
    }
  });
}
