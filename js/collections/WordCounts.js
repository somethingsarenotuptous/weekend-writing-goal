var Backbone = require('backbone');
var _ = require('lodash', {expose: 'underscore'});
var LocalStorage = require('backbone.localstorage');

var log = require('bows')('WordCounts');

var WordCount = require('../models/WordCount');

module.exports = Backbone.Collection.extend({

  clear: function() {
    var toDestroy = [];
    // can't use this.each to actually remove models because it prematurely terminates
    // https://github.com/jashkenas/backbone/issues/2820
    this.each(function(model) {
      toDestroy.push(model);
    });
    _.each(toDestroy, function(model) {
      model.destroy();
    });
  },

  cumSum: function() {
    return this.pluck('words').reduce(function(num, sum) { return num + sum; });
  },

  initialize: function() {
    this.on('add', function(model) {
      model.save();
    });
  },

  model: WordCount,

  localStorage: new LocalStorage('wordWars')
});