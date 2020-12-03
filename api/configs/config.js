/**
 * Project          : Evaluation
 * Module           : Configuration
 * Source filename  : config.js
 * Description      : Environment related configuration variables
 * Author           : Likhitha M 
 * Copyright        : Copyright © 2019, Evaluation
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */

"use strict";

var _ = require("lodash");

var config = {
    local: {
        mongo: {
            dbURL: process.env.MONGO_URL,
            options: {
            },
        },
        root: require("path").normalize(__dirname + "/.."),
        host: process.env.HOST || "http://localhost",
        port: process.env.PORT || 3000,

        passwordSecret: process.env.PASSWORD_SECRET,
        jwtTokenSecret : process.env.JWT_SECRET,
        tokenExpiry : 60
     
       
    },

    development: {
        mongo: {
            dbURL: "mongodb://localhost:27017/weather-app",
            options: {
            },
        },
        root: require("path").normalize(__dirname + "/.."),
        host: process.env.HOST || "http://localhost",
        port: process.env.PORT || 3000,

        passwordSecret: process.env.PASSWORD_SECRET,
        jwtTokenSecret : process.env.JWT_SECRET,
        tokenExpiry : 60
     
    },

    staging: {
        mongo: {
            dbURL: "mongodb://localhost:27017/weather-app",
            options: {
            },
        },
        root: require("path").normalize(__dirname + "/.."),
        host: process.env.HOST || "http://localhost",
        port: process.env.PORT || 3000,

        passwordSecret: process.env.PASSWORD_SECRET,
        jwtTokenSecret : process.env.JWT_SECRET,
        tokenExpiry : 60
        
       
    },
    production: {
        mongo: {
            dbURL: process.env.MONGO_URL,
            options: {
                db: {
                    native_parser: true
                },
                user: process.env.MONGODBAuthUser,
                pass: process.env.MONGODBAuthPass,
                auth: {
                    authdb: "admin"
                }
            },
        },
        root: require("path").normalize(__dirname + "/.."),
        host: process.env.HOST || "http://localhost",
        port: process.env.PORT || 3000,

        passwordSecret: process.env.PASSWORD_SECRET,
        jwtTokenSecret : process.env.JWT_SECRET,
        tokenExpiry : 60
    }
};

module.exports = (function () {
    var env = process.env.NODE_ENV || "development";
    console.log(config[env]);
    var defaults = {
        limit : 10,
        skip : 0
    }

    console.log(_.merge(config[env] , defaults));
    return _.merge(config[env]);
})();
