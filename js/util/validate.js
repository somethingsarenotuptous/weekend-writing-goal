var moment = require('moment');

var validate = {
  expectedFormats: ['MM-DD H A', 'M-DD H A', 'MM-D H A', 'M-D H A'],

  hasLength: function(s) {
    if (s.length > 0) {
      return true;
    }
    else {
      return false;
    }
  },

  isTimestamp: function(s) {
    var d = moment(s, this.expectedFormats, true);
    if (d.isValid()) {
      return true;
    }
    else {
      return false;
    }
  },

  isPositiveNumber: function(s) {
    var n = parseInt(s, 10);
    if (typeof n === 'number') {
      if (n > 0) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }
};

module.exports = validate;