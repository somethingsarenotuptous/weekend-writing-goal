var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('AddWarView');

var addwar = require('../templates/addwar.hbs');

module.exports = Backbone.View.extend({
  el: $('#app-wars'),

  remove: function() {
    this.undelegateEvents();
    this.$el.empty();
    this.stopListening();
  },

  render: function() {
    this.$el.html(addwar());
  }
});