var moment = require('moment');

var validate = require('./validate');

var dateandtime = {
  formats: validate.expectedFormats,

  beforeWeekend: function(start) {
    var now = moment();
    return now.isBefore(moment(start));
  },

  countdownStart: function(s) {
    return moment(s, this.formats, true).toISOString();
  },

  countdownEnd: function(s) {
    return moment(s, this.formats, true).add('days', 2).toISOString();
  },

  getMillisecondsDiff: function(ISODateString) {
    var now = moment();
    return Math.abs(now.diff(ISODateString));
  },

  goalEndTime: function(ISODateString) {
    return moment(ISODateString).format('h a');
  },

  goalEndDate: function(ISODateString) {
    return moment(ISODateString).format('MMMM Do, YYYY');
  },

  millisecondsToClock: function(m) {
    var hrs = Math.floor(m / this.MS_IN_HOUR);
    var min = Math.floor((m % this.MS_IN_HOUR) / this.MS_IN_MIN);
    var sec = Math.floor(((m % this.MS_IN_HOUR) % this.MS_IN_MIN) / 1000);
    return hrs + ' hrs, ' + min + ' min, and ' + sec + ' sec';
  },

  weekendBefore: function(start) {
    var now = moment();
    return moment(start).isBefore(now);
  },

  withinTwoDays: function(start) {
    var now = moment();
    return now.isBefore(moment(start).add('days', 2));
  },

  MS_IN_HOUR: 3600000,

  MS_IN_MIN: 60000
};

module.exports = dateandtime;