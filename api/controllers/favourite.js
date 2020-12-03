/**
 * Project          : Kassara
 * Module           : Favourite Controller File
 * Source filename  : favourite.js
 * Description      : This file defines all the operation for Favourite module.
 * Author           : Sanjana  <sanjana.b@robosoftin.com>
 * Copyright        : Copyright © 2017, Kassara
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */

"use strict";

//Here we’re assigning the functions  we want to export to an exports property on module
module.exports = function (mongoose, utils, config, constants) {

    var Favourites = mongoose.model('Favourites');
    var favouriteCtrl = {}
    var Citys = mongoose.model('Citys');
    var Users = mongoose.model('Users');
    favouriteCtrl.createFavourite = async function (req, res) {

        try {
            var favouriteObj = {};
            if (req.body.favCityId) {
                favouriteObj.favCityId = req.body.favCityId;
            }
            if (req.body.userId) {
                favouriteObj.userId = req.body.userId;
            }
            var query = {};
            query.favCityId = req.body.favCityId;
            query.userId = req.body.userId;

            let data = await Citys.getDataById(query.favCityId);
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
                    let data = await Favourites.adddata(favouriteObj);
                    return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
                }
            }

        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    favouriteCtrl.getFavourite = async function (req, res) {

        try {
            let data = await Favourites.getDataById(req.params.favouriteId);
            if (!data) {
                return utils.sendCustomError(req, res, "HTTP_ERR", "USER_NOT_EXISTS")
            } else {
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
            }

        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }

    }

    favouriteCtrl.getFavourites = async function (req, res) {
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
            queryObj.populate = 'favCityId';///////////////////////////////////////////////////////////////
            //queryObj.selectFields = 'favCityId';

            let data = await Favourites.getLists(queryObj);
            let count = await Favourites.getCount(queryObj.query);
            return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS", count);
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }

    }
    favouriteCtrl.updateFavourite = async function (req, res) {
        try {
            var favouriteObj = {};

            if (req.body.name) {
                favouriteObj.name = req.body.name;
            }
            if (req.body.userId) {
                favouriteObj.userId = req.body.userId;
            }
            let data = await Favourites.updatedataById(req.params.favouriteId, favouriteObj);
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

    favouriteCtrl.deleteFavourite = async function (req, res) {
        try {
            let data = await Favourites.removeDataById(req.params.favouriteId);
            if (!data) {
                return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
            } else {
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
            }
        } catch (error) {
            console.log("err---------->",error);
            return utils.sendDBCallbackErrs(req, res, error, null);
        }

    }

    return favouriteCtrl;
}