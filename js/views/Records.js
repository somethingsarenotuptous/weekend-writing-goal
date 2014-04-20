var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var RecordView = require('./Record');

var log = require('bows')('RecordsView');

module.exports = Backbone.View.extend({
  allAll: function() {
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

  incrementCount: function() {
    this.count +=1;
  },

  el: $('#app-records'),

  initialize: function() {
    log('Initalized RecordsView.');
    this.listenTo(this.collection, 'add', this.addRecord);
    this.listenTo(this.collection, 'reset', this.addAll);

    this.count = 0;
    
    this.collection.fetch();
  },

  render: function() {
    this.$el.html();
  }
});