/**
 * Created with JetBrains WebStorm.
 * User: zhaogang
 * Date: 13-9-2
 * Time: 下午3:04
 * To change this template use File | Settings | File Templates.
 */
module.exports = function(app, apps) {
    if (apps.config.idgeneratorprovider == true)
    {
        app.post('/api/idgenerator', function (req, res) {
            apps.common.idGenerator(req.body.type, req.body.code, function(err, rdata) {
                if (rdata) {
                    res.send({ status: apps.common.error.errOk(), id : rdata});
                }
                else {
                    res.send({ status: err});
                }
            });
        });
        app.get('/auth/qq', apps.passport.authenticate('qq', {
            failureRedirect: '/signin'
        }), function (req, res) {
            res.render("signin");
        });
        app.get('/auth/qq/callback', apps.passport.authenticate('qq', {
            failureRedirect: '/signin'
        }), function (req, res) {
            res.send("signin callback");
        });

        app.get('/signin', function (req, res) {
            console.log('query', req.query);
            console.log('body', req.body);
            console.log('sina', req.session);
            res.send('signin');
        });

        app.get('/', apps.passport.authenticate('sina', {
            failureRedirect: '/signin'
            ,state: "test"
        }), function (req, res) {
            console.log('query', req.query);
            console.log('body', req.body);
            console.log('sina', req.session);
            res.send('ok');
        });
        //Setting the twitter oauth routes
        app.get('/auth/sina', apps.passport.authenticate('sina', {
            failureRedirect: '/signin'
            ,state: "test"
        }), function (req, res) {
            res.send("signin");
        });
        app.get('/auth/sina/callback', apps.passport.authenticate('sina', {
            failureRedirect: '/signin'
        }), function (req, res) {
            res.send("signin callback");
        });
    }
}