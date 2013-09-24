/**
 * Created with JetBrains WebStorm.
 * User: zhaogang
 * Date: 13-9-2
 * Time: 上午11:30
 * To change this template use File | Settings | File Templates.
 */



module.exports = function (apps) {

//   读取用户从用户名称
    this.loadUserByID = function (id, callback)
    {
        apps.mongo.collection("account").find({ _id: id}).limit(1).toArray(function(err, docs) {
            if ((err == null) && (docs != null) && (docs.length != 0))  {
                callback(null, docs[0]);

            }
            else {
                callback(err, null);
            }
        });
    }

//    根据账户提供类型判断账户是否存在
    this.loadUserWithProv = function (prov, account, callback) {
        var where    = {};
        where[prov + 'id'] = account;
        apps.mongo.collection("account").find(where).limit(1).toArray(function(err, docs) {
            if ((err == null) && (docs != null) && (docs.length != 0))  {
                callback(null, docs[0]);
            }
            else {
                callback(err, null);
            }
        });
    }

    this.updateAccount = function (whwer, acc, save, callback)
    {
        var passwordHash = require('password-hash');
        if (acc.password)
            acc.password = passwordHash.generate(acc.password.replace(/(^\s*)|(\s*$)/g, ""));
        apps.mongo.collection("account").update(whwer, save ? acc : { $set: acc}, { upsert: save }, function (err) {
            if (err != null)
            {
                callback(err, false);
            }
            else
            {
                callback(null, true);
            }
        });
    }

    //    检查密码合法性
    this.checkPassword = function (password)
    {
        var ret = 1;
        if (password != null)
        {
            var newpass = password.replace(/(^\s*)|(\s*$)/g, "");

            if(! /^.{6,20}$/.test( newpass )) {
                ret = 2;
            }
            else {
                ret = 0;
            }
        }
        return ret;
    }

    this.isTelphone = function (username) {
        if (/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/.test(username)) {
            return true;
        }
        return false;
    }

    this.isMail = function (username) {
        if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(username)) {
            return true;
        }
        return false;
    }
    this.verifyPassword = function (password1, password2)
    {
        var passwordHash = require('password-hash');
        if ((password1 != null) &&
            (password2 != null) &&
            (passwordHash.verify(password1.replace(/(^\s*)|(\s*$)/g, ""), password2) == true))  {
            return true;
        }
        return false;
    }

    //    检验用户名合法性
    this.verifyUserName = function (username) {
        var ret = 0;
//        if( /^\d.*$/.test( username ) ){
//            ret = 1;
//        }
        if(!/^[\u4E00-\u9FA5\uf900-\ufa2d\w|.|@]{6,30}$/.test( username ) ){
            ret = 1;
        }
//        if(! /^[\w_]*$/.test( username ) ){
//            ret = 3;
//        }
//        if(! /^([a-z]|[A-Z])[\w_]{5,19}$/.test( username ) ){
//            ret = 4;
//        }

        return ret;
    }

}