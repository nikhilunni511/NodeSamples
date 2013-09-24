

module.exports = function (apps) {
    this.type = 100;
    var user = require('./user');
    this.user = new user(apps);

    var error = require('./error');
    this.error = new error(apps);

    this.requiresLogin = function(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.send(apps.common.error.errSession(), 401);
        }
        next();
    };

    //用户注册
    this.userRegister = function (clientInfo, acc, callback) {
        var ret = 0;
        var type = (typeof(acc.type) != 'undefined') ? acc.type : 0;
        acc.type = type;
        if (typeof (acc.username) == 'undefined') {
            callback(apps.account.error.errUserNull(), null);
            return;
        }
        acc.username = acc.username.trim();
        acc.password = acc.password.trim();
        apps.account.user.loadUserWithProv('name', acc.username, function (err, rdata) {
            if (!rdata) {
                ret = apps.account.user.checkPassword(acc.password);
                if (ret == 0) {
                     ret = apps.account.user.verifyUserName(acc.username);
                    if (ret == 0) {
                        apps.common.idGenerator(apps.account.type, type, function (err, rdata) {
                            if (rdata != null) {
                                acc._id = rdata;
                                acc.nameid = acc.username;
                                apps.account.user.updateAccount({_id: acc._id}, acc, true, function (err, rdata) {
                                    if (rdata == true) {
                                        apps.account.getUserStatusInfoByUser(clientInfo, acc, callbck);
                                    }
                                    else {
                                        callback(apps.common.error.errDatabaseUpdate(), null);
                                    }
                                });
                            }
                            else {
                                callback(apps.common.error.errIdGenerator(), null);
                            }
                        });
                    }
                    else {
                        callback(apps.account.error.errUserInvalid(ret), null);
                    }
                }
                else {
                    callback(apps.account.error.errPasswordInvalid( ret), null);
                }
            }
            else {
                callback(apps.account.error.errUserExist(), null);
            }

        });
    }

    this.getUserStatusInfoByUser = function (clientInfo, user, callback) {
        var ret = { user : user, ret: {}};

        if (apps.account.user.isTelphone(user.username) == true) {
            ret.ret.accountType = 'tel';
        }
        else if (apps.account.user.isMail(user.username) == true) {
            ret.ret.accountType = 'mail';
        }
//        TODO:处理用户返回信息
//        TODO:处理设备信息

        callback(null, ret);
    }

    //登录
    this.userLogin = function (clientInfo, username, password, callback)
    {
        function verifyPassword(rdata) {
            if (apps.account.user.verifyPassword(password, rdata.password) == true) {
                apps.account.getUserStatusInfoByUser(clientInfo, rdata, callbck);
            }
            else {
                callback(apps.account.error.errPasswordVerify(), null);
            }
        }
        apps.account.user.loadUserWithProv('name', username, function (err, rdata) {
            if (rdata) {
                verifyPassword(rdata);
            }
            else {
                apps.account.user.loadUserWithProv('tel', username, function (err, rdata) {
                    if (rdata) {
                        verifyPassword(rdata);
                    }
                    else {
                        apps.account.user.loadUserWithProv('mail', username, function (err, rdata) {
                            if (rdata) {
                                verifyPassword(rdata);
                            }
                            else {
                                callback(apps.account.error.errUserNoExist(), null);
                            }
                        });
                    }
                });
            }
        } );
    }

    function userLoginWithProv (clientInfo, prov, accessToken, callback) {
        apps.passport._strategy(prov).userProfile(accessToken, function (err, profile) {
            if (profile) {
                apps.account.binded3ThirdAccount(clientInfo, accessToken, profile, "sina", function (err, acc) {
                    apps.account.getUserStatusInfoByUser(clientInfo, acc, callback);
                });
            }
            else {
                var status = apps.account.error.err3ThiyInfo(prov);
                status.error = err;
                callback(status, null);
            }
        })
    }

    function userBindWithProv (prov, user, accessToken, callback) {
        apps.passport._strategy(prov).userProfile(accessToken, function (err, profile) {
            if (profile) {
                apps.account.user.loadUserWithProv(prov, username, function (err, rdata) {
                    if (!rdata || (rdata._id == user._id)) {
                        var acc = { };
                        acc[prov] = { 'profile' : profile, "accessToken" : accessToken };
                        acc[prov + 'id'] =  profile.id;
                        apps.account.user.updateAccount({_id: user._id}, acc, false, function (err, rdata) {
                            if (rdata == true) {
                                done(null, acc);
                            }
                            else {
                                done(apps.common.error.errDatabaseUpdate(), null);
                            }
                        });
                    }
                    else {
                        callback(apps.account.error.errBindExist(prov, rdata.username), null);
                    }
                });
            }
            else {
                var status = apps.account.error.err3ThiyInfo(prov);
                status.error = err;
                callback(status, null);
            }
        })
    }

    this.binded3ThirdAccount = function (clientInfo, accessToken, profile, prov, done) {
        apps.account.user.loadUserWithProv(prov, profile.id, function (err, rdata) {
            if (rdata) {
                done(null, rdata);
            }
            else {
                apps.common.idGenerator(apps.account.type, 0, function (err, rdata) {
                    if (rdata) {
                        var acc = { type: 0};
                        acc[prov] = { 'profile' : profile, "accessToken" : accessToken };
                        acc[prov + 'id'] =  profile.id;
                        acc._id = rdata;
                        acc.username = profile.nickname ? profile.nickname : (profile.screen_name ? profile.screen_name : profile.name);
                        apps.account.user.updateAccount({_id: acc._id}, acc, true, function (err, rdata) {
                            if (rdata == true) {
                                done(null, acc);
                            }
                            else {
                                done(apps.common.error.errDatabaseUpdate(), null);
                            }
                        });
                    }
                    else {
                        done(apps.common.error.errIdGenerator(), null);
                    }
                });
            }
        })
    }

    this.userLoginWithSina = function (clientInfo, accessToken, callback) {
        userLoginWithProv(clientInfo, 'sina', accessToken, callback);
    }

    this.userLoginWithQq = function (clientInfo, accessToken, callback) {
        userLoginWithProv(clientInfo, 'qq', accessToken, callback);
    }

    this.bindWithSina = function (user, accesstoken, callback) {
        userBindWithProv('sina', user, accesstoken, callback);
    }

    this.bindWithQq = function (user, accesstoken, callback) {
        userBindWithProv('qq', user, accesstoken, callback);
    }

    function userBindWithProvAndVerify(prov, user, username, callback) {
        apps.account.user.loadUserWithProv(prov, username, function (err, rdata) {
            if (rdata) {
                callback(apps.account.error.errBindExist(prov, rdata.username), null);
            }
            else {
                var prop = prov + 'bind';
                if (!user[prop])
                    user[prop] = {};
                user[prop].name = username;
                user[prop].code = apps.common.verifyCodeGeneretor();
                user[prop].date = Date.now();
                if (!user[prop].count)
                    user[prop].count = 1;
                else
                    user[prop].count = user[prop].count + 1;
                var acc = {  };
                acc[prop] = user[prop];
                apps.account.user.updateAccount({_id: user._id}, acc, false, function (err, rdata) {
                    if (rdata == true) {
                        callback(null, user[prop].code);
                    }
                    else {
                        callback(apps.common.error.errDatabaseUpdate(err), null);
                    }
                });
            }
        });
    }

    this.bindWithTel = function (user, tel, callback) {
        if (!tel || apps.account.user.isTelphone(tel) != true) {
            callback(apps.account.error.errTel(), null);
        }
        else
            userBindWithProvAndVerify('tel', user, tel, callback);
    }

    this.bindWithMail = function (user, mail, callback) {
        if (!mail || apps.account.user.isMail(mail) != true) {
            callback(apps.account.error.errMail(), null);
        }
        else
        userBindWithProvAndVerify('mail', user, mail, callback);
    }

    function bindVerifyCode(prov, user, verifyCode, callback) {
        var prop = prov + 'bind';

        if (!user[prop] || !user[prop].code|| (user[prop].code != verifyCode)) {
            callback(apps.account.error.errVerifyCode(prov, user.username), null);
        }
        else {
            var acc = {};
            acc[prop] = {};
            acc[prov + 'id'] = user[prov + 'id'] = user[prop].name;
            acc[prop].date = user[prop].date = Date.now();
            acc[prop].status = user[prop].status = 'done';
            apps.account.user.updateAccount({_id: user._id}, acc, false, function (err, rdata) {
                if (rdata == true) {
                    callback(null, true);
                }
                else {
                    done(apps.common.error.errDatabaseUpdate(), null);
                }
            });
        }
    }

    this.bindVerifyTelCode = function(user, verifyCode, callback) {
        bindVerifyCode('tel', user, verifyCode, callback);
    }

    this.bindVerifyMailCode = function(user, verifyCode, callback) {
        bindVerifyCode('mail', user, verifyCode, callback);
    }

    this.userSignout = function (user, callback) {
        callback(null, true);
    }

    this.changePassword = function(user, prov, newpassword, callback) {
        var nRet = apps.account.user.checkPassword(newpassword);
        if (nRet != 0) {
            callback(apps.account.error.errPasswordInvalid(nRet), null);
            return;
        }
        var prop = 'changePasword';
        var acc = {}
        acc[prop] = {};
        acc[prop].date = Date.now();
        acc[prop].status = 'requesting';
        acc[prop].code = apps.common.verifyCodeGeneretor();
        acc[prop].password = newpassword;
        acc[prop].prov = prov;

        console.log('1');

        function update (err, rdata) {
            if (!err) {
                apps.account.user.updateAccount({_id: user._id}, acc, false, function (err, rdata) {
                    if (rdata == true) {
                        user[prop] = acc[prop];
                        callback(null, acc[prop].code);
                    }
                    else {
                        callback(apps.common.error.errDatabaseUpdate(), null);
                    }
                });
            }
            else {
                var status = apps.common.error.errSendMesage();
                status.error = err;
                callback(status, null);
            }
        }
        if ((!prov && user['telid']) || ((prov == 'tel') && user['telid'])) {
            update(null, true);
        }
        else   if ((!prov && user['mailid']) || ((prov == 'mail') && user['mailid'])) {
            console.log("send mail");
            apps.job.push('mail', {
                from: apps.config.mails.form, // sender address
                to: user['mailid'], // list of receivers
                subject: apps.config.mails.changePassword.title ? apps.config.mails.changePassword.title.format(user.username) : null, // Subject line
                text: apps.config.mails.changePassword.text ? apps.config.mails.changePassword.text.format(acc[prop].code) : null, // plaintext body
                html: apps.config.mails.changePassword.html ? apps.config.mails.changePassword.text.format(acc[prop].code) : null // html body
            }, update);
        }
        else {
            callback(apps.account.error.errNoProv, null);
        }
    }

    this.verifyChangePassword = function(user, verifyCode, callback) {
        var name = user[prov + 'id'];
        var prop = 'changePasword';
        if (!name || !user[prop]  || !user[prop].code || !user[prop].status || !user[prop].password || (user[prop].status != 'requesting')) {
            callback(apps.account.error.errNoChangePassword(), null);
            return;
        }
        if (user[prop].code != verifyCode) {
            callback(apps.account.error.errVerifyCode(), null)
            return;
        }
        var acc = {}
        acc[prop] = {};
        acc[prop].date = Date.now();
        acc[prop].status = 'done';
        acc[prop].prov = user[prop].prov;
        acc.password = user[prop].password;
        user[prop] = acd[prop];
        apps.account.user.updateAccount({_id: user._id}, acc, false, function (err, rdata) {
            if (rdata == true) {
                callback(null, true);
            }
            else {
                callback(apps.common.error.errDatabaseUpdate(), null);
            }
        });
    }

};
