/**
 * Project          : Invision Policy App
 * Module           : Mongodb config
 * Source filename  : mongodb.js
 * Description      : Mongodb related configuration
 * Author           : Jayashree Kulai
 */
"use strict";
//Mongoose is an ODM (Object Document Mapping) tool for Node.js and MongoDB. It helps you convert the objects in your code to documents in the database and vice versa.
var mongoose = require("mongoose");
var config = require("./config");

// Connect to MongoDB, open a connection to a database using connect function
mongoose.connect(config.mongo.dbURL, config.mongo.options, function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("Database connection to MongoDB opened.")
    }
    // Check error in initial connection. There is no 2nd param to the callback.
});


module.exports = mongoose;