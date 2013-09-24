/**
 * Created with JetBrains WebStorm.
 * User: zhaogang
 * Date: 13-9-9
 * Time: 上午11:49
 * To change this template use File | Settings | File Templates.
 */

module.exports = function (apps) {
    var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP", apps.config.smtp);

    this.mailer = nodemailer;
    this.smtp = smtpTransport;

}