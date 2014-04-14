var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('SetGoal');

var validate = require('../util/validate');
var setgoal = require('../templates/setgoal.hbs');

module.exports = Backbone.View.extend({
  el: $('#app-goal'),

  events: {
    'click #setgoal': 'setGoal',
    'keypress #goal-input': 'onEnter',
    'keyup #goal-input': 'validateGoal'
  },

  onEnter: function(e) {
    if (e.keyCode === 13) { 
      e.preventDefault();
      if (!this.$button.prop('disabled')) {
        this.setGoal();
      }
    }
  },

  render: function() {
    this.$el.html(setgoal);
    this.$input = this.$('#goal-input');
    this.$form = this.$('#goal-form');
    this.$button = this.$('#setgoal');
  },

  setGoal: function() {
    this.model.set('words', parseInt(this.$input.val(), 10));
    this.model.parent.set('goalSet', true);
  },

  validateGoal: function() {
    var input = this.$input.val();
    if (validate.isPositiveNumber(input)) {
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