var MongoClient = require('mongodb').MongoClient;


module.exports = function(apps, callback)
{
    var config = apps.config;
    MongoClient.connect(config.mongodb
        , function(err, db) {
            apps.mongo = db;
            callback(apps);
        });
}
