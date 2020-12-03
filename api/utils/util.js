/**
 * Project          : Evaluation
 * Module           : Utilities
 * Source filename  : utility.js
 * Description      : Utility functions for multiple modules.
 * Author           : Likhitha M 
 * Copyright        : Copyright © 2019, Evaluation
 *                     Written under contract by Robosoft Technologies Pvt. Ltd.
 */

"use strict";
var _ = require("lodash");

var CryptoJS = require("crypto-js");
var jwt = require("jwt-simple");

var constants = require("./../configs/constants.js");
var config = require("./../configs/config.js");
var fs = require("fs");
const CODE = constants.code;
const MSG = constants.text;
var servicePath = config.root + "/services/";
var services = {};
fs.readdirSync(servicePath).forEach(function (file) {
    // logger.info("Loading services : " + file);
    services[file] = require(servicePath + file);
});
module.exports = {


    //generic format function for sending error response
    notifyError: function (req, res, httpStatus, code, message, extraMsg) {
        //setting http status code for response      
        httpStatus = (typeof httpStatus === "undefined") ? 400 : CODE[httpStatus];

        if (!code) {
            code = "ERR";
        }

        if (!message) {
            message = "ERR";
        }
        var errorMsg = MSG[message];
        if (extraMsg) {
            errorMsg = extraMsg + " : " + errorMsg;
        }
        res.status(httpStatus)
            .json({
                meta: {
                    code: CODE[code],
                    message: errorMsg,
                    timestamp: new Date().toISOString()
                }
            });
    },

    sendCustomError: function (req, res, httpStatus, code, message) {
        //setting http status code for response      
        httpStatus = (typeof httpStatus === "undefined") ? 400 : CODE[httpStatus];

        if (!code) {
            code = CODE.ERR;
        }

        if (!message) {
            message = MSG.ERR;
        }

        res.status(httpStatus)
            .json({
                meta: {
                    code: code,
                    message: message,
                    timestamp: new Date().toISOString()
                }
            });
    },
    sendAuthError: function (req, res, code, message) {
        //setting http status code for response      
        //
        // httpStatus = (typeof httpStatus === "undefined") ? 400 : CODE[httpStatus];

        // if (!code) {
        //     code = CODE.ERR;
        // }

        // if (!message) {
        //     message = MSG.ERR;
        // }

        res.status(CODE[code])
            .json({
                meta: {
                    code: CODE[code],
                    message: MSG[message],
                    timestamp: new Date().toISOString()
                }
            });
    },

    //generic format function for sending Success response
    sendResponse: function (req, res, data, code, message, count) {
        //code = (typeof code === "undefined") ? "SUCCESS" : code;
        //httpStatus = (typeof httpStatus === "undefined") ? 200 : CODE[httpStatus];

        var skip;
        var limit;
        res.status(CODE[code]).json({
            meta: {
                code: CODE[code],
                message: MSG[message],
                timestamp: new Date().toISOString()
            },
            pagination: {
                skip: skip,
                limit: limit,
                totalCount: count
            },
            data: data
        });
    },


    sendDBError: function (req, res, err) {

        if (err && err.code === 11000) {
            return module.exports.notifyError(req, res, "CONFLICT", "DB_DUPLICATE", "DB_DUPLICATE");
        } else {
            return module.exports.notifyError(req, res, "HTTP_ERR", "DB_ERR", "DB_ERR");
        }
    },

    sendDBCallbackErrs: function (req, res, err, data) {
        if (err) {
            return module.exports.sendDBError(req, res, err);
        } else {

            if (!data) {
                data = {};
            }
            return module.exports.sendResponse(req, res, "SUCCESS", data, "NO_RECORDS", "NO_RECORDS");
        }
    },


    dbCallbackHandler: function (req, res, data, err) {
        if (!err && data) {
            return module.exports.sendResponse(req, res, "SUCCESS", data);
        } else {
            return module.exports.sendDBCallbackErrs(req, res, err, data);
        }
    },

    dbArrayCallbackHandler: function (req, res, data, err, count) {
        if (!err && data) {
            if (typeof count === "undefined") {
                return module.exports.sendResponse(req, res, "SUCCESS", data);
            } else {
                if (data.length > 0) { //Object.keys(data).length > 0
                    return module.exports.sendResponse(req, res, "SUCCESS", data, undefined, undefined, count);
                } else {
                    return module.exports.sendResponse(req, res, "SUCCESS", data, "NO_RECORDS", "NO_RECORDS");
                }
            }
        } else {
            return module.exports.sendDBCallbackErrs(req, res, err, data);
        }
    },

    encryptPassword: function (password) {
        var ciphertext = CryptoJS.HmacSHA1(password, config.passwordSecret).toString();
        // var ciphertext = CryptoJS.AES.encrypt(password, config.passwordSecret).toString();
        return ciphertext;

    },

    generateToken: function (payload) {
        var token = jwt.encode(payload, config.jwtTokenSecret);
        return token;
    },

    
    generateExpiryTime: function () {
        var currentDate = new Date();
         //console.log(currentDate);
         //console.log(currentDate.getMinutes())
        var tokenExpiry = new Date(currentDate.setMinutes(currentDate.getMinutes() + config.tokenExpiry));
        
         //console.log(tokenExpiry);
        return tokenExpiry;

    },
    verifyToken: function (token) {
        var payload = jwt.decode(token, config.jwtTokenSecret);
        return payload;
    }

};
