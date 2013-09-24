

module.exports = function (apps) {
    var count = 0;

    var error = require('./error');
    this.error = new error(apps);

    var steprunner = require('./steprunner');
    this.steprunner = steprunner;

    var mail = require("./mail");
    this.mail = new mail(apps);

    var userop = require("./userop");
    this.userop = new mail(userop);

    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                    ;
            });
        };
    }

    this.verifyCodeGeneretor = function ()
    {
        return parseInt(Math.random() * 10000).toString(6).substr(0, 6);
    }
    function IdGeneratorProvider(type, code)
    {
        var date = new Date();
        var ts = String(Math.round(date.getTime() / 1000) + date.getTimezoneOffset() * 60);
        var buffer = new Buffer(12);

        buffer.writeInt32BE(parseInt(ts), 0);
        buffer.writeInt16BE(count, 4);
        count++;
        buffer.writeInt16BE(parseInt(type), 8);
        buffer.writeInt16BE(parseInt(code), 10);

        return buffer.toString('hex');
    }

    function TokenGenerator(bytcount, callback)
    {
        apps.crypto.randomBytes(bytcount, function(ex, buf) {
            var token = buf.toString('hex');
            callback(null, token);
        });
    }
    this.idGenerator = function (type, code, callback)
    {
        var config = apps.config;

        if (config.idgeneratorprovider == true)
        {
            var id = IdGeneratorProvider(type, code);

            callback(null, id);
            return;
        }
        var rest = require('restler');

        rest.post(config.idgenerator, { data: { 'type': type, 'code' : code }}).on('complete', function(result) {
            if (result instanceof Error) {
                callback(result, null);

            } else {
                if (result.status && result.status.code && (result.status.code == 0))
                {
                    callback(null, result.id);
                }
                else
                {
                    callback(result.status, null);
                }
            }
        });
    }

    this.typeWithId = function(id)
    {
        var buffer = new Buffer(id, 'hex');
        return buffer.readInt16BE(8);
    }

    this.codeWithId = function(id)
    {
        var buffer = new Buffer(id, 'hex');
        return buffer.readInt16BE(10);
    }
}
