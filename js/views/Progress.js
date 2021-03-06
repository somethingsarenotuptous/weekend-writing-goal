var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('lodash', {expose: 'underscore'});
Backbone.$ = $;
var d3 = require('d3');

var log = require('bows')('ProgressView');

var format = require('../util/format');
var progress = require('../templates/progress.hbs');
var report = require('../templates/report.hbs');

module.exports = Backbone.View.extend({
  el: $('#app-goal'),

  events: {
    'resize': 'updateGraph'
  },

  HEIGHT: 60,

  initialize: function() {
    log('Initialized ProgressView.');
    this.windowModel = this.model.get('windowModel');
    this.listenTo(this.windowModel, 'change:width', this.updateGraph);
    this.listenTo(this.collection, 'add', this.update);
    this.listenTo(this.collection, 'remove', this.update);
    this.listenTo(this.model, 'change:goalSet', this.updateOnGoalSet);
    this.render();
  },

  PAD: 10,

  remove: function() {
    this.undelegateEvents();
    this.$el.empty();
    this.stopListening();
  },

  render: function() {
    log('Rendered ProgressView.');
    this.$el.append(progress());
    this.$container = this.$('#graphcontainer');
    this.$report = this.$('#progressreport');
    this.svg = d3.select('#graphcontainer')
      .insert('svg', '#progressreport')
      .attr({
        'x': 0,
        'y': 0,
        'height': this.HEIGHT
      });
    this.svg.append('rect')
      .attr({
        'x': 0,
        'y': 0,
        'rx': this.PAD,
        'ry': this.PAD,
        'height': this.HEIGHT,
        'fill': 'white',
        'class': 'd3-rect-outline'
      });
    if (this.collection.size() > 0) {
      this.updateGraph();
      this.updateReport();
    }
    return this;
  },

  reshape: function() {
    var data = this.collection.toJSON();
    var inside = _.map(data, function(d, i) {
      var shaped = {};
      shaped.x = d.id;
      shaped.y = d.words;
      return [shaped];
    });
    return inside;
  },

  stack: function(data) {
    return d3.layout.stack()(data);
  },

  update: function() {
    this.updateGraph();
    this.updateReport();
  },

  updateGraph: function() {
    log('Updating graph...');
    if (!this.$('#graphcontainer').is('div')) {
      this.render();
    }
    this.svg.selectAll('.d3-rect-group').remove();

    var goalSet = this.model.get('goalSet');
    // if no word counts record *or* no word count goal set
    // don't render the graph
    if (!this.collection.size() || !goalSet) {
      this.$container.toggleClass('hidden', true);
      return;
    }
    this.$container.toggleClass('hidden', false);
    this.svg.attr({
      'width': this.$container.width()
      })
      .select('.d3-rect-outline')
      .attr({
        'width': this.$container.width(),
      });

    var xScale = d3.scale.linear()
      .domain([0, this.model.get('goal').get('words')])
      .range([this.PAD, this.$container.width() - this.PAD]);

    var colors = d3.scale.ordinal()
      .domain(this.collection.pluck('id'))
      .range(colorbrewer.Paired[10]);

    var data = this.stack(this.reshape()).reverse();

    var rectGroups = this.svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'd3-rect-group');

    var rects = rectGroups.selectAll('rect')
      .data(function(d) { return d; })
      .enter()
      .append('rect')
      .attr({
        'x': function(d) {
          return xScale(d.y0); },
        'y': this.PAD,
        'rx': 5,
        'ry': 5,
        'width': function(d) { return xScale(d.y); },
        'height': this.HEIGHT - this.PAD*2,
        'fill': function(d) { return colors(d.x); },
        'class': 'd3-rect-words'
      });
  },

  updateOnGoalSet: function() {
    if (this.model.get('goalSet')) {
      this.render().updateGraph();
    }
    else {
      this.$container.toggleClass('hidden', true);
    }
  },

  updateReport: function() {
    var currentSum = this.collection.cumSum();
    var currentPercent = format.percent(currentSum / this.model.get('goal').get('words'));
    currentPercent = currentPercent.replace('.0%', '%');
    this.$report.html(report({'sum': currentSum, 'percent': currentPercent}));
  }
});