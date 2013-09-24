

module.exports = function (apps) {
    this.errOk = function() {
        return {
            code: 0,
            codeString: "成功"
        };
    };
    this.errUnkown = function() {
        return {
            code: -1,
            codeString: "未知错误"
        };
    };
    this.errDatabaseUpdate = function(err) {
        return {
            code: -2,
            codeString: "数据库错误：数据更新不成功",
            error: err
        };
    };
    this.errIdGenerator = function() {
        return {
            code: -3,
            codeString: "无法产生ID号码！"
        };
    };
    this.errSession = function() {
        return {
            code: -4,
            codeString: "无法产生Session信息！"
        };
    };
    this.errSession = function() {
        return {
            code: -5,
            codeString: "没有授权登陆"
        };
    };
    this.errSendMesage = function() {
        return {
            code : -6,
            codeString : "发送消息失败"
        };
    };

}
