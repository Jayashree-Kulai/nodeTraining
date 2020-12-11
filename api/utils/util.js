/**
 * Project          : Invision Policy App
 * Module           : Utilities
 * Source filename  : utility.js
 * Description      : Utility functions for multiple modules.
 * Author           : Jayashree Kulai
 */

"use strict";
var _ = require("lodash");
// var jwt = require("jwt-simple");
const { v4: uuidv4 } = require('uuid');
var otpGenerator = require('otp-generator')
var CryptoJS = require("crypto-js");
var constants = require("./../configs/constants.js");
var config = require("./../configs/config.js");
var fs = require("fs");
var xlsx = require("xlsx");
const CODE = constants.code;
const MSG = constants.text;
var servicePath = config.root + "/services/";
var services = {};
fs.readdirSync(servicePath).forEach(function (file) {
    //logger.info("Loading services : " + file);
    services[file] = require(servicePath + file);
});
module.exports = {


    //generic format function for sending error response
    notifyError: function (req, res, httpStatus, code, message, extraMsg) {
        console.log("-----httpStatus", httpStatus, '----code', code, '----message', message.errors, '---extraMsg', extraMsg);
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

        if (message.errors) {
            message = message.message
        }

        res.status(httpStatus)
            .json({
                meta: {
                    code: CODE[code],
                    message: message,
                    timestamp: new Date().toISOString()
                }
            });
    },

    sendCustomError: function (req, res, code, message) {
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
        console.log("-----err", err.code)

        if (err && err.code === 11000) {
            return module.exports.sendCustomError(req, res, "CONFLICT", "DB_DUPLICATE", "DB_DUPLICATE");
        } else {
            return module.exports.notifyError(req, res, "HTTP_ERR", "DB_ERR", err);
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

    encryptPassword: function (password) {
       var ciphertext = CryptoJS.HmacSHA1(password, config.passwordSecret).toString();
        //var ciphertext = CryptoJS.AES.encrypt(password, config.passwordSecret).toString();
        return ciphertext;

    },

    generateToken: function (payload) {
        console.log("_________payload", payload);
        console.log("-------config.jwtTokenSecret", config.jwtTokenSecret)
        var token = jwt.encode(payload, config.jwtTokenSecret);
        console.log("token-", token);
        return token;
    },

    generateRefreshToken: function (payload) {
        payload.isRefresh = true;
        var token = jwt.encode(payload, config.jwtTokenSecret);
        return token;
    },

    generateExpiryTime: function () {
        var currentDate = new Date();
        // console.log(currentDate);
        // console.log(currentDate.getMinutes())
        var tokenExpiry = new Date(currentDate.setMinutes(currentDate.getMinutes() + config.tokenExpiry));
        // currentDate.setd
        // console.log(tokenExpiry);
        return tokenExpiry;

    },

    generateRefreshTokenExpiry: function () {
        var currentDate = new Date();
        var tokenExpiry = new Date(currentDate.setMinutes(currentDate.getMinutes() + config.refreshTokenExpiry));
        return tokenExpiry;
    },

    verifyToken: function (token, cb) {
        var payload;
        // var payload = jwt.decode(token, config.jwtTokenSecret);
        // return payload;
        try {
            payload = jwt.decode(token, config.jwtTokenSecret);
            cb(null, payload)
            // return payload
        } catch (err) {
            return cb(err, null)
        }
    },

    verifyToken: function (token) {
        var payload;
        // var payload = jwt.decode(token, config.jwtTokenSecret);
        // return payload;
        try {
            payload = jwt.decode(token, config.jwtTokenSecret);
            console.log(payload);
            return payload;

            // cb(null, payload)
            // return payload
        } catch (err) {
            return err;
        }
    },

    generateBearerToken: function () {
        return uuidv4();
    },

    generatePassword: function () {
        var otp = otpGenerator.generate(6, { upperCase: true, specialChars: true, alphabets: true });
        return otp;
    },

    generateOtpExpiryTime: function () {
        var currentDate = new Date();
        var otpExpiry = new Date(currentDate.setMinutes(currentDate.getMinutes() + config.otpExpiry));
        return otpExpiry;
    },

    sendMail: function (name, email, password) {
        var intro = "Your password is " + password;
        var subject = 'Verification Mail'
        services.email.sendMail(name, email, intro, subject, function (err, data) {
            console.log("err", err, "data", data);
        })
    },

    sendPublishMail: function (name, email, mailBody) {
        var intro = mailBody;
        var subject = 'New Policy Notification';
        services.email.sendMail(name, email, intro, subject, function (err, data) {
            console.log("err", err, "data", data);
        })
    },

    sendMailForAdmin: function (name, email, password) {
        var intro = "You have been selected as admin.<br>Your password is " + password;
        var subject = 'Congragulation, Welcome as admin'
        services.email.sendMail(name, email, intro, subject, function (err, data) {
            console.log("err", err, "data", data);
        })
    },

    sendMailForSuperAdmin: function (name, email, password) {
        var intro = "You have been selected as Super Admin.<br>Your password is " + password;
        var subject = 'Congragulation, Welcome as super admin'
        services.email.sendMail(name, email, intro, subject, function (err, data) {
            console.log("err", err, "data", data);
        })
    },

    sendReminderMail: function (name, email, password) {
        var intro = 'Please accept the policy within due date';
        var subject = 'Remider'
        services.email.sendMail(name, email, intro, subject, function (err, data) {
            console.log("err", err, "data", data);
        })
    },

    sendPasswordUpdationLinkMail: function (name, email, updationLink) {
        var intro = 'Please use the given link to update your password ' + updationLink;
        var subject = 'Update Your Password';
        services.email.sendMail(name, email, intro, subject, function (err, data) {
            console.log("err", err, "data", data);
        })
    },


    readexcelsheet: function (filepath) {
        var wb = xlsx.readFile(filepath);
        console.log('filePath------->', filepath);
        var ws = wb.Sheets["Sheet 1"];
        var data = xlsx.utils.sheet_to_json(ws);
        return data;
    }

};
