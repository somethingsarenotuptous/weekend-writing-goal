var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
window.localStorage.debug = true;

var log = require('bows')('App');

var Router = require('./router');
var router = new Router();

log('Started app.');

$('body').on('click', '.back-button', function(event) {
    event.preventDefault();
    window.history.back();
});

Backbone.history.start();