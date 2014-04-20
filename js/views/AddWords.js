var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var validate = require('../util/validate');
var WordCount = require('../models/WordCount');

var log = require('bows')('AddWordsModal');

module.exports = Backbone.View.extend({
  el: '#app-modal',

  events: {
    'click #modalsave': 'onSave',
    'keypress #wordsinput': 'onEnter',
    'keyup #wordsinput': 'validateWords'
  },

  initialize: function() {
    this.$input = this.$('#wordsinput');
    this.$form = this.$('#wordsform');
    this.$button = this.$('#modalsave');
  },

  onEnter: function(e) {
    if (e.keyCode === 13) { 
      e.preventDefault();
    }
  },

  onSave: function() {
    log('Saved new word count.');
    this.collection.add(new WordCount({
      'type': this.model.get('addType'),
      'words': parseInt(this.$input.val(), 10)
    }));
  },

  validateWords: function() {
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