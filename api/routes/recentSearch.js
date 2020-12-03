/**
 * Project          : Evaluation
 * Module           : RecentSearch
 * Source filename  : recentsearch.js
 * Description      : Api routes for the recentsearch.
 * Author           : Likhitha M <likhitha.m@robosoftin.com>
 * Copyright        : Copyright © 2019, Evaluation
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */

const express = require("express"); 
module.exports = function (app, mongoose, utils, config, constants, upload) {
    var recentsearchCtrl = require("../controllers/recentsearch")(mongoose, utils, config, constants);
    var authenticate = require("../auth/authMiddleware");
  
    var recentsearchRouter = express.Router();

    //api to add recentsearch data
    recentsearchRouter.post("/",authenticate, recentsearchCtrl.createRecentSearch); 
  
    //api to edit recentsearch data
    recentsearchRouter.put("/:recentsearchId", recentsearchCtrl.updateRecentSearch);
 
    //api to list recentsearch data
    recentsearchRouter.get("/", recentsearchCtrl.getRecentSearchs);
   

    //api to get details of recentsearch data
    recentsearchRouter.get("/:recentsearchId", recentsearchCtrl.getRecentSearch);
   

    //api to delete details of recentsearch data
    recentsearchRouter.delete("/:recentsearchId", recentsearchCtrl.deleteRecentSearch);
  
    app.use("/api/v1/recentsearchs", recentsearchRouter);
};