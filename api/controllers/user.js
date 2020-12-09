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
//Here we’re assigning the functions  we want to export to an exports property on module
module.exports = function (mongoose, utils, config, constants, logger) {

    var Users = mongoose.model('Users');
    var userCtrl = {}

    userCtrl.createUser = async function (req, res) {
        try {
            var userObj = {};

            var dataExcel = await utils.readexcelsheet(req.file.path);
            console.log("dataExcel...........", dataExcel)

            dataExcel.forEach(async function (user) {
                userObj.mailId = user.EMAIL;
                userObj.name = user.NAME;
                userObj.employeeCode = user.EMPLOYEE_CODE;
                userObj.password = utils.generatePassword();

                utils.sendMail(userObj.name, userObj.mailId, userObj.password);
                console.log("userObj.password.....", userObj.password)

                userObj.password = utils.encryptPassword(userObj.password);

                console.log("Encrypted password.....", userObj.password)

                console.log("user obj.....", userObj)

                let data = await Users.addData(userObj);

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
                console.log("new admin details--->", data);
                utils.sendMail(userObj.name, userObj.mailId, defaultPassword);
                console.log("Default password.....", defaultPassword)

                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
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
                console.log("New superAdmin details--->", data);
                utils.sendMail(userObj.name, userObj.mailId, defaultPassword);
                console.log("Default password.....", defaultPassword)

                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
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
                if (!data) {
                    return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
                } else {
                    data.isAdmin = false;
                    data = await Users.updateDataById(data._id, { isAdmin : data.isAdmin });
                    return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
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
                    data = await Users.updateDataById(data._id, { isSuperAdmin : data.isSuperAdmin });
                    return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
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
                return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
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
                    return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
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
                return utils.sendResponse(req, res, user, "SUCCESS", "SUCCESS");
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
                    return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
                }
            }
        } catch (error) {
            return utils.sendDBCallbackErrs(req, res, error, null);
        }
    }




    // userCtrl.getUser = async function (req, res) {
    //     try {
    //         let data = await Users.getDataById(req.params.userId);
    //         if (!data) {
    //             return utils.sendCustomError(req, res, "HTTP_ERR", "USER_NOT_EXISTS")
    //         } else {
    //             return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
    //         }

    //     } catch (error) {
    //         return utils.sendDBCallbackErrs(req, res, error, null);
    //     }


    // }

    // userCtrl.getUsers = async function (req, res) {

    //     try {
    //         var queryObj = {};
    //         queryObj.query = {};

    //         queryObj.options = {};

    //         if (req.query.limit) {
    //             queryObj.options.limit = JSON.parse(req.query.limit)
    //         }
    //         if (req.query.skip) {
    //             queryObj.options.skip = JSON.parse(req.query.skip);
    //         }

    //         if (req.query.sortField && req.query.sortOrder) {
    //             console.log("------------------sortField", req.query.sortField, req.query.sortOrder);
    //             var sortField = req.query.sortField;
    //             var sortOrder = req.query.sortOrder;
    //             queryObj.options.sort = { [`${sortField}`]: JSON.parse(sortOrder) };
    //         };

    //         if (req.query.searchText) {
    //             queryObj.query.name = { $regex: req.query.searchText, $options: 'i' }
    //         };

    //         queryObj.selectFields = 'name logo category';
    //         queryObj.populate = { path: 'category', select: 'name' }
    //         console.log(queryObj)

    //         let data = await Users.getLists(queryObj);
    //         let count = await Users.getCount(queryObj.query);
    //         return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS",);


    //     } catch (error) {
    //         return utils.sendDBCallbackErrs(req, res, error, null);
    //     }


    // }
    // userCtrl.updateUser = async function (req, res) {
    //     try {
    //         var userObj = {};

    //         if (req.body.name) {
    //             userObj.name = req.body.name;
    //         }
    //         if (req.body.email) {
    //             userObj.email = req.body.email;
    //         }
    //         if (req.body.password) {
    //             userObj.password = req.body.password;
    //         }
    //         if (req.body.gender) {
    //             userObj.gender = req.body.gender;
    //         }
    //         if (req.body.location) {
    //             userObj.location = req.body.location;
    //         }
    //         if (req.body.phone) {
    //             userObj.phone = req.body.phone;
    //         }
    //         if (req.file && req.file.originalname) {
    //             userObj.profilePicture = req.file.originalname;
    //         }
    //         if (req.body.userType) {
    //             userObj.userType = req.body.userType;
    //         }

    //         let data = await Users.updateDataById(req.params.userId, userObj);
    //         if (!data) {
    //             return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
    //         } else {
    //             return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
    //         }

    //     } catch (error) {
    //         return utils.sendDBCallbackErrs(req, res, error, null);
    //     }
    // }

    // userCtrl.deleteUser = async function (req, res) {
    //     try {
    //         let data = await Users.removeDataById(req.params.userId);
    //         if (!data) {
    //             return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
    //         } else {
    //             return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS");
    //         }
    //     } catch (error) {
    //         return utils.sendDBCallbackErrs(req, res, error, null);
    //     }

    // }


    // userCtrl.getUsersCount = async function (req, res) {
    //     logger.info("--------------Get user count method-------------");
    //     try {
    //         let data = await Users.aggregate([
    //             {
    //                 $group: {
    //                     _id: '$category',
    //                     count: { $sum: 1 }
    //                 }
    //             }
    //         ]);

    //         logger.info("----data", data)
    //         return utils.sendResponse(req, res, data, "SUCCESS", "SUCCESS",);
    //     } catch (error) {
    //         console.log("------err", error)
    //         return utils.sendDBCallbackErrs(req, res, error, null);
    //     }
    // }

    // userCtrl.sendOtp = async function (req, res) {
    //     try {
    //         if (!req.body.email) {
    //             return utils.sendCustomError(req, res, "BAD_PARAMS", "PARAMS_MISSING")
    //         }
    //         var query = {};
    //         query.email = req.body.email;
    //         let user = await Users.getData(query);
    //         if (!user) {
    //             return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS");
    //         } else {
    //             var updateQuery = {
    //                 emailVerificationCode: utils.generateOtp(),
    //                 otpExpiry: utils.generateOtpExpiryTime()
    //             };
    //             user = await Users.updateData(query, updateQuery);
    //             await utils.sendMail(user.name, user.email, user.emailVerificationCode);
    //             return utils.sendResponse(req, res, user, "SUCCESS", "SUCCESS");
    //         }

    //     } catch (error) {
    //         return utils.sendDBCallbackErrs(req, res, error, null);
    //     }

    // }

    // userCtrl.verifyOtp = async function (req, res) {
    //     try {
    //         if (!req.body.email) {
    //             return utils.sendCustomError(req, res, "BAD_PARAMS", "PARAMS_MISSING")
    //         }
    //         var query = {};
    //         query.email = req.body.email;
    //         query.emailVerificationCode = req.body.otp;
    //         let user = await Users.getData(query);
    //         if (!user) {
    //             return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS");
    //         } else {
    //             if (user.otpExpiry >= new Date()) {
    //                 var updateQuery = {
    //                     emailVerificationCode: '',
    //                     otpExpiry: ''
    //                 };
    //                 user = await Users.updateData(query, updateQuery);
    //                 if (!user) {
    //                     return utils.sendCustomError(req, res, "HTTP_ERR", "DATA_NOT_EXISTS")
    //                 } else {

    //                     return utils.sendResponse(req, res, user, "SUCCESS", "SUCCESS");
    //                 }

    //             } else {
    //                 return utils.sendCustomError(req, res, "HTTP_ERR", "OTP_EXPIRED");
    //             }
    //         }

    //     } catch (error) {
    //         return utils.sendDBCallbackErrs(req, res, error, null);
    //     }
    // }

    // userCtrl.refreshAccessToken = async function (req, res) {
    //     try {
    //         let refreshToken = req.headers['authorization'];
    //         if (!refreshToken) {
    //             return utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED");
    //         } else {
    //             let decodedData = await utils.verifyToken(refreshToken);

    //             if (decodedData && decodedData.exp <= new Date()) {
    //                 return utils.sendCustomError(req, res, "BAD_REQUEST", "TOKEN_EXPIRED");
    //             } else {
    //                 let userId = decodedData._id;
    //                 let user = await Users.getDataById(userId);
    //                 console.log("user--------->", user);
    //                 if (!user) {
    //                     return utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED");
    //                 }

    //                 if (decodedData.isRefresh === true) {
    //                     var payload = {
    //                         _id: user._id,
    //                         exp: await utils.generateExpiryTime()
    //                     }
    //                     user.token = await utils.generateToken(payload);
    //                     // var refreshPayload = {
    //                     //     _id: data._id,
    //                     //     exp: await utils.generateRefreshTokenExpiry()
    //                     // }
    //                     // data.refreshToken = await utils.generateRefreshToken(refreshPayload);
    //                     user.refreshToken = refreshToken;
    //                     return utils.sendResponse(req, res, user, "SUCCESS", "SUCCESS");

    //                 } else {
    //                     return utils.sendAuthError(req, res, "NOT_AUTHERIZED", "NOT_AUTHERIZED");
    //                 }
    //             }

    //         }
    //     } catch (error) {
    //         return utils.sendDBCallbackErrs(req, res, error, null);
    //     }
    // }


    return userCtrl;
}