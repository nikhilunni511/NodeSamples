
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
    app.set('mode', process.env.NODE_ENV || 'development');

  var apps = require('./apps/apps');
  apps = new apps(app);
  app.set('apps', apps);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
