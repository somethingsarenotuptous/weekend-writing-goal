var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('lodash', {expose: 'underscore'});
Backbone.$ = $;

var RecordView = require('./Record');

var log = require('bows')('RecordsView');

module.exports = Backbone.View.extend({
  addRecord: function(record) {
    this.toggleColOffset();
    var view = new RecordView({model: record});
    this.$el.prepend(view.render().el);
    view.$el.toggleClass('col-md-offset-3', true);
  },

  el: $('#app-records'),

  initialize: function() {
    log('Initalized RecordsView.');
    this.listenTo(this.collection, 'add', this.addRecord);
    this.listenTo(this.collection, 'remove', this.newOffsets);
    this.collection.fetch({error: function() { log(arguments); }});
  },

  newOffsets: function() {
    _.each(this.$el.children(), function(child, i) {
      if (i % 2 !== 0) {
        $(child).toggleClass('col-md-offset-3', false);
      }
      else {
        $(child).toggleClass('col-md-offset-3', true);
      }
    });
  },

  render: function() {
    log('Rendered RecordsView.');
    this.$el.html();
  },

  toggleColOffset: function() {
    _.each(this.$el.children(), function(child) {
      $(child).toggleClass('col-md-offset-3');
    });
  }
});