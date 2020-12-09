/**
 * Project          : Invision Policy App
 * Module           : Loader
 * Source filename  : loader.js
 * Description      : Loading all models and routes.
 * Author           : Jayashree Kulai
 */
"use strict";

var fs = require("fs");
module.exports = function (app, mongoose, utils, config, constants, logger, uploads) {

    // Paths
    var modelPath = config.root + "/models";
    var routePath = config.root + "/routes";

    // Bootstrap models
    fs.readdirSync(modelPath).forEach(function (file) {
        console.log("Loading model : " + file);
        require(modelPath + "/" + file + "/schema.js")(mongoose, utils);
    });

    // Bootstrap routes
    fs.readdirSync(routePath).forEach(function (file) {
        console.log("Loading routes : " + file);
        require(routePath + "/" + file)(app, mongoose, utils, config, constants, logger, uploads);
    });
};