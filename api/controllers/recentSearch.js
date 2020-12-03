/**
 * Project          : Kassara
 * Module           : RecentSearch Controller File
 * Source filename  : recentsearch.js
 * Description      : This file defines all the operation for RecentSearch module.
 * Author           : Sanjana  <sanjana.b@robosoftin.com>
 * Copyright        : Copyright © 2017, Kassara
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */

"use strict";

//Here we’re assigning the functions  we want to export to an exports property on module
module.exports = function (mongoose, utils, config, constants) {

    var RecentSearchs = mongoose.model('RecentSearchs');
    var recentsearchCtrl = {}
    recentsearchCtrl.createRecentSearch = async function (req, res) {

        try {
            var recentsearchObj = {};
            if (req.body.cityId) {
                recentsearchObj.cityId = req.body.cityId;
            }

            if (req.body.cityId) {
                recentsearchObj.cityId = req.body.cityId;
            }

            var query = {};
            query.searchCityId = req.body.searchCityId;
            query.userId = req.body.userId;

            let data = await Citys.getDataById(query.searchCityId);
            if (!data) {
                return utils.sendCustomError(req, res, "INVALID", "INVALID", "CITY_DOES_NOT_EXIST")
            }
            else {
                let data = await Users.getDataById(query.userId);
                //console.log("User Data .............", data);
                if (!data) {
                    return utils.sendCustomError(req, res, "INVALID", "INVALID", "USER_NOT_EXISTS")
                }
                else {
                    let data = await RecentSearchs.adddata(recentsearchObj);
                    return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
                }

            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }



    }

    recentsearchCtrl.getRecentSearch = async function (req, res) {
        try {
            let data = await RecentSearchs.getDataById(req.params.recentsearchId);
            if (!data) {
                return utils.sendCustomError(req, res, "HTTP_ERR", "USER_NOT_EXISTS")
            } else {
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    recentsearchCtrl.getRecentSearchs = async function (req, res) {

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
            //queryObj.populate = 'favCityId';///////////////////////////////////////////////////////////////
            //queryObj.selectFields = 'favCityId';

            let data = await RecentSearchs.getLists(queryObj);
            let count = await RecentSearchs.getCount(queryObj.query);
            return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS", count);
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }
    recentsearchCtrl.updateRecentSearch = async function (req, res) {
        try {
            var recentsearchObj = {};

            if (req.body.name) {
                recentsearchObj.name = req.body.name;
            }
            if (req.body.userId) {
                recentsearchObj.userId = req.body.userId;
            }

            let data = await RecentSearchs.updatedataById(req.params.recentsearchId, recentsearchObj);
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

    recentsearchCtrl.deleteRecentSearch = async function (req, res) {
        try {
            console.log(req.params);
            let data = await RecentSearchs.removeDataById(req.params.recentsearchId);
            if (!data) {
                return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
            } else {
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    return recentsearchCtrl;
}