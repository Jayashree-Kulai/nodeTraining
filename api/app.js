
/**
 * Project          : Invision Policy App
 * Source filename  : app.js
 * Description      : App Entry point , which loads all modules.
 * Author           : Jayashree Kulai
 * Copyright        : Copyright © 2019, ShoppingApp
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 *                    
 */

"use strict"; //The purpose of "use strict" is to indicate that the code should be executed in "strict mode". With strict mode, you can not, for example, use undeclared variables.
//To include a module, use the require() function with the name of the module:
//Dotenv is a module that loads environment variables from a .env file into process.env.
require("dotenv").config();

//The process object is a global that provides information about, and control over, the current Node.js process. As a global, it is always available to Node.js applications without using require().
var env = process.env.NODE_ENV || "development"; // Node.js exposes the current process’s environment variables to the script as an object called process.env.
var config = require("./configs/config"); //loading config 

// Load  modules
var express = require("express"); //nodejs framework which is used to expose the APIS
var app = express(); //First we invoke the require() function, specifying the name of the module as a string ('express'), and calling the returned object to create an Express application. We can then access the properties and functions of the application object.
//The body-parser package that we’ll use to parse the body of incoming requests.
const bodyParser = require("body-parser");

const mongoose = require("./configs/mongodb"); //mongodb connection
const constants = require("./configs/constants"); //loading constants
var cron = require('node-cron');
var passport = require('passport')
app.use(passport.initialize());

// var cron = require('node-cron');

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads');
    },
    filename: function (req, file, cb) {
        var fileName = file.originalname;
        //image-20201019
        cb(null, fileName);
    }
})
var upload = multer({ storage: storage });

 var utils = require("./utils/util"); //loading util file
 console.log("Entering environment \"" + env + "\"");


// configure app to use bodyParser()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// used to configure apidoc
 app.use("/docs", express.static(__dirname + "/apidoc"));

var logger = require('logger').createLogger('development.log');

//loading all routes and models
require("./configs/loader")(app, mongoose, utils, config, constants, logger, upload);

//server listening to port
//The app.listen() function is used to bind and listen the connections on the specified host and port.
app.listen(config.port, function () {
    console.log("Server Listening to port :", config.port);
});

var remindCtrl = require('./controllers/questionnaire.js')(mongoose, utils, config, constants);
cron.schedule('* * * * *', function () {
    remindCtrl.remindQuestionnaire();

});

module.exports = app;