/**
 * Project          : Shopping
 * Module           : Configuration
 * Source filename  : authMiddleware.js
 * Description      : Middleware function to verify the token
 * Author           : Likhitha M 
 * Copyright        : Copyright © 2020, Shopping
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */
var mongoose = require("mongoose");
var utils = require("../utils/util");
var Users = mongoose.model('Users');
var config = require("../configs/config");


module.exports = function (req, res, next) {

    var token = req.headers['authorization'];
    console.log("token------------------->", token)
    if (token) {
        var decodedData = utils.verifyToken(token);
        console.log("decodedData----------------->", decodedData);
        if (decodedData && decodedData.exp <= new Date()) {
            return utils.sendCustomError(req, res, "BAD_REQUEST", "BAD_REQUEST", "TOKEN_EXPIRED");
        } else {
            
            if (decodedData._id != req.body.userId) {
                console.log("Token is not generated for ", req.body.userId)
                return utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED");
            }

            var userId = decodedData._id;
            
            Users.getDataById(userId, function (err, user) {
                if (err || !user) {
                    return utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED");
                } else {
                    req.user = user;

                    next();
                }

            })

        }

    } else {
        return utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED");
    }




}