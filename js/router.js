var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var log = require('bows')('Router');

var WordCounts = require('./collections/WordCounts'),
  AddWords = require('./views/AddWords'),
  AddWordsModel = require('./models/AddWords'),
  AppView = require('./views/App'),
  AppModel = require('./models/App'),
  WarsView = require('./views/Wars'),
  appView, wordCounts, modalView;

var Countdown = Backbone.Model.extend({}), Goal = Backbone.Model.extend({});

wordCounts = new WordCounts();
wordCounts.fetch();
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
if (window.localStorage.wordWars) {
  log('Retrieved word counts collection from localStorage.');
  warsView = new WarsView({
    collection: wordCounts
  });
}

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home'
  },

  home: function () {
    log('Home.');
    this.navigate('#home');
    appView.modalView = modalView;
    appView.render();
  }
});