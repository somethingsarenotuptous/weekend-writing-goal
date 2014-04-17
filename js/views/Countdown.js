var $ = require('jquery');
var _ = require('lodash', {expose: 'underscore'});
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('CountdownView');

var countdown = require('../templates/countdown.hbs');
var dt = require('../util/dateandtime');

module.exports = Backbone.View.extend({
  el: $('#app-countdown'),

  events: {
    'click #resetcountdown': 'resetCountdown',
    'click #changegoal': 'changeGoal'
  },

  changeGoal: function() {
    var goal = this.model.parent.get('goal');
    goal.unset('words');
    this.model.parent.set('goalSet', false);
  },

  initialize: function() {
    // unset the clock to start because we don't want to render the stale clock string
    this.model.unset('clock');
    this.listenTo(this.model, 'change:clock', this.render);
    this.startCountdown(this.model.get('start'));
  },

  remove: function() {
    this.undelegateEvents();
    this.$el.empty();
    this.stopListening();
  },

  render: function() {
    var before = dt.beforeWeekend(this.model);
    this.$el.html(countdown({
      'verb': before ? 'starts' : 'ends',
      'clock': this.model.get('clock'),
      'goalSet': this.model.parent.get('goalSet')
    }));
    if (before) {
      this.$el.toggleClass('before', true);
    }
    else {
      this.$el.toggleClass('after', true);
    }
  },

  resetCountdown: function() {
    this.model.clear();
    var goal = this.model.parent.get('goal');
    goal.clear();
    this.model.parent.set('countdownSet', false);
    this.model.parent.set('goalSet', false);
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