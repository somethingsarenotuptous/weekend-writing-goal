var $ = require('jquery');
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
    log('Initialized CountdownView.');
    // unset the clock to start because we don't want to render the stale clock string
    this.model.set({
      'clock': dt.millisecondsToClock(dt.getMillisecondsDiff(this.model.get('start'), this.model.get('end')))
    });
    this.listenTo(this.model, 'change:clock', this.render);
    this.startCountdown(this.model.get('start'));
  },

  remove: function() {
    this.undelegateEvents();
    this.$el.empty();
    this.stopListening();
  },

  render: function() {
    var start = this.model.get('start');
    var beforeWeekend = dt.beforeWeekend(start);
    var weekendBefore = dt.weekendBefore(start);
    var withinTwoDays = dt.withinTwoDays(start);
    var text, tail = '';
    if (beforeWeekend) {
      text = 'Goal starts in';
    }
    else if (weekendBefore && withinTwoDays) {
      text = 'Goal ends in';
    }
    else {
      text = 'Last goal ended';
      tail = 'ago';
    }
    this.$el.html(countdown({
      'text': text,
      'clock': this.model.get('clock'),
      'goalSet': this.model.parent.get('goalSet'),
      'tail': tail
    }));
    this.$clock = this.$('#countdownclock');
    if (beforeWeekend) {
      this.$clock.toggleClass('text-info', true);
    }
    else if (weekendBefore && withinTwoDays) {
      this.$clock.toggleClass('text-danger', true);
    }
    else {
      this.$clock.toggleClass('text-info', true);
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
      'clock': dt.millisecondsToClock(dt.getMillisecondsDiff(this.model.get('start'), this.model.get('end')))
    });
  }
});