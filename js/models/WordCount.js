var Backbone = require('backbone');

var log = require('bows')('WordCountModel');

module.exports = Backbone.Model.extend({
  defaults: {
    'words': 0
  }
});