

module.exports = function (apps) {
    this.name = 'userop';

    this.worker = function (data, callback) {
        apps.common.userop.add(data, function(err, data) {});
        callback(null, true);
    }
}
