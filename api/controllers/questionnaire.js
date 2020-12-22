/**
 * Project          : Invision Policy App
 * Module           : Questionnaire Controller File
 * Source filename  : questionnaire.js
 * Description      : This file defines all the operation for Questionnaire module.
 * Author           : Jayashree Kulai
 */

const util = require("../utils/util");
var path = require('path');
var json2xls = require('json2xls');
var fs = require('fs');
module.exports = function (mongoose, utils, config, constants, logger) {

    var Questionnaires = mongoose.model('Questionnaires');
    var QuestionnaireAgreementStatus = mongoose.model('QuestionnaireAgreementStatus');
    var Users = mongoose.model('Users');

    var questionnaireCtrl = {}

    questionnaireCtrl.addQuestionnaire = async function (req, res) {
        try {
            if (req.user) {
                if (!req.user.isAdmin) {
                    return utils.sendCustomError(req, res, "FORBIDDEN", "ACCESS_DENIED")
                }
                else {
                    var questionnaireObj = {};

                    questionnaireObj.adminId = req.user._id;

                    if (req.body.title) {
                        questionnaireObj.title = req.body.title;
                    }

                    if (req.body.description) {
                        questionnaireObj.description = req.body.description;
                    }

                    if (req.body.buttonTitle) {
                        questionnaireObj.buttonTitle = req.body.buttonTitle;
                    }

                    if (req.body.buttonText) {
                        questionnaireObj.buttonText = req.body.buttonText;
                    }

                    if (req.body.checkBoxText) {
                        questionnaireObj.checkBoxText = req.body.checkBoxText;
                    }

                    if (req.body.startDate) {
                        var startDate = new Date(req.body.startDate)
                        var currentDate = new Date();

                        if (startDate < currentDate) {
                            return utils.sendCustomError(req, res, "INVALID", "BAD_PARAMS");
                        }
                        questionnaireObj.startDate = req.body.startDate;
                    }

                    if (req.body.endDate) {
                        if (req.body.endDate <= req.body.startDate) {
                            return utils.sendCustomError(req, res, "INVALID", "BAD_PARAMS");
                        }
                        questionnaireObj.endDate = req.body.endDate;
                    }

                    if (req.body.reminder) {
                        if (req.body.reminder < 0) {
                            return utils.sendCustomError(req, res, "INVALID", "BAD_PARAMS");
                        }

                        var diffDays = Math.ceil((new Date(req.body.endDate) - new Date(req.body.startDate)) / (1000 * 60 * 60 * 24));

                        if (req.body.reminder <= diffDays) {
                            questionnaireObj.reminder = req.body.reminder;
                        } else {
                            return utils.sendCustomError(req, res, 'INVALID', 'BAD_PARAMS');
                        }
                        questionnaireObj.reminder = req.body.reminder;
                    }

                    if (req.body.pptFile) {
                        questionnaireObj.pptFile = path.join(__dirname, "..", "uploads/") + req.body.pptFile;
                    }

                    if (req.body.excelSheet) {
                        questionnaireObj.excelSheet = path.join(__dirname, "..", "uploads/") + req.body.excelSheet;
                    }

                    if (req.body.mailBody) {
                        questionnaireObj.mailBody = req.body.mailBody;
                    }

                    let data = await Questionnaires.addData(questionnaireObj);
                    if (data) {
                        var displaydata = " New questionnaire created with the id : " + data._id;
                        return utils.sendResponse(req, res, displaydata, "SUCCESS", "SUCCESS");
                    }


                }
            }
            else {
                return utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED")
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }

    }

    questionnaireCtrl.previewQuestionnaire = async function (req, res) {
        try {
            if (req.user && req.user.isAdmin) {
                if (!req.body.questionnaireId) {
                    return utils.sendCustomError(req, res, "BAD_PARAMS", "PARAMS_MISSING")
                }
                var query = {};
                query._id = req.body.questionnaireId;
                let data = await Questionnaires.getDataById(query._id);

                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
            } else {
                return utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED")
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    questionnaireCtrl.publishQuestionnaire = async function (req, res) {
        try {
            if (req.user && req.user.isAdmin) {

                var questionnaireObj = {};

                if (req.body.questionnaireId) {
                    questionnaireObj.questionnaireId = req.body.questionnaireId;
                }

                let questionnaireData = await Questionnaires.getDataById(questionnaireObj.questionnaireId);
                console.log("questionnire data.......", questionnaireData);
                var mailBody = questionnaireData.mailBody;
                var datafile = questionnaireData.excelSheet;
                var dataExcel = await utils.readexcelsheet(datafile)
                console.log("dataExcel...........", dataExcel)

                var userObj = {};
                var questionnaireAgreementStatusObj = {};
                dataExcel.forEach(async function (user) {
                    userObj.mailId = user.EMAIL;
                    userObj.name = user.NAME;
                    userObj.employeeCode = user.EMPLOYEE_CODE;
                    userObj.password = utils.generatePassword();
                    var userPassword = userObj.password;
                    console.log("userObj.password.....", userPassword)

                    userObj.password = utils.encryptPassword(userObj.password);

                    console.log("user obj.....", userObj)
                    var query = {};
                    query.mailId = user.EMAIL;
                    let data = await Users.getData(query);

                    questionnaireAgreementStatusObj.userId = data._id;
                    questionnaireAgreementStatusObj.questionnaireId = req.body.questionnaireId;
                    let questionnaireAgreementStatusData = await QuestionnaireAgreementStatus.addData(questionnaireAgreementStatusObj);
                    console.log("Added data to questionnaireAgreementStatus collection--->", questionnaireAgreementStatusData)
                    await utils.sendPublishMail(userObj.name, userObj.mailId, questionnaireData);
                });
            } else {
                return utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED")
            }

        } catch (error) {
            console.log("____________Err", error)
            return utils.sendDBCallbackErrs(req, res, error, null);
        }

    }

    questionnaireCtrl.remindQuestionnaire = async function (req, res) {
        try {
            if (!req.body.questionnaireId) {
                return utils.sendCustomError(req, res, "BAD_PARAMS", "PARAMS_MISSING")
            }

            let questionnaireData = await Questionnaires.getDataById(req.body.questionnaireId);

            if (questionnaireData) {
                console.log("questionnire data.......", questionnaireData);
                var questionnaireObj = {};
                questionnaireObj.autoReminder = true;
                let data = await Questionnaires.updateDataById(req.body.questionnaireId, questionnaireObj);

                if (data) {
                    var displayData = "Auto reminder added successfuly";
                    return utils.sendResponse(req, res, displayData, "SUCCESS", "SUCCESS");
                }
            }
        } catch (error) {
            console.log("____________Err", error)
            return utils.sendDBCallbackErrs(req, res, error, null);
        }

    }

    questionnaireCtrl.sendReminder = async function (req, res) {
        try {
            var queryObj = {};
            queryObj.query = {};
            queryObj.options = {};
            let data = await Questionnaires.getLists(queryObj);
            console.log("All Questionnaires------->", data)
            data.forEach(async function (questionnaire) {
                if (questionnaire.autoReminder) {
                    var currentDate = new Date();
                    var startDate = new Date(questionnaire.startDate);
                    var endDate = new Date(questionnaire.endDate);
                    var dateGap = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));
                    console.log("date gap..........", dateGap);
                    if (dateGap % questionnaire.reminder == 0) {
                        if (startDate <= currentDate && currentDate <= endDate) {
                            var queryObj = {};
                            queryObj.query = {};
                            queryObj.query.questionnaireId = questionnaire._id;
                            queryObj.options = {};
                            queryObj.populate = ([{ path: 'userId', select: 'name mailId employeeCode' }])
                            let questionnaireAgreementStatusData = await QuestionnaireAgreementStatus.getLists(queryObj);

                            console.log("QuestionnaireAgreementStatus--->", questionnaireAgreementStatusData);

                            questionnaireAgreementStatusData.forEach(async function (user) {
                                if (user.agreed == false) {
                                    utils.sendReminderMail(user.userId.name, user.userId.mailId, questionnaire);
                                }
                            })
                            console.log("*********************************************")
                        }
                    }
                }

            });

        } catch (error) {
            console.log("____________Err", error)
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    questionnaireCtrl.generateReportQuestionnaire = async function (req, res) {
        if (req.user && req.user.isAdmin) {
            console.log("Downloading QuestionnaireAgreementStatus collection");

            var questionnaireObj = {};
            if (req.body.questionnaireId) {
                questionnaireObj.questionnaireId = req.body.questionnaireId;
            }
            var queryObj = {};
            queryObj.query = {};
            queryObj.options = {};
            queryObj.populate = ([{ path: 'userId', select: 'name mailId employeeCode' }])

            queryObj.selectFields = 'questionnaireId agreed';
            let data = await QuestionnaireAgreementStatus.getLists(queryObj);

            var xlsData = [];
            if (data.length > 0) {
                data.forEach(element => {
                   if (element.questionnaireId == questionnaireObj.questionnaireId) {
                        console.log("Current Element------>", element);
                        xlsData.push({
                            "Name": element.userId.name, "E-mail": element.userId.mailId,
                            "Employee_code": element.userId.employeeCode, "Policy_Id": element.questionnaireId,
                            "Policy_Status": element.agreed
                        });
                    }

                });
            }
            try {
                var xls = json2xls(xlsData);
                var time = new Date().toISOString().replace(/T/,' ').replace(/\..+/, '');
                var filename= questionnaireObj.questionnaireId + "-" + time;
                console.log("filename==",filename)
                fs.writeFile(path.join(__dirname + '/../downloads') + '/' + filename + '.xlsx', xls, 'binary', function (err) {
                    res.download(path.join(__dirname + '/../downloads') + '/' + filename  + '.xlsx', function (err) {
                        if (err) {
                            console.log("Error");
                            console.log(err);
                        } else {
                            console.log("Success");
                            // utils.sendCustomError(req, res, "SUCCESS", "SUCCESS")
                            // fs.unlink(path.join(__dirname + '/../downloads') + '/report.xlsx', function (err) {
                            //     if (err) {
                            //         console.error(err);
                            //     }
                            //     console.log('Temp File Delete');
                            // });
                        }
                    });
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            //  utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED")
        }
    }

    return questionnaireCtrl;
};