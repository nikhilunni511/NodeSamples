/**
 * Created with JetBrains WebStorm.
 * User: zhaogang
 * Date: 13-9-9
 * Time: 下午3:52
 * To change this template use File | Settings | File Templates.
 */


module.exports = function (apps) {
    this.add = function (data, callback) {
        apps.mongo.collection("userop").find({_id : d}, data, { upsert: save }, function (err) {
            if (err != null) {
                callback(err, false);
            }
            else {
                callback(null, true);
            }
        });
    }

    this.procCallback = function (type, query, err, callback) {
        if (callback && !err)
        {
        }
    }
}