var Backbone = require('backbone');
var _ = require('lodash', {expose: 'underscore'});

var bows = require('bows');
var log = bows('Router');

var WindowModel, WordCounts = require('./collections/WordCounts'),
  AppView = require('./views/App'),
  AppModel = require('./models/App'),
  RecordsView = require('./views/Records'),
  ProgressView = require('./views/Progress'),
  appView, wordCounts, recordsView;

var Countdown = Backbone.Model.extend({}), Goal = Backbone.Model.extend({});

wordCounts = new WordCounts();

if (window.localStorage.wordWars) {
  log('Retrieved word counts collection from localStorage.');
}

// window.onload taken from this stackoverflow answer (third set of responses)
// http://stackoverflow.com/questions/9110060/how-do-i-add-a-resize-event-to-the-window-in-a-view-using-backbone
window.onload = function() {
  _.extend(window, Backbone.Events);
  window.onresize = function() {
    var log = bows('WindowModel');
    log('Window resized!');
    window.trigger('resize');
  };

  WindowModel = Backbone.Model.extend({
    initialize: function() {
      log('Initialized WindowModel.');
      this.listenTo(window, 'resize', _.debounce(this.setSize));
    },

    setSize: function() {
      this.set({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  });

  var windowModel = new WindowModel();
  var appModel;
  if (window.localStorage.app) {
    log('Retrived app model from localStorage.');
    var storedApp = JSON.parse(window.localStorage.getItem('app'));
    appModel = new AppModel({
      countdown: new Countdown(storedApp.countdown),
      countdownSet: storedApp.countdownSet,
      goal: new Goal(storedApp.goal),
      goalSet: storedApp.goalSet,
      windowModel: windowModel
    });
    appView = new AppView({
      collection: wordCounts,
      model: appModel
    });
  }
  else {
    log('Created new app model.');
    appModel = new AppModel({
      countdown: new Countdown(),
      countdownSet: false,
      goal: new Goal(),
      goalSet: false,
      windowModel: windowModel
    });
    appView = new AppView({
      collection: wordCounts,
      model: appModel
    });
  }
  recordsView = new RecordsView({
    collection: wordCounts
  });
  progressView = new ProgressView({
    collection: wordCounts,
    model: appModel
  });
};

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home',
    '*default': 'home'
  },

  home: function () {
    log('Home.');
    this.navigate('#home');
  }
});