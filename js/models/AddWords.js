var Backbone = require('backbone');

var log = require('bows')('AddWordsModel');

module.exports = Backbone.Model.extend({
  defaults: {
    'addType': null
  }
});