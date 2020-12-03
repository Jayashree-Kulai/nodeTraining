/**
 * Project          : Kassara
 * Module           : City Controller File
 * Source filename  : City.js
 * Description      : This file defines all the operation for City module.
 * Author           : Sanjana  <sanjana.b@robosoftin.com>
 * Copyright        : Copyright © 2017, Kassara
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */

"use strict";

//Here we’re assigning the functions  we want to export to an exports property on module
module.exports = function (mongoose, utils, config, constants) {
    var RecentSearchs = mongoose.model('RecentSearchs');
    var Citys = mongoose.model('Citys');
    var cityCtrl = {}
    cityCtrl.createCity = async function (req, res) {
        try {
            var cityObj = {};
            if (req.body.name) {
                cityObj.name = req.body.name;
            }

            if (req.body.minTemperature) {
                cityObj.minTemperature = req.body.minTemperature;
            }
            if (req.body.maxTemperature) {
                cityObj.maxTemperature = req.body.maxTemperature;
            }
            if (req.body.precipitation) {
                cityObj.precipitation = req.body.precipitation;
            }
            if (req.body.humidity) {
                cityObj.humidity = req.body.humidity;
            }
            if (req.body.wind) {
                cityObj.wind = req.body.wind;
            }
            if (req.body.visibility) {
                cityObj.visibility = req.body.visibility;
            }

            var query = {};
            query.name = req.body.name;
            let data = await Citys.getData(query);
            if (data) {
                return utils.sendCustomError(req, res, "CONFLICT", "CONFLICT", "CITY_EXISTS")
            } else {
                let data = await Citys.addData(cityObj);
                console.log("________________data", data);
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
            }

        } catch (error) {
            console.log("____________Err", error)
            return utils.sendDBCallbackErrs(req, res, error, null);
        }




    }

    cityCtrl.getCity = async function (req, res) {
        try {

            let data = await Citys.getDataById(req.params.cityId);
            if (!data) {
                return utils.sendCustomError(req, res, "HTTP_ERR", "USER_NOT_EXISTS")
            } else {
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
            }
        } catch (error) {
            console.log("____________Err", error)
            return utils.sendDBCallbackErrs(req, res, error, null);
        }


    }

    cityCtrl.getCitys = async function (req, res) {
        try {
            var queryObj = {};
            queryObj.query = {};

            queryObj.options = {};

            let data = await Citys.getLists(queryObj);
            let count = await Citys.getCount(queryObj.query); 
            return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS", count);

        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }



    }
    cityCtrl.updateCity = async function (req, res) {
        try {
            var cityObj = {};

            if (req.body.name) {
                cityObj.name = req.body.name;
            }
            if (req.body.minTemperature) {
                cityObj.minTemperature = req.body.minTemperature;
            }
            if (req.body.maxTemperature) {
                cityObj.maxTemperature = req.body.maxTemperature;
            }
            if (req.body.precipitation) {
                cityObj.precipitation = req.body.precipitation;
            }
            if (req.body.humidity) {
                cityObj.humidity = req.body.humidity;
            }
            if (req.body.wind) {
                cityObj.wind = req.body.wind;
            }
            if (req.body.visibility) {
                cityObj.visibility = req.body.visibility;
            }
            let data = await Citys.updateDataById(req.params.cityId, cityObj);
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

    cityCtrl.deleteCity = async function (req, res) {
        try {
            let data = await Citys.removeDataById(req.params.cityId);
            if (!data) {
                return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
            } else {
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }


    cityCtrl.getSearch = async function (req, res) {
        try {
            var query = {
                name: req.query.city //city name
            }
            let data = await Citys.getData(query);
            if(!data){
                return utils.sendCustomError(req, res, "HTTP_ERR", "HTTP_ERR", "CITY_DOES_NOT_EXIST");
            }
            else{
                var searchObj = {
                    cityId: data._id,
                    userId: req.query.userId
                }
                let data = await RecentSearchs.addData(searchObj);
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
            }
                
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    return cityCtrl;
}

