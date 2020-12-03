/**
 * Project          : Evaluation
 * Module           : Mongodb config
 * Source filename  : mongodb.js
 * Description      : Mongodb related configuration
 * Author           : Likhitha M 
 * Copyright        : Copyright © 2019, Evaluation
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */
"use strict";
//Mongoose is an ODM (Object Document Mapping) tool for Node.js and MongoDB. It helps you convert the objects in your code to documents in the database and vice versa.
var mongoose = require("mongoose");
var config = require("./config");


// Connect to MongoDB, open a connection to a database using connect function
//The connect function accepts two other optional parameters. The second parameter is an object of options where you can define things like the username and password, if required. The third parameter, which can also be the second parameter if you have no options, is the callback function after attempting to connect. The callback function can be used in one of two ways:

// mongoose.connect(config.mongo.dbURL,  config.mongo.options).then(

//     () => { console.log("Database connection to MongoDB opened."); },

//     err => { console.log(err)}

//     );
mongoose.connect(config.mongo.dbURL, config.mongo.options, function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("Database connection to MongoDB opened.")
    }

    // Check error in initial connection. There is no 2nd param to the callback.

});


module.exports = mongoose;