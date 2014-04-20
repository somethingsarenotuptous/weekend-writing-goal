var Backbone = require('backbone');
var LocalStorage = require('backbone.localstorage');

var log = require('bows')('WordCountsCollection');

var WordCount = require('../models/WordCount');

module.exports = Backbone.Collection.extend({

  initialize: function() {
    this.on('add', function(model) {
      model.save();
    });
  },

  model: WordCount,

  localStorage: new LocalStorage('wordWars')
});