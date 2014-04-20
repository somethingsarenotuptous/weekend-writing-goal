var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('RecordView');

var record = require('../templates/record.hbs');

module.exports = Backbone.View.extend({
  deleteRecord: function() {
    log('Deleted a words record.', JSON.stringify(this.model));
    this.model.destroy();
  },

  events: {
    'click .close': 'deleteRecord'
  },

  initialize: function() {
    log('Initialized a RecordView.')
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  remove: function() {
    // TODO: necessary?
    this.stopListening();
    this.undelegateEvents();
    this.$el.remove();
  },

  render: function() {
    log('Rendered a RecordView.');
    this.$el.html(record(this.model.toJSON()));
    var baseClass = 'well well-sm col-xs-12 col-sm-6 col-md-3';
    this.$el.addClass(baseClass);
    return this;
  },

  tagName: 'div'
});