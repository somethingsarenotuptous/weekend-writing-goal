var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('AppView');

var Countdown = require('./Countdown'),
  SetCountdown = require('./SetCountdown'),
  Goal = require('./Goal'),
  SetGoal = require('./SetGoal'),
  AddWords = require('./AddWords');

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
    this.render();
    this.setState();
  },

  render: function() {
    log('Rendered AppView.');
    this.countdownView.render();
    this.goalView.render();
  },

  resetWordCounts: function() {
    this.collection.clear();
  },

  setState: function() {
    if (this.model.get('goalSet') && this.model.get('countdownSet')) {
      var AddWordsModel = Backbone.Model.extend({});
      this.addWordsView = new AddWords({
        model: new AddWordsModel(),
        collection: this.collection
      });
      $('#write-or-die').hide();
      this.$('#app-addwords-outer').append(this.addWordsView.$el);
      this.$('#warwordsinput').focus();
    }
    else if (this.addWordsView) {
      this.addWordsView.remove();
      $('#write-or-die').show();
    }
  },

  updateCountdown: function() {
    log('Updated countdown.');
    this.model.save();
    if (this.model.get('countdownSet')) {
      this.countdownView = new Countdown({model: this.model.countdown});
      // Countdown doesn't need manually rendered
      // triggered through initialize
      this.goalView.render();
      if (!this.model.get('goalSet')) {
        this.$('#goalinput').focus();
      }
    }
    else {
      this.resetWordCounts();
      this.countdownView.remove();
      this.countdownView = new SetCountdown({model: this.model.countdown});
      // SetCountdown needs manually rendered
      this.countdownView.render();
    }
    this.setState();
  },

  updateGoal: function() {
    log('Updated goal.');
    this.model.save();
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
    this.setState();
  }
});