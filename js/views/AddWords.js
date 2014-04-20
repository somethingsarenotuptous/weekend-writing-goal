var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('AddWordsView');
var format = require('../util/format');
var validate = require('../util/validate');

var WordCount = require('../models/WordCount');

var addwords = require('../templates/addwords.hbs');

module.exports = Backbone.View.extend({
  saveWords: function(e) {
    log('Saved new word count.');
    var type = this.model.get('wordsType');
    var input = this.$('#' + type + 'wordsinput').val();
    this.collection.add(new WordCount({
      'type': type,
      'words': parseInt(input, 10),
      'timestamp': format.nowString()
    }));
    this.render();
  },

  className: 'row',

  events: {
    'click button': 'saveWords',
    'keyup #warwordsinput': 'validateWords',
    'keypress #warwordsinput': 'onEnter',
    'keyup #otherwordsinput': 'validateWords',
    'keypress #otherwordsinput': 'onEnter'
  },

  initialize: function() {
    this.render();
  },

  onEnter: function(e) {
    if (e.keyCode === 13) { 
      e.preventDefault();
      var button = this.$('form').has('#' + $(e.target).attr('id')).find('button');
      if (!button.prop('disabled')) {
        this.saveWords();
      }
    }
  },

  render: function() {
    log('Rendered AddWordsView');
    this.$el.html(addwords());
    this.$('#warwordsinput').focus();
  },

  setWordsType: function(id) {
    var type = (id.indexOf('other') === -1) ? 'war' : 'other';
    this.model.set('wordsType', type);
  },

  validateWords: function(e) {
    var inputEl = $(e.target);
    var inputId = inputEl.attr('id');
    this.setWordsType(inputId);
    var input = inputEl.val();
    var form = this.$('form').has('#' + inputId);
    var button = form.find('button');
    if (validate.isPositiveNumber(input)) {
      form.removeClass('has-error');
      form.removeClass('has-warning');
      form.addClass('has-success');
      button.prop('disabled', false);
    }
    else if (validate.hasLength(input)){
      form.removeClass('has-error');
      form.addClass('has-warning');
      button.prop('disabled', true);
    }
    else {
      form.removeClass('has-warning');
      form.addClass('has-error');
      button.prop('disabled', true);
    }
  }
});