var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('AddWordsModal');

module.exports = Backbone.View.extend({
  el: '#app-modal',

  events: {
    'click #modalsave': 'onSave'
  },

  onSave: function() {
    log('Clicked save in modal.');
  }
});