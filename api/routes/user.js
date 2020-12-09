/**
 * Project          : Invision Policy App
 * Module           : User
 * Source filename  : user.js
 * Description      : Api routes for the user.
 * Author           : Jayashree Kulai
 */

const express = require("express");
module.exports = function (app, mongoose, utils, config, constants, logger, upload) {
    var userCtrl = require("../controllers/user")(mongoose, utils, config, constants, logger);
    var authenticate = require("../auth/bearer").isAuthenticated;
    
    var userRouter = express.Router();

    //userRouter.get("/getCount",authenticate, userCtrl.getUsersCount);

    //api to add user data
    userRouter.post("/register",upload.single('xlsheet'), userCtrl.createUser);

    userRouter.post("/uploadFile", userCtrl.uploadFile);

    userRouter.get("/downloadFile", userCtrl.downloadFile);

    //api for user login
    userRouter.post("/login", userCtrl.loginUser);

    //api for user logout
    userRouter.post("/logout", authenticate, userCtrl.logoutUser);

    // api to used when user forget password
    userRouter.post("/sendPasswordUpdateLink", userCtrl.sendPasswordUpdateLink);

    // api to to change password
    userRouter.put("/changePassword", authenticate, userCtrl.changePassword);

    


    // //api to edit user data
    // userRouter.put("/:userId", userCtrl.updateUser);

    // //api to list user data
    // userRouter.get("/", userCtrl.getUsers);


    // //api to get details of user data
    // userRouter.get("/:userId", userCtrl.getUser);


    // //api to delete details of user data
    // userRouter.delete("/:userId", userCtrl.deleteUser);

    // //api to send OTP
    // userRouter.post("/sendOtp", userCtrl.sendOtp);

    // userRouter.post("/verifyOtp", userCtrl.verifyOtp);

    
    
    app.use("/api/v1/users", userRouter);
};