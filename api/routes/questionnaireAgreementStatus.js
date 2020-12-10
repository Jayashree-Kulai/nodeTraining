/**
 * Project          : Invision Policy App
 * Module           : QuestionnaireAgreementStatus routes file
 * Source filename  : questionnaireAgreementStatus.js
 * Description      : Api routes for the questionnaireAgreementStatus.
 * Author           : Jayashree Kulai
 */

const express = require("express");
module.exports = function (app, mongoose, utils, config, constants, upload, logger) {
    var questionnaireAgreementStatusCtrl = require("../controllers/questionnaireAgreementStatus")(mongoose, utils, config, constants, logger);
    var authenticate = require("../auth/bearer").isAuthenticated;

    var questionnaireAgreementStatusRouter = express.Router();

    //api to save Questionnaire Agreement Status as 'true'
    questionnaireAgreementStatusRouter.post("/acceptPolicy", authenticate, questionnaireAgreementStatusCtrl.acceptPolicy);

    
    app.use("/api/v1/questionnaireAgreementStatus", questionnaireAgreementStatusRouter);
};