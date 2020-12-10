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

    //api to save Questionnaire Agreement Status as 'true'
    questionnaireAgreementStatusRouter.put("/acceptPolicy", authenticate, questionnaireAgreementStatusCtrl.acceptPolicy);
/**
* @api {put} /questionnaireAgreementStatus/acceptPolicy Update PolicyStatus
* @apiName Update PolicyStatus
* @apiGroup QuestionnaireAgreementStatus
* @apiDescription API to Update PolicyAgreementStatus
* @apiUse Authorizate
* @apiParam {String} questionnaireId questionnaire Id.
* @apiParamExample {json} Request-Example:
* {
    "questionnaireId":"5fd1e62b4cd3c851bd15c2d6"
}
*
*   @apiExample {curl} Example usage:
*   curl -i http://localhost:4200/api/v1/questionnaireAgreementStatus/acceptPolicy
*   @apiSampleRequest http://localhost:4200/api/v1/questionnaireAgreementStatus/acceptPolicy
*   @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
    "meta": {
    "code": 200,
    "message": "Success",
    "timestamp": "2020-11-12T04:47:52.234Z"
    },
    "pagination": {},
        "data": {
        "agreed": true,
        "_id": "5fd1a52a5905f31791aabd85",
        "userId": "5fd1a52a5905f31791aabd83",
        "questionnaireId": "5fd1852a2c38f10bb8597949"
    }
}
*
*
* @apiErrorExample Error-Response:
* HTTP/1.1 400 Bad Request
* {
    "meta": {
        "code": 404,
        "message": "No Records Found",
        "timestamp": "2020-12-10T12:07:03.917Z"
    }
}
*/
    
    app.use("/api/v1/questionnaireAgreementStatus", questionnaireAgreementStatusRouter);
};