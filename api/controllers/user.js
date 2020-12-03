/**
 * Project          : Kassara
 * Module           : User Controller File
 * Source filename  : user.js
 * Description      : This file defines all the operation for User module.
 * Author           : Sanjana  <sanjana.b@robosoftin.com>
 * Copyright        : Copyright © 2017, Kassara
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */

"use strict";

//Here we’re assigning the functions  we want to export to an exports property on module
module.exports = function (mongoose, utils, config, constants) {

    var Users = mongoose.model('Users');
    var userCtrl = {}
    userCtrl.createUser = async function (req, res) {
        try {
            var userObj = {};
            if (req.body.name) {
                userObj.name = req.body.name;
            }
            if (req.body.phone) {
                userObj.phone = req.body.phone;
            }
            if (req.body.email) {
                userObj.email = req.body.email;
            }
            if (req.body.password) {
                userObj.password = req.body.password;
            }
            console.log("Actual Password------->", req.body.password);
            userObj.password = utils.encryptPassword(userObj.password);

            var query = {};
            query.name = req.body.name;
            let data = await Users.addData(userObj);
            console.log("________________data", data);
            return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");

        } catch (error) {
            console.log("____________Err", error)
            return utils.sendDBCallbackErrs(req, res, error, null);
        }


    }

    userCtrl.loginUser = async function (req, res) {
        try {
            var query = {};
            query.email = req.body.email;
            query.password = req.body.password;

            query.password = await utils.encryptPassword(req.body.password);
            let data = await Users.getData(query);
            console.log("********data", data)
            if (!data) {
                return utils.sendCustomError(req, res, "HTTP_ERR", "USER_NOT_EXISTS")
            } else {
                var payload = {
                    _id: data._id,
                    exp: await utils.generateExpiryTime(),
                    //userType: userData.userType
                };
                console.log(payload)
                //userData.token = utils.generateToken(payload);
                data.token = await utils.generateToken(payload);
                // data.tokenExpiry = await utils.generateExpiryTime();
                data.tokenExpiry = payload.exp;

                data = await Users.updateDataById(data._id, { token: data.token, tokenExpiry: data.tokenExpiry });
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");

            }

        } catch (error) {
            console.log(error);
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    userCtrl.getUser = async function (req, res) {
        try {
            let data = await Users.getDataById(req.params.userId);
            if (!data) {
                return utils.sendCustomError(req, res, "HTTP_ERR", "USER_NOT_EXISTS")
            } else {
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }

    }

    userCtrl.getUsers = async function (req, res) {
        try {
            var queryObj = {};
            queryObj.query = {};

            queryObj.options = {};

            if (req.query.limit) {
                queryObj.options.limit = JSON.parse(req.query.limit)
            }
            if (req.query.skip) {
                queryObj.options.skip = JSON.parse(req.query.skip);
            }
        
            let data = await Users.getLists(queryObj);
            let count = await Users.getCount(queryObj.query);
            return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS", count);

        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }
    userCtrl.updateUser = async function (req, res) {
        try {
            var userObj = {};

            if (req.body.name) {
                userObj.name = req.body.name;
            }
            if (req.body.phone) {
                userObj.phone = req.body.phone;
            }
            if (req.body.email) {
                userObj.email = req.body.email;
            }
            let data = await Users.updateDataById(req.params.userId, userObj);
            if (!data) {
                return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
            } else {
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
            }
        } catch (error) {
            console.log("error-------->", error);
            return utils.sendDBCallbackErrs(req, res, error, null);
        }

    }

    userCtrl.deleteUser = async function (req, res) {
        try {
            let data = await Users.removeDataById(req.params.userId);
            if (!data) {
                return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
            } else {
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }

    }

    userCtrl.getUsersCount = async function (req, res) {
        try {
            let data = await Users.aggregate([
                {
                    $group: {
                        // _id: '$category',
                        count: { $sum: 1 }
                    }
                }


            ]);
            return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");

        } catch (error) {
            console.log("------err", error)
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }


    return userCtrl;
}