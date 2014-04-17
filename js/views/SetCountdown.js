var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('SetCountdown');

var validate = require('../util/validate');
var dt = require('../util/dateandtime');
var setcountdown = require('../templates/setcountdown.hbs');

module.exports = Backbone.View.extend({
  el: $('#app-countdown'),

  events: {
    'click #setcountdown': 'setCountdown',
    'keypress #countdowninput': 'onEnter',
    'keyup #countdowninput': 'validateInput',
    'click #changegoal': 'changeGoal'
  },

  changeGoal: function() {
    var goal = this.model.parent.get('goal');
    goal.unset('words');
    this.model.parent.set('goalSet', false);
  },

  onEnter: function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (!this.$button.prop('disabled')) {
        this.setCountdown();
      } 
    }
  },

  render: function() {
    this.$el.html(setcountdown({
      'goalSet': this.model.parent.get('goalSet')
    }));
    this.$form = this.$('#countdownform');
    this.$input = this.$('#countdowninput');
    this.$button = this.$('#setcountdown');
  },

  setCountdown: function() {
    this.model.set('start', dt.countdownStart(this.$input.val()));
    this.model.set('end', dt.countdownEnd(this.$input.val()));
    this.model.parent.set('countdownSet', true);
  },

  validateInput: function() {
    var input = this.$input.val();
    if (validate.isTimestamp(input)) {
      this.$form.removeClass('has-error');
      this.$form.removeClass('has-warning');
      this.$form.addClass('has-success');
      this.$button.prop('disabled', false);
    }
    else if (validate.hasLength(input)){
      this.$form.removeClass('has-error');
      this.$form.addClass('has-warning');
      this.$button.prop('disabled', true);
    }
    else {
      this.$form.removeClass('has-warning');
      this.$form.addClass('has-error');
      this.$button.prop('disabled', true);
    }
  }
});