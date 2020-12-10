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

    /**
    * @apiDefine Authenticate
    *
    * @apiHeader {String} Authorization Bearer token for authorization
    *
    * @apiHeaderExample {json} Header-Example:
    *     {
    *       "Authorization": "Bearer f2a9c331-7f96-4f85-9fcb-e4db13fee5b8"
    *     }
    */

    //api to save Questionnaire
    questionnaireRouter.post("/addQuestionnaire", authenticate, questionnaireCtrl.addQuestionnaire);
     /**
    * @api {post} /questionnaires/addQuestionnaire Add Questionnaire
    * @apiName Add Questionnaire
    * @apiGroup Questionnaire
    * @apiDescription API for adding a questionnaire.
    * @apiUse Authenticate 
    * 
    * @apiParam {String} title Questionnaire title
    * @apiParam {String} description Questionnaire description
    * @apiParam {String} buttonTitle Button Title
    * @apiParam {String} buttonText Button Text
    * @apiParam {String} checkBoxText CheckBox Text
    * @apiParam {Date} startDate Start Date (Example : "2020-12-09")
    * @apiParam {Date} endDate End Date (Example : "2020-12-09")
    * @apiParam {Number} reminder Auto reminder
    * @apiParam {String} pptFile PPT file with content
    * @apiParam {String} excelSheet Excel sheet containing end user details
    * @apiParam {String} mailBody Mail Body
    * 
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/questionnaires/addQuestionnaire
    * @apiSampleRequest http://localhost:4200/api/v1/questionnaires/addQuestionnaire
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    "meta": {
        "code": 200,
        "message": "Success",
        "timestamp": "2020-12-10T08:53:04.161Z"
    },
    "pagination": {},
    "{
    "meta": {
        "code": 200,
        "message": "Success",
        "timestamp": "2020-12-10T10:07:23.833Z"
    },
    "pagination": {},
    "data": {
        "_id": "5fd1f35be392204295efaeaf",
        "adminId": "5fd1e1669b7243379e261fc3",
        "title": "Leave policy",
        "description": "Leave policy details",
        "buttonTitle": "Accept",
        "buttonText": "I Agree",
        "checkBoxText": "I Agree",
        "startDate": "2020-12-09T00:00:00.000Z",
        "endDate": "2020-12-10T00:00:00.000Z",
        "reminder": 2,
        "pptFile": "/home/jayashree/server-policy-app/api/uploads/abc.ppt",
        "excelSheet": "endUser.xlsx",
        "mailBody": "Hi Please read and accept this policy",
        "createdAt": "2020-12-10T10:07:23.825Z",
        "updatedAt": "2020-12-10T10:07:23.825Z",
        "__v": 0
    }
}
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 409 Conflict
    *   {
    "meta": {
        "code": 409,
        "message": "Data exists",
        "timestamp": "2020-12-10T10:02:45.911Z"
    }
}
*/

    //api to preview questionnaire 
    questionnaireRouter.post("/previewQuestionnaire", authenticate, questionnaireCtrl.previewQuestionnaire);
         /**
    * @api {post} /questionnaires/previewQuestionnaire Preview Questionnaire
    * @apiName Preview Questionnaire
    * @apiGroup Questionnaire
    * @apiDescription API for preview questionnaire
    * @apiUse Authenticate 
    * 
    * @apiParam {String} questionnaireId Questionnaire Id
    * 
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/questionnaires/previewQuestionnaire
    * @apiSampleRequest http://localhost:4200/api/v1/questionnaires/previewQuestionnaire
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    "meta": {
        "code": 200,
        "message": "Success",
        "timestamp": "2020-12-10T10:49:49.199Z"
    },
    "pagination": {},
    "data": {
        "_id": "5fd1f35be392204295efaeaf",
        "adminId": "5fd1e1669b7243379e261fc3",
        "title": "Leave policy",
        "description": "Leave policy details",
        "buttonTitle": "Accept",
        "buttonText": "I Agree",
        "checkBoxText": "I Agree",
        "startDate": "2020-12-09T00:00:00.000Z",
        "endDate": "2020-12-10T00:00:00.000Z",
        "reminder": 2,
        "pptFile": "/home/jayashree/server-policy-app/api/uploads/abc.ppt",
        "excelSheet": "endUser.xlsx",
        "mailBody": "Hi Please read and accept this policy"
    }
}
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 409 Conflict
    *   {
    "meta": {
        "code": 400,
        "message": "Required Parameter missing",
        "timestamp": "2020-12-10T10:57:06.922Z"
    }
}
*/

    //api to Publish Questionnaire 
    questionnaireRouter.post("/publishQuestionnaire", authenticate, questionnaireCtrl.publishQuestionnaire);
     /**
    * @api {post} /questionnaires/publishQuestionnaire Publish Questionnaire
    * @apiName Publish Questionnaire
    * @apiGroup Questionnaire
    * @apiDescription API for publish a questionnaire.
    * @apiUse Authenticate 
    * 
    * @apiParam {String} questionnaireId Questionnaire Id
    * 
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/questionnaires/publishQuestionnaire
    * @apiSampleRequest http://localhost:4200/api/v1/questionnaires/publishQuestionnaire
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{ 
        No data as response, Mail will be sent to end users.
    }
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 401 Unauthorized
    *     Unauthorized
*/

    //api to generate Report of questionnaire data
    questionnaireRouter.get("/generateReportQuestionnaire",authenticate, questionnaireCtrl.generateReportQuestionnaire);
         /**
    * @api {get} /questionnaires/generateReportQuestionnaire Generate Report
    * @apiName Generate Report
    * @apiGroup Questionnaire
    * @apiDescription API for generating questionnaire report.
    * @apiUse Authenticate 
    * 
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/questionnaires/generateReportQuestionnaire
    * @apiSampleRequest http://localhost:4200/api/v1/questionnaires/generateReportQuestionnaire
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{ 
        Report will be downloaded.
    }
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 401 Unauthorized
    *     Unauthorized
*/

    app.use("/api/v1/questionnaires", questionnaireRouter);
};