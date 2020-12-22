/**
 * Project          : Invision Policy App
 * Module           : User Controller File
 * Source filename  : user.js
 * Description      : This file defines all the operation for User module.
 * Author           : Jayashree Kulai
 */

"use strict";
const util = require("../utils/util");
var Busboy = require('busboy');
var fs = require('fs');
var path = require('path');
var json2xls = require('json2xls');
const user = require("../routes/user");
//Here we’re assigning the functions  we want to export to an exports property on module
module.exports = function (mongoose, utils, config, constants, logger) {

    var Users = mongoose.model('Users');
    var QuestionnaireAgreementStatus = mongoose.model('QuestionnaireAgreementStatus');
    var userCtrl = {}

    userCtrl.createUser = async function (req, res, pathName) {
        try {
            var dataExcel = await utils.readexcelsheet(pathName);
            console.log("dataExcel...........", dataExcel)

            dataExcel.forEach(async function (user) {
                var userObj = {};
                userObj.mailId = user.EMAIL;
                userObj.name = user.NAME;
                userObj.employeeCode = user.EMPLOYEE_CODE;
                userObj.password = utils.generatePassword();
                console.log("UserObj before adding->", userObj);
                var query = {};
                query.mailId = user.EMAIL;
                let data = await Users.getData(query);
                if (data) {
                    console.log("This user already exists in user collection,---", data);
                }

                else {
                    utils.sendMail(userObj.name, userObj.mailId, userObj.password);
                    console.log("userObj.password.....", userObj.password)

                    userObj.password = utils.encryptPassword(userObj.password);

                    console.log("Encrypted password.....", userObj.password)

                    let data = await Users.addData(userObj);
                    console.log("Data added to successfully to user collection---", data);
                }
                //utils.sendCustomError(req, res, "SUCCESS", "SUCCESS")
            })

        } catch (error) {
            console.log("____________Err", error);
            return utils.sendDBCallbackErrs(req, res, err, data);
        }
    }

    userCtrl.addAdmin = async function (req, res) {
        try {
            if (req.user) {
                if (!req.user.isSuperAdmin) {
                    return utils.sendCustomError(req, res, "FORBIDDEN", "ACCESS_DENIED")
                }

                if (!req.body.name || !req.body.employeeCode || !req.body.mailId) {
                    return utils.sendCustomError(req, res, "BAD_PARAMS", "PARAMS_MISSING")
                }

                var userObj = {};
                userObj.name = req.body.name;
                userObj.employeeCode = req.body.employeeCode;
                userObj.mailId = req.body.mailId;
                userObj.isAdmin = true;
                var defaultPassword = utils.generatePassword();
                userObj.password = utils.encryptPassword(defaultPassword);

                let data = await Users.addData(userObj);
                if (!data) {
                    return utils.sendCustomError(req, res, "HTTP_ERR", "DB_ERR");
                }

                utils.sendMailForAdmin(userObj.name, userObj.mailId, defaultPassword);               
                var displayData = "Admin added Successfully........!!!!!";
                return utils.sendResponse(req, res, displayData, "SUCCESS", "SUCCESS");
            }


        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    userCtrl.updateAdmin = async function (req, res) {
        try {
            if (req.user) {
                if (!req.user.isSuperAdmin) {
                    return utils.sendCustomError(req, res, "FORBIDDEN", "ACCESS_DENIED")
                }

                if (!req.body.mailId) {
                    return utils.sendCustomError(req, res, "BAD_PARAMS", "PARAMS_MISSING")
                }
                var query = {};
                query.mailId = req.body.mailId;
                let data = await Users.getData(query);
                if (!data) {
                    return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
                } else {
                    var userObj = {};

                    if (req.body.name) {
                        userObj.name = req.body.name;
                    }

                    if (req.body.employeeCode) {
                        userObj.employeeCode = req.body.employeeCode;
                    }

                    data = await Users.updateDataById(data._id, userObj);
                    var displayData = "Admin data updated Successfully........!!!!!";
                    return utils.sendResponse(req, res, displayData, "SUCCESS", "SUCCESS");
                }
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    userCtrl.deleteAdmin = async function (req, res) {
        try {
            if (req.user) {
                if (!req.user.isSuperAdmin) {
                    return utils.sendCustomError(req, res, "FORBIDDEN", "ACCESS_DENIED")
                }

                if (!req.body.mailId) {
                    return utils.sendCustomError(req, res, "BAD_PARAMS", "PARAMS_MISSING")
                }
                var query = {};
                query.mailId = req.body.mailId;
                let data = await Users.getData(query);
                if (!data || data.isAdmin === false) {
                    return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
                } else {
                    data.isAdmin = false;
                    data = await Users.updateDataById(data._id, { isAdmin: data.isAdmin });
                    var displayData = data.name + " is not an admin anymore !!!";
                    return utils.sendResponse(req, res, displayData, "SUCCESS", "SUCCESS");
                }
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    userCtrl.addSuperAdmin = async function (req, res) {
        try {
            if (req.user) {
                if (!req.user.isSuperAdmin) {
                    return utils.sendCustomError(req, res, "FORBIDDEN", "ACCESS_DENIED")
                }

                if (!req.body.name || !req.body.employeeCode || !req.body.mailId) {
                    return utils.sendCustomError(req, res, "BAD_PARAMS", "PARAMS_MISSING")
                }

                var userObj = {};
                userObj.name = req.body.name;
                userObj.employeeCode = req.body.employeeCode;
                userObj.mailId = req.body.mailId;
                userObj.isSuperAdmin = true;
                var defaultPassword = utils.generatePassword();
                userObj.password = utils.encryptPassword(defaultPassword);

                let data = await Users.addData(userObj);
                if (!data) {
                    return utils.sendCustomError(req, res, "HTTP_ERR", "DB_ERR");
                }

                utils.sendMailForSuperAdmin(userObj.name, userObj.mailId, defaultPassword);
                var displayData = "SuperAdmin added Successfully........!!!!!";
                return utils.sendResponse(req, res, displayData, "SUCCESS", "SUCCESS");
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    userCtrl.updateSuperAdmin = async function (req, res) {
        try {
            if (req.user) {
                if (!req.user.isSuperAdmin) {
                    return utils.sendCustomError(req, res, "FORBIDDEN", "ACCESS_DENIED")
                }

                if (!req.body.mailId) {
                    return utils.sendCustomError(req, res, "BAD_PARAMS", "PARAMS_MISSING")
                }
                var query = {};
                query.mailId = req.body.mailId;
                let data = await Users.getData(query);
                if (!data) {
                    return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
                } else {
                    var userObj = {};

                    if (req.body.name) {
                        userObj.name = req.body.name;
                    }

                    if (req.body.employeeCode) {
                        userObj.employeeCode = req.body.employeeCode;
                    }

                    data = await Users.updateDataById(data._id, userObj);
                    var displayData = "SuperAdmin data updated Successfully........!!!!!";
                    return utils.sendResponse(req, res, displayData, "SUCCESS", "SUCCESS");
                }
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    userCtrl.deleteSuperAdmin = async function (req, res) {
        try {
            if (req.user) {
                if (!req.user.isSuperAdmin) {
                    return utils.sendCustomError(req, res, "FORBIDDEN", "ACCESS_DENIED")
                }

                if (!req.body.mailId) {
                    return utils.sendCustomError(req, res, "BAD_PARAMS", "PARAMS_MISSING")
                }
                var query = {};
                query.mailId = req.body.mailId;
                let data = await Users.getData(query);
                if (!data) {
                    return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
                } else {
                    data.isSuperAdmin = false;
                    data = await Users.updateDataById(data._id, { isSuperAdmin: data.isSuperAdmin });
                    var displayData = data.name + " is not a super admin anymore !!!";
                    return utils.sendResponse(req, res, displayData, "SUCCESS", "SUCCESS");
                }
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    userCtrl.uploadFile = async function (req, res, params) {
        // console.log("req...file...",res);
        if (req.method === 'POST') {

            // Create an Busyboy instance passing the HTTP Request headers.
            var busboy = new Busboy({ headers: req.headers });

            // Listen for event when Busboy finds a file to stream.
            busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
                var saveTo = path.join(__dirname + '/../uploads', path.basename(filename));
                userCtrl.createUser(req, res, saveTo);
                file.pipe(fs.createWriteStream(saveTo));

                // We are streaming! Handle chunks
                file.on('data', function (data) {
                    console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
                    // Here we can act on the data chunks streamed.
                });

                // Completed streaming the file.
                file.on('end', function () {
                    console.log('Finished with ' + fieldname);
                    console.log("file name ........", filename);

                });
            });

            // Listen for event when Busboy finds a non-file field.
            busboy.on('field', function (fieldname, val) {
                console.log("Non-file field found");
                // Do something with non-file field.
            });

            // Listen for event when Busboy is finished parsing the form.
            busboy.on('finish', function () {
                res.statusCode = 200;
                res.end();
            });

            // Pipe the HTTP Request into Busboy.
            req.pipe(busboy);

        }
    };

    userCtrl.downloadFile = async function (req, res) {
        console.log("Downloading user collection");
        var queryObj = {};
        queryObj.query = {};

        queryObj.options = {};

        queryObj.selectFields = 'name mailId';
        //queryObj.populate = { path: 'category', select: 'name' }
        console.log(queryObj)
        let data = await Users.getLists(queryObj);

        var xlsData = [];
        if (data.length > 0) {
            data.forEach(element => {
                console.log("Current Element------>", element);;
                xlsData.push({ "Name": element.name, "E-mail": element.mailId });
            });
        }
        try {
            var xls = json2xls(xlsData);
            fs.writeFile(path.join(__dirname + '/../downloads') + '/report.xlsx', xls, 'binary', function (err) {
                res.download(path.join(__dirname + '/../downloads') + '/report.xlsx', function (err) {
                    if (err) {
                        console.log("Error");
                        console.log(err);
                    }
                    else {
                        console.log("Success");
                        fs.unlink(path.join(__dirname + '/../downloads') + '/report.xlsx', function (err) {
                            if (err) {
                                console.error(err);
                            }
                            console.log('Temp File Delete');
                        });
                    }
                });
            });
        }
        catch (err) {
            console.error(err);
        }
    }

    userCtrl.loginUser = async function (req, res) {
        try {
            var query = {};
            query.name = req.headers.name;
            query.password = utils.encryptPassword(req.headers.password);
            console.log("Encrpted password---------->", query.password);
            let data = await Users.getData(query);
            console.log("------->data", data)
            if (!data) {
                return utils.sendCustomError(req, res, "HTTP_ERR", "USER_NOT_EXISTS")
            } else {
                data.token = await utils.generateBearerToken();
                data.tokenExpiry = await utils.generateExpiryTime();
                data = await Users.updateDataById(data._id, { token: data.token, tokenExpiry: data.tokenExpiry });
                var displayData = {};
                displayData.token = data.token;
                displayData.tokenExpiry = data.tokenExpiry;
                return utils.sendResponse(req, res, displayData, "SUCCESS", "SUCCESS");
            }

        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    userCtrl.logoutUser = async function (req, res) {
        try {
            if (req.user) {
                var query = {};
                query.name = req.user.name;
                let data = await Users.getData(query);
                if (!data) {
                    return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
                } else {
                    data.token = null;
                    data.tokenExpiry = null
                    data = await Users.updateDataById(data._id, { token: data.token, tokenExpiry: data.tokenExpiry });
                    var displayData = "LogOut Success";
                    return utils.sendResponse(req, res, displayData, "SUCCESS", "SUCCESS");
                }
            }

        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    userCtrl.sendPasswordUpdateLink = async function (req, res) {
        try {
            if (!req.headers.name) {
                return utils.sendCustomError(req, res, "BAD_PARAMS", "PARAMS_MISSING")
            }
            var query = {};
            query.name = req.headers.name;
            let user = await Users.getData(query);
            if (!user) {
                return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS");
            } else {
                var passwordUpdateLink = "https://projects.invisionapp.com/share/UVYGK8TWQJZ#/screens/432694629";
                await utils.sendPasswordUpdationLinkMail(user.name, user.mailId, passwordUpdateLink);
                var displayData = "Password updation link sent to "+  user.mailId;
                return utils.sendResponse(req, res, displayData, "SUCCESS", "SUCCESS");
            }

        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    userCtrl.changePassword = async function (req, res) {
        try {
            if (req.user) {
                console.log("user details->", req.user);
                var query = {};
                query.name = req.user.name;
                let data = await Users.getData(query);

                if (!data) {
                    return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS");
                } else {
                    var userObj = {};
                    if (req.headers.password) {
                        userObj.password = utils.encryptPassword(req.headers.password);
                    }
                    else {
                        return utils.sendCustomError(req, res, "HTTP_ERR", "PARAM_MISSING")
                    }
                    data = await Users.updateDataById(data._id, userObj);
                    if (data) {
                        var displayData = "Password updated successfully"
                        return utils.sendResponse(req, res, displayData, "SUCCESS", "SUCCESS");
                    }
                   
                }
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    userCtrl.getPendingAgreements = async function (req, res) {
        try {
            var query = {};
            query.name = req.user.name;
            let data = await Users.getData(query);
            var queryObj = {};
            queryObj.query = {};
            queryObj.query.userId = data._id;
            queryObj.options = {};
            queryObj.populate = ([{ path: 'userId', select: 'name mailId employeeCode' }])
            let questionnaireAgreementStatusData = await QuestionnaireAgreementStatus.getLists(queryObj);
            console.log("QuestionnaireAgreementStatus--->", questionnaireAgreementStatusData);
            let pendingAgreements = [];
            questionnaireAgreementStatusData.forEach(async function (agreement) {
                if (agreement.agreed == false) {
                    console.log("Pending ---->", agreement);
                    pendingAgreements.push(agreement);
                }
            })
            return utils.sendResponse(req, res, pendingAgreements, "SUCCESS", "SUCCESS");
        } catch (error) {
            console.log("____________Err", error)
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }

    return userCtrl;
}