var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('Router');

var AppView = require('./views/App'),
  WordCounts = require('./collections/WordCounts'),
  AddWords = require('./views/AddWords'),
  AddWordsModel = require('./models/AddWords'),
  AppModel = require('./models/App'),
  appView, wordCounts, modalView;

var Countdown = Backbone.Model.extend({}), Goal = Backbone.Model.extend({});

wordCounts = new WordCounts();
modalView = new AddWords({
  collection: wordCounts,
  model: new AddWordsModel()
});

if (window.localStorage.app) {
  log('Retrived app model from localStorage.');
  var storedApp = JSON.parse(window.localStorage.getItem('app'));
  appView = new AppView({model: new AppModel({
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
    model: new AppModel({
      countdown: new Countdown(),
      countdownSet: false,
      goal: new Goal(),
      goalSet: false
    })
  });
}

module.exports = Backbone.Router.extend({
  routes: {
    '*home': 'home'
  },

  home: function () {
    log('Home.');
    appView.modalView = modalView;
    appView.render();
  }
});