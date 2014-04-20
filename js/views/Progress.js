var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var d3 = require('d3');

var log = require('bows')('ProgressView');

var progress = require('../templates/progress.hbs');

module.exports = Backbone.View.extend({
  el: $('#app-goal'),

  initialize: function() {
    log('Initialized ProgressView.');
    this.listenTo(this.collection, 'add', this.updateGraph);
    this.listenTo(this.collection, 'remove', this.updateGraph);
    this.render();
  },

  remove: function() {
    this.undelegateEvents();
    this.$el.empty();
    this.stopListening();
  },

  render: function() {
    log('Rendered ProgressView.');
    this.$el.append(progress());
  },

  updateGraph: function() {
    log('Updating graph...');
  }
});