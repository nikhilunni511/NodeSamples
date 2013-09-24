


module.exports = function (apps) {
    this.errUserExist = function() {
        return {
            code: 1000002,
            codeString: "用户已存在"
        };
    };
    this.errUserInvalid = function(subcode) {
        if (subcode == 1)
        {
            return {
                code : 1000003,
                subCode : subcode,
                codeString : "用户名非法:格式不正确，不能包含特殊字符，长度6 - 30个字符"
            };
        }
        else if (subcode == 2)
        {
            return {
                code : 1000003,
                subCode : subcode,
                codeString : "用户名非法:字符长度有误，合法长度为6-20个字符"
            };
        }
        else if (subcode == 3)
        {
            return {
                code : 1000003,
                subCode : subcode,
                codeString : "用户名非法:含有非法字符，用户名只能包含_,英文字母，数字"
            };
        }

        return {
            code : 1000003,
            subCode : subcode,
            codeString : "用户名非法:格式不正确，用户名只能包含_,英文字母，数字"
        };
    };
    this.errPasswordInvalid = function(subcode) {
        if (subcode == 1)
        {
            return {
                code : 1000004,
                subCode : subcode,
                codeString : "密码非法:密码不能为空"
            };
        }

        return {
            code : 1000004,
            subCode : subcode,
            codeString : "密码非法:密码长度有误，合法长度为6-20个字符"
        };
    };

    this.errUserNull = function() {
        return {
            code : 1000005,
            codeString : "用户名不能为空"
        };
    };
    this.errUserNoExist = function() {
        return {
            code : 1000006,
            codeString : "该用户不存在"
        };
    };
    this.errPasswordVerify = function() {
        return {
            code : 1000007,
            codeString : "密码错误"
        };
    };
    this.err3ThiyInfo = function(prov) {
        return {
            code : 1000009,
            codeString : "第三方登录<" + prov + ">，信息错误"
        };
    };
    this.errBindExist = function(prov, username) {
        return {
            code : 1000010,
            codeString : "该<" + prov + ">绑定关系已经绑定在用户：" + username + "上，不能重复绑定"
        };
    };
    this.errVerifyCode = function(prov) {
        return {
            code : 1000011,
            codeString : "检验码错误"
        };
    };
    this.errTel = function() {
        return {
            code : 1000012,
            codeString : "手机号不正确"
        };
    };
    this.errMail = function() {
        return {
            code : 1000012,
            codeString : "mail号不正确"
        };
    };
    this.errNoChangePassword = function() {
        return {
            code : 1000013,
            codeString : "之前没有更改密码的请求"
        };
    };
    this.errNoProv = function() {
        return {
            code : 1000014,
            codeString : "没有绑定任何手机或邮箱"
        };
    };


}
