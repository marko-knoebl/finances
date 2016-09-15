var inverseBalances = function(balanceList) {
  return balanceList.map(function(element) {
    return {date: element.date, balance: -element.balance}
  });
};

var filterPoints = function(points) {
  if (points.length < 150) {
    return points;
  }
  var newPoints = points.filter(function(element, index, array) {
    if (index === 0 || index === points.length-1) {
      return true;
    }
    if (Math.abs(points[index].balance - points[index+1].balance) > 50 ||
        Math.abs(points[index-1].balance - points[index].balance) > 50) {
      return true;
    } else {
      return false;
    }
  });
  return newPoints;
};

var dailyBalanceChart = function() {
  return React.createElement(NVD3Chart, {
    type: 'lineChart',
    datum: [{
      key: 'Total assets',
      values: filterPoints(inverseBalances(dataset.getDailyBalances('world')))
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
