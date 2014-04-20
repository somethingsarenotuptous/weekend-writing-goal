var Backbone = require('backbone');
var LocalStorage = require('backbone.localstorage');

var log = require('bows')('WordWarModel');

var WordCount = require('../models/WordCount');

module.exports = Backbone.Collection.extend({
  model: WordCount,

  localStorage: new LocalStorage('wordWars')
});