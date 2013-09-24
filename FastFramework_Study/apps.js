/**
 * Created with JetBrains WebStorm.
 * User: zhaogang
 * Date: 13-9-2
 * Time: 上午10:14
 * To change this template use File | Settings | File Templates.
 */

var fs = require('fs'),
    express = require('express')
    , path = require('path');

module.exports = function apps(app) {
    this.mode = app.get('mode');
    console.log('mode: ' + this.mode);
    var config = require('../config/config');
    config = config[this.mode];
    this.config = config;
    console.log('config: ' + JSON.stringify(this.config, null, ' '));
    require('./datastore/mongo')(this, function (apps)
    {
    });
    this.crypto = require('crypto');
    var RedisStore = require('connect-redis')(express);

    var apps = this;
    apps.app = app;

    app.set('port', config.port || process.env.PORT || 3000);
    app.set('views', __dirname + '/../views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use( express.cookieParser(config.secretString));
    app.use(express.methodOverride());

    app.use(express.session({
        secret: config.secretString,
        maxAge: config.sessionMaxAge,
        store: new RedisStore({host: apps.config.redis.host, port: apps.config.redis.port, db: apps.config.redis.db})
    }));

    var passport = require('./passport');
    passport(apps);

    app.use(app.router);
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.errorHandler());

    var acount = require('./account');
    account = new acount(apps);
    apps.account = account;

    console.log('account: ' + JSON.stringify(account, null, ' '));

    var common = require('./common');
    common = new common(apps);
    apps.common = common;
    console.log('common: ' + JSON.stringify(common, null, ' '));

    var job = require('./job');
    apps.job = new job(apps);

    var routes_path = __dirname + '/routes';
    fs.readdirSync(routes_path).forEach(function(file) {
        require(routes_path + '/' + file)(app, apps);
    });
};