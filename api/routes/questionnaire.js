/**
 * Project          : Invision Policy App
 * Module           : Questionnaire routes file
 * Source filename  : questionnaire.js
 * Description      : Api routes for the questionnaire.
 * Author           : Jayashree Kulai
 */

const express = require("express");
module.exports = function (app, mongoose, utils, config, constants, logger, upload) {

    var questionnaireCtrl = require("../controllers/questionnaire")(mongoose, utils, config, constants, logger);
    var authenticate = require("../auth/bearer").isAuthenticated;
    var questionnaireRouter = express.Router();

    //api to save Questionnaire
    questionnaireRouter.post("/addQuestionnaire", authenticate, questionnaireCtrl.addQuestionnaire);

    //api to preview questionnaire 
    questionnaireRouter.get("/previewQuestionnaire", authenticate, questionnaireCtrl.getQuestionnaires);

    //api to Publish Questionnaire 
    questionnaireRouter.post("/publishQuestionnaire", authenticate, questionnaireCtrl.publishQuestionnaire);

    //api to generate Report of questionnaire data
    questionnaireRouter.get("/generateReportQuestionnaire",authenticate, questionnaireCtrl.generateReportQuestionnaire);

    app.use("/api/v1/questionnaires", questionnaireRouter);
};