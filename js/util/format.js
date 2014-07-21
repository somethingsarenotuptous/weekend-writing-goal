var d3 = require('d3');
var moment = require('moment');

var format = {
  words: function(n) {
    return d3.format(",")(n);
  },

  nowString: function() {
    return moment().format('ddd, MMM Do (YYYY), h:mm a');
  },

  percent: function(n) {
    return d3.format('.1%')(n);
  }
};

module.exports = format;