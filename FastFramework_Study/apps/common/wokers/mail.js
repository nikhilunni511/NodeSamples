/**
 * Created with JetBrains WebStorm.
 * User: zhaogang
 * Date: 13-9-9
 * Time: 下午2:54
 * To change this template use File | Settings | File Templates.
 */

module.exports = function (apps) {
    this.name = 'mail';

    this.worker = function (data, callback) {
        apps.common.mail.smtp.sendMail(data, function (err, res) {});
        callback(null, true);
    }
}