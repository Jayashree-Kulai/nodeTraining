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
                        questionnaireObj.startDate = req.body.startDate;
                    }

                    if (req.body.endDate) {
                        if(req.body.endDate <= req.body.startDate) {
                            return utils.sendCustomError(req, res, "INVALID", "BAD_PARAMS");
                        }
                        questionnaireObj.endDate = req.body.endDate;
                    }

                    if (req.body.reminder) {
                        if(req.body.reminder < 0) {
                            return utils.sendCustomError(req, res, "INVALID", "BAD_PARAMS");
                        }
                        questionnaireObj.reminder = req.body.reminder;
                    }

                    // if (req.body.pptFile) {
                        questionnaireObj.pptFile = path.join(__dirname, "..", "uploads/") + req.body.pptFile;
                    // }

                    if (req.body.excelSheet) {
                        questionnaireObj.excelSheet = path.join(__dirname, "..", "uploads/") + req.body.excelSheet;
                    }

                    if (req.body.mailBody) {
                        questionnaireObj.mailBody = req.body.mailBody;
                    }

                    var query = {};
                    query.title = req.body.title;
                    let questionnaireData = await Questionnaires.getData(query);
                    console.log("Questionnaire data already exist with same title.........", questionnaireData)

                    if (questionnaireData) {
                        return utils.sendCustomError(req, res, "CONFLICT", "DATA_EXISTS")
                    }
                    else {
                        let data = await Questionnaires.addData(questionnaireObj);
                        console.log("________________data", data);
                        return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
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
                if(!req.body.questionnaireId) {
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

    // questionnaireCtrl.getQuestionnaires = async function (req, res) {
    //     try {
    //         if (req.user && req.user.isAdmin) {
    //             var queryObj = {};
    //             queryObj.query = {};
    //             if (req.query.adminId) {
    //                 queryObj.adminId = req.user._id;
    //             }
    //             //  console.log(queryObj)
    //             queryObj.options = {};
    //             if (req.query.limit) {
    //                 queryObj.options.limit = JSON.parse(req.query.limit)
    //             }
    //             if (req.query.skip) {
    //                 queryObj.options.skip = JSON.parse(req.query.skip);
    //             }
    //             if (req.query.sortField && req.query.sortOrder) {
    //                 var sortField = req.query.sortField;
    //                 var sortOrder = req.query.sortOrder;
    //                 queryObj.options.sort = { [`${sortField}`]: JSON.parse(sortOrder) };
    //             };
    //             if (req.query.searchText) {
    //                 queryObj.query.name = { $regex: req.query.searchText, $options: 'i' }
    //             };
    //             // queryObj.selectFields = 'Title Description Button_Title Button_Text Check_Box_Text  ';
    //             queryObj.selectFields = '-mailBody';
    //             let data = await Questionnaires.getLists(queryObj);
    //             let count = await Questionnaires.getCount(queryObj.query);
    //             return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS", count);
    //         } else {
    //             return utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED")
    //         }
    //     } catch (error) {
    //         return utils.sendDBCallbackErrs(req, res, error, null);
    //     }
    // }

    questionnaireCtrl.publishQuestionnaire = async function (req, res) {
        try {
            if (req.user && req.user.isAdmin) {

                var questionnaireObj = {};

                if (req.body.questionnaireId) {
                    questionnaireObj.questionnaireId = req.body.questionnaireId;
                }

                let data = await Questionnaires.getDataById(questionnaireObj.questionnaireId);
                console.log("questionnire data.......", data);
                var mailBody = data.mailBody;
                // var filename= data.Select_Participant_XL_Sheet;
                // var datafile = path.join(__dirname, "..", "uploads/") + filename;
                var datafile = data.excelSheet;
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
                    //var sub = "Read and Accept the Policy";
                    //var link = "http://localhost:4000/policy.robosoftin.com/questionnaires?" + questionnaireObj.Questionnaire_id;
                    
                    console.log("user obj.....", userObj)

                    let data = await Users.addData(userObj);

                    //var intro ="Username: "+data.email+",Password: "+userPassword +",Please use this credential to login into Invision";
                    questionnaireAgreementStatusObj.userId = data._id;
                    questionnaireAgreementStatusObj.questionnaireId = req.body.questionnaireId;
                    let questionnaireAgreementStatusData = await QuestionnaireAgreementStatus.addData(questionnaireAgreementStatusObj);
                    console.log("added data--->",questionnaireAgreementStatusData)
                    //await utils.sendMail(data.name,data.email, intro, sub, link);
                    await utils.sendPublishMail(userObj.name, userObj.mailId, mailBody);
                });
            } else {
                return utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED")
            }

        } catch (error) {
            console.log("____________Err", error)
            return utils.sendDBCallbackErrs(req, res, error, null);
        }

    }

    questionnaireCtrl.generateReportQuestionnaire = async function (req, res) {
        if (req.user && req.user.isAdmin) {
            console.log("Downloading user collection");
            var queryObj = {};
            queryObj.query = {};

            queryObj.options = {};

            queryObj.populate = ([{ path: 'userId', select: 'name mailId employeeCode' }])

            queryObj.selectFields = 'questionnaireId agreed';
            let data = await QuestionnaireAgreementStatus.getLists(queryObj);

            var xlsData = [];
            if (data.length > 0) {
                data.forEach(element => {
                    console.log("Current Element------>", element);;
                    //console.log("Current Element of user mail------>", element.userId.name);
                    console.log("Current Element of Questionnaire_Id------>", element.questionnaireId);
                    //var questionnaireId = element.questionnaireId;
                    //console.log("Current Element of Questionnaire_Id------>", Questionnaireid);
                    xlsData.push({ "Name": element.userId.name, "E-mail": element.userId.mailId, "Employee_code": element.userId.employeeCode ,"Policy_Id" : element.questionnaireId, "Policy_Status" : element.agreed});
                });
            }
            try {
                var xls = json2xls(xlsData);
                fs.writeFile(path.join(__dirname + '/../downloads') + '/report.xlsx', xls, 'binary', function (err) {
                    res.download(path.join(__dirname + '/../downloads') + '/report.xlsx', function (err) {
                        if (err) {
                            console.log("Error");
                            console.log(err);
                        } else {
                            console.log("Success");
                            //utils.sendCustomError(req, res, "SUCCESS", "SUCCESS")
                            fs.unlink(path.join(__dirname + '/../downloads') + '/report.xlsx', function (err) {
                                if (err) {
                                    console.error(err);
                                }
                                console.log('Temp File Delete');
                            });
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

    questionnaireCtrl.remindQuestionnaire = async function (req, res) {
        try {          
                // var questionnaireObj = {};
                // if (req.body.Questionnaire_id) {
                //     questionnaireObj.Questionnaire_id = req.body.Questionnaire_id;
                // }
                // let data = await Questionnaires.getDataById(questionnaireObj.Questionnaire_id);
                // console.log("questionnire data.......", data);
                // var filename= data.Select_Participant_XL_Sheet;
                // var datafile = path.join(__dirname, "..", "uploads/") + filename;
                var datafile = path.join(__dirname, "..", "uploads/") + 'END_USERS.xlsx';
                var dataExcel = await utils.readexcelsheet(datafile)
                console.log("dataExcel...........", dataExcel)

                var userObj = {};
                dataExcel.forEach(async function (user) {
                    userObj.mailId = user.EMAIL;
                    
                    var sub = "Reminder";
                    var link = "https://projects.invisionapp.com/d/main?origin=v7#/console/20430572/432692886/preview?scrollOffset=0";
                    var intro ="Please Complete the Policy Process within a Due Date";

                    console.log("user obj.....", userObj)

                    let data = await Users.getData(userObj);
                    utils.sendReminderMail(data.name, data.mailId, data.password);
                });
        } catch (error) {
            console.log("____________Err", error)
            return utils.sendDBCallbackErrs(req, res, error, null);
        }

    }



    return questionnaireCtrl;
};