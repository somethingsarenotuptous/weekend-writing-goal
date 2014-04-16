var $ = require('jquery');
var _ = require('lodash', {expose: 'underscore'});
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('CountdownView');

var countdown = require('../templates/countdown.hbs');
var dt = require('../util/dateandtime');

module.exports = Backbone.View.extend({
  el: $('#app-countdown'),

  initialize: function() {
    this.model.bind('change:clock', _.bind(this.render, this));
    this.startCountdown(this.model.get('start'));
  },

  render: function() {
    var before = dt.beforeWeekend(this.model);
    this.$el.html(countdown({
      'verb': before ? 'starts' : 'ends',
      'clock': this.model.get('clock')
    }));
    if (before) {
      this.$el.toggleClass('before', true);
    }
    else {
      this.$el.toggleClass('after', true);
    }

  },

  startCountdown: function(start) {
    var that = this;
    setInterval(function() { that.updateClock(); }, 1000);
  },

  updateClock: function() {
    this.model.set({
      'clock': dt.millisecondsToClock(dt.getMillisecondsDiff(this.model.get('start')))
    });
  }
});