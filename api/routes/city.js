/**
 * Project          : Evaluation
 * Module           : City
 * Source filename  : city.js
 * Description      : Api routes for the city.
 * Author           : Likhitha M <likhitha.m@robosoftin.com>
 * Copyright        : Copyright © 2019, Evaluation
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */

const express = require("express"); 
module.exports = function (app, mongoose, utils, config, constants, upload) {
    var cityCtrl = require("../controllers/city")(mongoose, utils, config, constants);
  
  
    var cityRouter = express.Router();

    //api to add city data
    cityRouter.post("/", cityCtrl.createCity); 
  
    //api to edit city data
    cityRouter.put("/:cityId", cityCtrl.updateCity);
 
    //api to list city data
    cityRouter.get("/", cityCtrl.getCitys);
   

    //api to get details of city data
    cityRouter.get("/:cityId", cityCtrl.getCity);
   

    //api to delete details of city data
    cityRouter.delete("/:cityId", cityCtrl.deleteCity);

    cityRouter.post("/search",cityCtrl.getSearch);
  
    app.use("/api/v1/citys", cityRouter);
};