/**
 * Project          : Invision Policy App
 * Module           : QuestionnaireAgreementStatus Controller File
 * Source filename  : questionnaireAgreementStatus.js
 * Description      : This file defines all the operation for QuestionnaireAgreementStatus module.
 * Author           : Jayashree Kulai
 */
"use strict";

const util = require("../utils/util");
var path = require('path');
module.exports = function (mongoose, utils, config, constants, logger) {

    var QuestionnaireAgreementStatus = mongoose.model('QuestionnaireAgreementStatus');
    //var Questionnaires = mongoose.model('Questionnaires');
    var questionnaireAgreementStatusCtrl = {}

    questionnaireAgreementStatusCtrl.acceptPolicy = async function (req, res) {
        try {
            console.log("user in questionnaireAgreementStatus.......", req.user);
            if (req.user) {

                var questionnaireAgreementStatusObj = {};
                questionnaireAgreementStatusObj.userId = req.user._id;

                if (req.body.questionnaireId) {
                    questionnaireAgreementStatusObj.questionnaireId = req.body.questionnaireId;
                }

                questionnaireAgreementStatusObj.agreed = true;
                var query = {};
                query.userId = req.user._id;
                console.log("query.userId--->",query.userId);
                //query.questionnaireId = req.body.questionnaireId;
                let questionnaireAgreementStatusData = await QuestionnaireAgreementStatus.getData(query);
                console.log("questionnaireAgreementStatusCtrl data.........", questionnaireAgreementStatusData)

                if (!questionnaireAgreementStatusData) {
                    return utils.sendCustomError(req, res, "NOT_FOUND", "NO_RECORDS")
                } else {
                    let data = await QuestionnaireAgreementStatus.updateDataById(questionnaireAgreementStatusData._id, questionnaireAgreementStatusObj);
                    console.log("________________data", data);
                    return utils.sendResponse(req, res, data, "SUCCESS", "ACCEPTED");
                }
            } else {
                return utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED")
            }
        } catch (error) {
            console.log("____________Err", error)
            return utils.sendDBCallbackErrs(req, res, error, null);
        }

    }
    return questionnaireAgreementStatusCtrl;
}