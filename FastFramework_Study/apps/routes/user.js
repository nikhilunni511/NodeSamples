

module.exports = function(app, apps) {
    app.get('/api/login/userregister', function (req, res) {
        apps.account.userRegister({}, req.query, function (err, rdata) {
            apps.common.userop.procCallback('userregister', req.query, err, rdata);
            if (rdata) {
                req.logIn(rdata.user, null, function (err, user) {
                    if (!err)
                        res.send({ status: apps.common.error.errOk(), userInfo :rdata.ret });
                    else {
                        var ret = { status: apps.common.error.errSession()};
                        ret.status.error = err;
                        res.send(ret);
                    }

                });
            }
            else
                res.send({status : err});
        });
    });
    app.get('/api/login/userlogin', function (req, res) {
        apps.account.userLogin({}, req.query.username, req.query.password, function (err, rdata) {
            apps.common.userop.procCallback('userlogin', req.query, err, rdata);
            if (rdata) {
                req.logIn(rdata.user, null, function (err, user) {
                    if (!err)
                        res.send({ status: apps.common.error.errOk(), userInfo :rdata.ret });
                    else {
                        var ret = { status: apps.common.error.errSession()};
                        ret.status.error = err;
                        res.send(ret);
                    }

                });
            }
            else
                res.send({status: err});
        });
    });
    app.get('/api/login/sinalogin', function (req, res) {
        apps.account.userLoginWithSina({}, req.query.accessToken, function (err, rdata) {
            apps.common.userop.procCallback('sinalogin', req.query, err, rdata);
            if (rdata) {
                req.logIn(rdata.user, null, function (err, user) {
                    if (!err)
                        res.send({ status: apps.common.error.errOk(), userInfo :rdata.ret });
                    else {
                        var ret = { status: apps.common.error.errSession()};
                        ret.status.error = err;
                        res.send(ret);
                    }
                });
            }
            else
                res.send({status: err});
        });
    });

    app.get('/api/login/qqlogin', function (req, res) {
        apps.account.userLoginWithQq({}, req.query.accessToken, function (err, rdata) {
            apps.common.userop.procCallback('qqlogin', req.query, err, rdata);
            if (rdata) {
                req.logIn(rdata.userid, null, function (err, user) {
                    if (!err)
                        res.send({ status: apps.common.error.errOk(), userInfo :rdata.ret });
                    else {
                        var ret = { status: apps.common.error.errSession()};
                        ret.status.error = err;
                        res.send(ret);
                    }
                });
            }
            else
                res.send({status: err});
        });
    });
    app.get('/api/login/sinabind', apps.account.requiresLogin, function (req, res) {
        apps.account.bindWithSina(req.user, req.query.accessToken, function (err, rdata) {
            apps.common.userop.procCallback('sinabind', req.query, err, rdata);
            if (rdata) {
                res.send({ status: apps.common.error.errOk() });
            }
            else
                res.send({status: err});
        });
    });
    app.get('/api/login/qqbind', apps.account.requiresLogin, function (req, res) {
        apps.account.bindWithQq(req.user, req.query.accessToken, function (err, rdata) {
            apps.common.userop.procCallback('qqbind', req.query, err, rdata);
            if (rdata) {
                res.send({ status: apps.common.error.errOk() });
            }
            else
                res.send({status: err});
        });
    });
    app.get('/api/login/telbind', apps.account.requiresLogin, function (req, res) {
        apps.account.bindWithTel(req.user, req.query.tel, function (err, rdata) {
            apps.common.userop.procCallback('telbind', req.query, err, rdata);
            if (rdata) {
                res.send({ status: apps.common.error.errOk(), code: rdata });
            }
            else
                res.send({status: err});
        });
    });
    app.get('/api/login/mailbind', apps.account.requiresLogin, function (req, res) {
        apps.account.bindWithMail(req.user, req.query.mail, function (err, rdata) {
            apps.common.userop.procCallback('mailbind', req.query, err, rdata);
            if (rdata) {
                res.send({ status: apps.common.error.errOk(), code: rdata });
            }
            else
                res.send({status: err});
        });
    });
    app.get('/api/login/telverifycode', apps.account.requiresLogin, function (req, res) {
            apps.account.bindVerifyTelCode(req.user, req.query.verifyCode, function (err, rdata) {
            apps.common.userop.procCallback('telverifycode', req.query, err, rdata);
            if (rdata) {
                res.send({ status: apps.common.error.errOk() });
            }
            else
                res.send({status: err});
        });
    });
    app.get('/api/login/mailverifycode', apps.account.requiresLogin, function (req, res) {
        apps.account.bindVerifyMailCode(req.user, req.query.verifyCode, function (err, rdata) {
            apps.common.userop.procCallback(userregister, req.query, err, rdata);
            if (rdata) {
                res.send({ status: apps.common.error.errOk() });
            }
            else
                res.send({status: err});
        });
    });
    app.get('/api/login/signout', apps.account.requiresLogin, function (req, res) {
        apps.account.userSignout(req.user, function (err, rdata) {
            apps.common.userop.procCallback('signout', null, err, rdata);
            if (rdata) {
                req.logOut();
                res.send({ status: apps.common.error.errOk() });
            }
            else
                res.send({status: err});
        });
    });
    app.get('/api/login/changepassword', apps.account.requiresLogin, function (req, res) {
        apps.account.changePassword(req.user, req.query.prov, req.query.password, function (err, rdata) {
            apps.common.userop.procCallback('changepassword', req.query, err, rdata);
            if (rdata) {
                res.send({ status: apps.common.error.errOk(), code: rdata });
            }
            else
                res.send({status: err});
        });
    });
    app.get('/api/login/verifychangepassword', apps.account.requiresLogin, function (req, res) {
        apps.account.verifyChangePassword(req.user, req.query.verifyCode, function (err, rdata) {
            apps.common.userop.procCallback('verifychangepassword', req.query, err, rdata);
            if (rdata) {
                res.send({ status: apps.common.error.errOk()});
            }
            else
                res.send({status: err});
        });
    });

}