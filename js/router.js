var Backbone = require('backbone');

var log = require('bows')('Router');

var WordCounts = require('./collections/WordCounts'),
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

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home',
    '*default': 'home'
  },

  home: function () {
    log('Home.');
    this.navigate('#home');
    if (window.localStorage.app) {
      log('Retrived app model from localStorage.');
      var storedApp = JSON.parse(window.localStorage.getItem('app'));
      appView = new AppView({
        collection: wordCounts,
        model: new AppModel({
          countdown: new Countdown(storedApp.countdown),
          countdownSet: storedApp.countdownSet,
          goal: new Goal(storedApp.goal),
          goalSet: storedApp.goalSet
        })
      });
    }
    else {
      log('Created new app model.');
      appView = new AppView({
        collection: wordCounts,
        model: new AppModel({
          countdown: new Countdown(),
          countdownSet: false,
          goal: new Goal(),
          goalSet: false
        })
      });
    }
    recordsView = new RecordsView({
      collection: wordCounts
    });
    progressView = new ProgressView({
      collection: wordCounts
    });
  }
});