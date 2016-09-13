var dailyBalanceChart = function() {
  return React.createElement(NVD3Chart, {
    id: 'yChart',
    type: 'stackedAreaChart',
    datum: [{
      key: 'NA',
      values: dataset.getDailyBalances('cash')
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
      yAxis: {axisLabel: 'Balance'}
    }
  });
}
