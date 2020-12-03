/**
 * Project          : Evaluation
 * Module           : User
 * Source filename  : user.js
 * Description      : Api routes for the user.
 * Author           : Likhitha M <likhitha.m@robosoftin.com>
 * Copyright        : Copyright © 2019, Evaluation
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */

const express = require("express"); 
module.exports = function (app, mongoose, utils, config, constants, upload) {
    var userCtrl = require("../controllers/user")(mongoose, utils, config, constants);
  
  
    var userRouter = express.Router();

    //api to add user data
    userRouter.post("/", userCtrl.createUser); 
    userRouter.post("/login", userCtrl.loginUser);
    //api to edit user data
    userRouter.put("/:userId", userCtrl.updateUser);
 
    //api to list user data
    userRouter.get("/", userCtrl.getUsers);
   

    //api to get details of user data
    userRouter.get("/:userId", userCtrl.getUser);
   

    //api to delete details of user data
    userRouter.delete("/:userId", userCtrl.deleteUser);
  
    app.use("/api/v1/users", userRouter);
};