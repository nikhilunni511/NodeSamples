var LocalStrategy = require('passport-local').Strategy,
//    TwitterStrategy = require('passport-twitter').Strategy,
//    FacebookStrategy = require('passport-facebook').Strategy,
//    GitHubStrategy = require('passport-github').Strategy,
//    GoogleStrategy = require('passport-google-oauth').Strategy,
    SinaStrategy = require('passport-sina'),
    QqStrategy = require('passport-qq').Strategy
    ;


module.exports = function(apps) {

    var config = apps.config;
    var passport = require('passport');

    apps.passport = passport;

    apps.app.use(passport.initialize());
    apps.app.use(passport.session());

    //Serialize sessions
    passport.serializeUser(function(user, done) {
        console.log('serializeUser: ' + user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        console.log('deserializeUser: ' + id);
        apps.account.user.loadUserByID(id, function (err, rdata) {
            done(err, rdata);
        })
    });

    function doneWithFind(err, rdata) {
        if (!rdata) {

            return done(apps.account.error.errUserNoExist(), null);
        }
        if (apps.account.user.verifyPassword(username, rdata.password) != true) {
            return done(apps.account.error.errPasswordVerify(), null);
        }
        return done(null, rdata);
    }
    function ProvProc(prov, accessToken, refreshToken, profile, done) {
        console.log('accessToken: ' + accessToken);

        if (accessToken && profile && profile.id) {
            apps.account.binded3ThirdAccount({}, accessToken, profile, prov, done);
        }
        else {
            done(apps.account.error.err3ThiyInfo(prov), null);
        }
    }
    //Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function(username, password, done) {
            apps.account.user.loadUserByID(id, doneWithFind);
        }
    ));

    passport.use(new QqStrategy({
            clientID: config.qq.clientID,
            clientSecret: config.qq.clientSecret,
            callbackURL: config.qq.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            ProvProc('qq', accessToken, refreshToken, profile, done);
        }
    ));

    passport.use(new SinaStrategy({
                clientID: config.sina.clientID
                , clientSecret: config.sina.clientSecret
                , callbackURL: config.sina.callbackURL
//  , requireState: false
//  , scope: ['statuses_to_me_read'
//          , 'follow_app_official_microblog']
            },
            function(accessToken, refreshToken, profile, done) {
                ProvProc('sina', accessToken, refreshToken, profile, done);
            }
        ));

//    //Use twitter strategy
//    passport.use(new TwitterStrategy({
//            consumerKey: config.twitter.clientID,
//            consumerSecret: config.twitter.clientSecret,
//            callbackURL: config.twitter.callbackURL
//        },
//        function(token, tokenSecret, profile, done) {
//            User.findOne({
//                'twitter.id': profile.id
//            }, function(err, user) {
//                if (err) {
//                    return done(err);
//                }
//                if (!user) {
//                    user = new User({
//                        name: profile.displayName,
//                        username: profile.username,
//                        provider: 'twitter',
//                        twitter: profile._json
//                    });
//                    user.save(function(err) {
//                        if (err) console.log(err);
//                        return done(err, user);
//                    });
//                } else {
//                    return done(err, user);
//                }
//            });
//        }
//    ));
//
//    //Use facebook strategy
//    passport.use(new FacebookStrategy({
//            clientID: config.facebook.clientID,
//            clientSecret: config.facebook.clientSecret,
//            callbackURL: config.facebook.callbackURL
//        },
//        function(accessToken, refreshToken, profile, done) {
//            User.findOne({
//                'facebook.id': profile.id
//            }, function(err, user) {
//                if (err) {
//                    return done(err);
//                }
//                if (!user) {
//                    user = new User({
//                        name: profile.displayName,
//                        email: profile.emails[0].value,
//                        username: profile.username,
//                        provider: 'facebook',
//                        facebook: profile._json
//                    });
//                    user.save(function(err) {
//                        if (err) console.log(err);
//                        return done(err, user);
//                    });
//                } else {
//                    return done(err, user);
//                }
//            });
//        }
//    ));
//
//    //Use github strategy
//    passport.use(new GitHubStrategy({
//            clientID: config.github.clientID,
//            clientSecret: config.github.clientSecret,
//            callbackURL: config.github.callbackURL
//        },
//        function(accessToken, refreshToken, profile, done) {
//            User.findOne({
//                'github.id': profile.id
//            }, function(err, user) {
//                if (!user) {
//                    user = new User({
//                        name: profile.displayName,
//                        email: profile.emails[0].value,
//                        username: profile.username,
//                        provider: 'github',
//                        github: profile._json
//                    });
//                    user.save(function(err) {
//                        if (err) console.log(err);
//                        return done(err, user);
//                    });
//                } else {
//                    return done(err, user);
//                }
//            });
//        }
//    ));
//
//    //Use google strategy
//    passport.use(new GoogleStrategy({
//            consumerKey: config.google.clientID,
//            consumerSecret: config.google.clientSecret,
//            callbackURL: config.google.callbackURL
//        },
//        function(accessToken, refreshToken, profile, done) {
//            User.findOne({
//                'google.id': profile.id
//            }, function(err, user) {
//                if (!user) {
//                    user = new User({
//                        name: profile.displayName,
//                        email: profile.emails[0].value,
//                        username: profile.username,
//                        provider: 'google',
//                        google: profile._json
//                    });
//                    user.save(function(err) {
//                        if (err) console.log(err);
//                        return done(err, user);
//                    });
//                } else {
//                    return done(err, user);
//                }
//            });
//        }
//    ));
};