var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('WarsView');

var war = require('../templates/war.hbs');

module.exports = Backbone.View.extend({
  el: $('#app-wars'),

  initialize: function() {
    log('Initalized WarsView.');
    log(this.collection.size(), 'items in word counts collection.');
  }
});