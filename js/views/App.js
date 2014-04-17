var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('AppView');

var Countdown = require('./Countdown'),
  SetCountdown = require('./SetCountdown'),
  Goal = require('./Goal'),
  SetGoal = require('./SetGoal');

module.exports = Backbone.View.extend({
  el: $('#app'),

  initialize: function() {
    log('Initialized AppView.');
    // store the app model in localStorage
    this.model.save();

    // set the countdown or create the countdown view
    if (this.model.get('countdownSet')) {
      this.countdownView = new Countdown({model: this.model.countdown});
    }
    else {
      this.countdownView = new SetCountdown({model: this.model.countdown});
    }
    this.listenTo(this.model, 'change:countdownSet', this.updateCountdown);
    
    // set the goal or create the goal view
    if (this.model.get('goalSet')) {
      this.goalView = new Goal({model: this.model.goal});
    }
    else {
      this.goalView = new SetGoal({model: this.model.goal});
    }
    this.listenTo(this.model, 'change:goalSet', this.updateGoal);
  },

  render: function() {
    log('Rendered AppView.');
    this.countdownView.render();
    this.goalView.render();
  },

  updateCountdown: function() {
    log('Updated countdown.');
    this.model.save();
    if (this.model.get('countdownSet')) {
      this.countdownView = new Countdown({model: this.model.countdown});
      // Countdown doesn't need manually rendered
      // triggered through initialize
    }
    else {
      this.countdownView.remove();
      this.countdownView = new SetCountdown({model: this.model.countdown});
      // SetCountdown needs manually rendered
      this.countdownView.render();
    }
  },

  updateGoal: function() {
    log('Updated goal.');
    if (this.model.get('goalSet')) {
      this.goalView = new Goal({model: this.model.goal});
      // countdownView needs rendered as well, because Change Goal button
      this.render();
      this.model.save();
    }
    else {
      this.goalView.remove();
      this.goalView = new SetGoal({model: this.model.goal});
      // countdownView needs rendered as well, because Change Goal button
      this.render();
    }
  }
});