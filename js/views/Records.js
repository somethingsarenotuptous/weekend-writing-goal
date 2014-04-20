var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('lodash', {expose: 'underscore'});
Backbone.$ = $;

var RecordView = require('./Record');

var log = require('bows')('RecordsView');

module.exports = Backbone.View.extend({
  addAll: function() {
    this.collection.each(this.addRecord);
  },

  addRecord: function(record) {
    var view = new RecordView({model: record});
    this.$el.append(view.render().el);
    if (this.count % 2 === 0) {
      view.$el.toggleClass('col-md-offset-3');
    }
    this.incrementCount();
  },
  
  decrementCount: function() {
    this.count -=1;
  },

  incrementCount: function() {
    this.count +=1;
  },

  el: $('#app-records'),

  initialize: function() {
    log('Initalized RecordsView.');
    this.listenTo(this.collection, 'add', this.addRecord);
    this.listenTo(this.collection, 'remove', this.toggleColOffset);

    this.count = 0;
    
    this.collection.fetch();
  },

  render: function() {
    this.$el.html();
  },

  toggleColOffset: function() {
    _.each(this.$el.children(), function(child, i) {
      if (i % 2 === 0) {
        $(child).toggleClass('col-md-offset-3', true);
      }
      else {
        $(child).toggleClass('col-md-offset-3', false);
      }
    });
    this.decrementCount();
  }
});