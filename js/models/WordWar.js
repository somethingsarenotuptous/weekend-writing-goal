var Backbone = require('backbone');

var log = require('bows')('WordWarModel');

module.exports = Backbone.Model.extend({
  defaults: {
    'wordCount': 0
  }
});