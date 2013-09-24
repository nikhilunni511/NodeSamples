var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
    development: {
        port: 80,
        idgenerator : "http://localhost:3000/api/idgenerator",
        idgeneratorprovider : true,
        secretString:"faskframework",
        sessionMaxAge: 60000,
        redis: {
            host: 'localhost',
            port: '6379',
            db: 'redis'
        },
        smtp: {
            service: "Gmail",
            auth: {
                user: "gangzhao0116@gmail.com",
                pass: "YuZhao123"
            }
        },
        mails: {
            form: "Gang Zhao ✔ <gangzhao0116@gmail.com>",
            changePassword: {
                title: '检验码',
                text: '校验码:{0}',
                html: '<html><head>哈哈</head><body>校验码:<p>{0}</p></body></html>'
            }
        },
        mongodb: 'mongodb://localhost/mean-dev',
        root: rootPath,
        app: {
            name: 'MEAN - A Modern Stack - Development'
        },
        facebook: {
            clientID: "APP_ID",
            clientSecret: "APP_SECRET",
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        twitter: {
            clientID: "CONSUMER_KEY",
            clientSecret: "CONSUMER_SECRET",
            callbackURL: "http://localhost:3000/auth/twitter/callback"
        },
        github: {
            clientID: 'APP_ID',
            clientSecret: 'APP_SECRET',
            callbackURL: 'http://localhost:3000/auth/github/callback'
        },
        google: {
            clientID: "APP_ID",
            clientSecret: "APP_SECRET",
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        sina: {
            clientID: "2347116809",
            clientSecret: "78306897820bdaf5c45b340faead534b",
            callbackURL: "http://www.wxxr.com.cn"
        },
        qq: {
            clientID: "100484346",
            clientSecret: "c92f4b6e85073d02c1d95d1a25395d77",
            callbackURL: "http://www.qq.com"
        }
    },
    test: {
        idGenerator : "http://localhost:3000/api/idgenerator",
        idGeneratorProvider : true,
        db: 'mongodb://localhost/mean-test',
        root: rootPath,
        app: {
            name: 'MEAN - A Modern Stack - Test'
        },
        facebook: {
            clientID: "APP_ID",
            clientSecret: "APP_SECRET",
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        twitter: {
            clientID: "CONSUMER_KEY",
            clientSecret: "CONSUMER_SECRET",
            callbackURL: "http://localhost:3000/auth/twitter/callback"
        },
        github: {
            clientID: 'APP_ID',
            clientSecret: 'APP_SECRET',
            callbackURL: 'http://localhost:3000/auth/github/callback'
        },
        google: {
            clientID: "APP_ID",
            clientSecret: "APP_SECRET",
            callbackURL: "http://localhost:3000/auth/google/callback"
        }
    },
    production: {
        idGenerator : "http://localhost:3000/api/idgenerator",
        idGeneratorProvider : true,
        db: 'mongodb://localhost/mean',
        root: rootPath,
        app: {
            name: 'MEAN - A Modern Stack - Production'
        },
        facebook: {
            clientID: "APP_ID",
            clientSecret: "APP_SECRET",
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        twitter: {
            clientID: "CONSUMER_KEY",
            clientSecret: "CONSUMER_SECRET",
            callbackURL: "http://localhost:3000/auth/twitter/callback"
        },
        github: {
            clientID: 'APP_ID',
            clientSecret: 'APP_SECRET',
            callbackURL: 'http://localhost:3000/auth/github/callback'
        },
        google: {
            clientID: "APP_ID",
            clientSecret: "APP_SECRET",
            callbackURL: "http://localhost:3000/auth/google/callback"
        }
    }
};