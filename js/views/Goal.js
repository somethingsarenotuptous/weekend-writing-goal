var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('GoalView');

var dt = require('../util/dateandtime');
var format = require('../util/format');
var goal = require('../templates/goal.hbs');

module.exports = Backbone.View.extend({
  el: $('#app-goal'),
  
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  remove: function() {
    this.undelegateEvents();
    this.$el.empty();
    this.stopListening();
  },

  render: function() {
    var end = this.model.parent.get('countdown').get('end');
    if (end) {
      this.model.set({
        'time': dt.goalEndTime(end),
        'date': dt.goalEndDate(end)
      });
      this.$el.html(goal({
        'time': this.model.get('time'),
        'date': this.model.get('date'),
        'words': format.words(this.model.get('words'))
      }));
    }
    else {
      this.$el.html(goal({
        'words': format.words(this.model.get('words'))
      }));
    }
  }
});