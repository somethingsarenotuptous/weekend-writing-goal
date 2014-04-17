var Backbone = require('backbone');
var LocalStorage = require('backbone.localstorage');

var log = require('bows')('WordWarModel');

var WordWar = require('../models/WordWar');

module.exports = Backbone.Collection.extend({
  model: WordWar,

  localStorage: new LocalStorage('wordWars')
});