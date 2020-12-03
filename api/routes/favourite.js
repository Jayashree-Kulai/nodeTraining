/**
 * Project          : Evaluation
 * Module           : Favourite
 * Source filename  : favourite.js
 * Description      : Api routes for the favourite.
 * Author           : Likhitha M <likhitha.m@robosoftin.com>
 * Copyright        : Copyright © 2019, Evaluation
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */

const express = require("express"); 
module.exports = function (app, mongoose, utils, config, constants, upload) {
    var favouriteCtrl = require("../controllers/favourite")(mongoose, utils, config, constants);
    var authenticate = require("../auth/authMiddleware");
  
    var favouriteRouter = express.Router();

    //api to add favourite data
    favouriteRouter.post("/",authenticate, favouriteCtrl.createFavourite); 
  
    //api to edit favourite data
    favouriteRouter.put("/:favouriteId", favouriteCtrl.updateFavourite);
 
    //api to list favourite data
    favouriteRouter.get("/", favouriteCtrl.getFavourites);
   

    //api to get details of favourite data
    favouriteRouter.get("/:favouriteId", favouriteCtrl.getFavourite);
   

    //api to delete details of favourite data
    favouriteRouter.delete("/:favouriteId", favouriteCtrl.deleteFavourite);
  
    app.use("/api/v1/favourites", favouriteRouter);
};