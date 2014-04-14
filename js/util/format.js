var d3 = require('d3');

var format = {
  words: function(n) {
    return d3.format(",")(n);
  }
};

module.exports = format;