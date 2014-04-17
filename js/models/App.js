var Backbone = require('backbone');

var WordWars = require('../collections/WordWars');
var log = require('bows')('AppModel');

module.exports = Backbone.Model.extend({
  collection: new WordWars(),

  initialize: function() {
    log('Initialized AppModel.');
    this.countdown = this.get('countdown');
    this.countdown.parent = this;
    this.goal = this.get('goal');
    this.goal.parent = this;
    log(JSON.stringify(this));
  },

  save: function() {
    window.localStorage.setItem('app', JSON.stringify(this));
  }
});