/**
 * Project          : Invision Policy App
 * Module           : Configuration
 * Source filename  : config.js
 * Description      : Environment related configuration variables
 * Author           : Jayashree Kulai 
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
        tokenExpiry : 60,
        email: {
            'user': 'nodetraining@yahoo.com',
            'pass': 'yvwhpyxhommrvkkf'
        },
    },

    development: {
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
        tokenExpiry : 60,
        email: {
            'user': 'nodetraining@yahoo.com',
            'pass': 'yvwhpyxhommrvkkf'
        },

    },

    staging: {
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
        tokenExpiry : 60,
        email: {
            'user': 'nodetraining@yahoo.com',
            'pass': 'yvwhpyxhommrvkkf'
        },

    }
};

module.exports = (function () {
    var env = process.env.NODE_ENV || "development";
    console.log(config[env]);
    var defaults = {
        limit: 10,
        skip: 0
    }

    console.log(_.merge(config[env], defaults));
    return _.merge(config[env]);
})();
