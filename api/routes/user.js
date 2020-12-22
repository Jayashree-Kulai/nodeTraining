/**
 * Project          : Invision Policy App
 * Module           : User routes file
 * Source filename  : user.js
 * Description      : Api routes for the user.
 * Author           : Jayashree Kulai
 */

const express = require("express");
module.exports = function (app, mongoose, utils, config, constants, logger, upload) {
    var userCtrl = require("../controllers/user")(mongoose, utils, config, constants, logger);
    var authenticate = require("../auth/bearer").isAuthenticated;
    var userRouter = express.Router();

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

    //api to add endUser data
    userRouter.post("/addEndUsers", authenticate, upload.single('xlsheet'), userCtrl.createUser);
        /**
        * @api {post} /users/addEndUsers Upload excel sheet
        * @apiName Upload excel sheet
        * @apiGroup User
        * @apiDescription API for uploading end users excel sheet. User data will be added to 'users' collection and credentials wil be mailed to users. This API can't be used in apidoc, since it has uploading file.
        * @apiUse Authenticate 
        * @apiParam {String} xlsheet excelSheet.
        * @apiExample {curl} Example usage:
        *     curl -i http://localhost:4200/api/v1/users/addEndUsers
        * @apiSampleRequest http://localhost:4200/api/v1/users/addEndUsers
        * @apiSuccessExample Success-Response:
        *     HTTP/1.1 200 OK
        *       {
        * No data as response...  Excel sheet will be uploaded to 'uploads' folder.
    }
        *     
        *
        * @apiErrorExample Error-Response:
        *     HTTP/1.1 400 Bad Request
        *     {
        "meta": {
            "code": 400,
            "message": "User does not exist",
            "timestamp": "2020-12-10T06:23:37.168Z"
        }
    }
        */
       
    //api to add endEusers using excel file
    userRouter.post("/uploadFile", userCtrl.uploadFile);

    userRouter.get("/downloadFile", userCtrl.downloadFile);

    //api for user login
    userRouter.post("/login", userCtrl.loginUser);
    /**
    * @api {post} /users/login Login
    * @apiName Login
    * @apiGroup User
    * @apiDescription API for user login
    *
    * @apiHeader {String} name Name of the user.
    * @apiHeader {String} password Password of the corresponding user.
    * @apiHeaderExample {json} Header-Example:
    *     {
    *       "name": "Yakshitha",
    *       "password" : "qwertyy"
    *     }
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/users/login
    * @apiSampleRequest http://localhost:4200/api/v1/users/login
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *       {
         "meta": {
         "code": 200,
         "message": "Success",
         "timestamp": "2020-12-09T18:47:40.498Z"
    },
    "pagination": {},
    "data": {
        "token": "9cc540bb-7046-4686-be2e-d583e027281f",
        "tokenExpiry": "2020-12-21T12:11:53.879Z"
    }
}
    *     
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 400 Bad Request
    *     {
    "meta": {
        "code": 400,
        "message": "User does not exist",
        "timestamp": "2020-12-10T06:23:37.168Z"
    }
}
    */

    //api for user logout
    userRouter.post("/logout", authenticate, userCtrl.logoutUser);
    /**
    * @api {post} /users/logout Logout
    * @apiName Logout
    * @apiGroup User
    * @apiDescription API for user logout
    *
    * @apiUse Authenticate
    * 
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/users/logout
    * @apiSampleRequest http://localhost:4200/api/v1/users/logout
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    "meta": {
        "code": 200,
        "message": "Success",
        "timestamp": "2020-12-10T07:18:22.935Z"
    },
    "pagination": {},
    "data": "LogOut Success"
}
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 401 Unauthorized
    *     Unauthorized
*/

    // api to used when user forget password
    userRouter.post("/sendPasswordUpdateLink", userCtrl.sendPasswordUpdateLink);
    /**
    * @api {post} /users/sendPasswordUpdateLink Send Password Updation Link
    * @apiName Update Password
    * @apiGroup User
    * @apiDescription API for sending password updation link, The mailId linked with the 'name' will get the password updation link. 
    * @apiHeader {String} name Name of the user.
    * @apiHeaderExample {json} Header-Example:
    *     {
    *       "name": "Anugraha"   
    *     }
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/users/sendPasswordUpdateLink
    * @apiSampleRequest http://localhost:4200/api/v1/users/sendPasswordUpdateLink
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    "meta": {
        "code": 200,
        "message": "Success",
        "timestamp": "2020-12-10T07:30:51.939Z"
    },
    "pagination": {},
    "data": "Password updation link sent to jayashreekulai@gmail.com"
}
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 400 Bad Request
    * {
    "meta": {
        "code": 400,
        "message": "Required Parameter missing",
        "timestamp": "2020-12-10T07:34:01.066Z"
    }
}
*/


    // api to to change password
    userRouter.put("/changePassword", authenticate, userCtrl.changePassword);
    /**
    * @api {put} /users/changePassword Change Password
    * @apiName Change Password
    * @apiGroup User
    * @apiDescription API for changing password, after login.
    * @apiUse Authenticate 
    * @apiHeader {String} password New password.
    * @apiHeaderExample {json} Header-Example:
    *     {
    *       "password" : "sderty"
    *     }
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/users/changePassword
    * @apiSampleRequest http://localhost:4200/api/v1/users/changePassword
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    "meta": {
        "code": 200,
        "message": "Success",
        "timestamp": "2020-12-10T07:45:48.118Z"
    },
    "pagination": {},
    "data": "Password updated successfully"
}
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 400 Bad Request
    * {
    "meta": {
        "code": 400,
        "timestamp": "2020-12-10T08:02:43.345Z"
    }
}
*/   

    // api to to add admin
    userRouter.post("/addAdmin", authenticate, userCtrl.addAdmin);
     /**
    * @api {post} /users/addAdmin Add Admin
    * @apiName Add Admin
    * @apiGroup User
    * @apiDescription API for adding an admin.
    * @apiUse Authenticate 
    * 
    * @apiParam {String} name Admin name
    * @apiParam {String} employeeCode Admin employeeCode
    * @apiParam {String} mailId Admin mailId
    * 
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/users/addAdmin
    * @apiSampleRequest http://localhost:4200/api/v1/users/addAdmin
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    "meta": {
        "code": 200,
        "message": "Success",
        "timestamp": "2020-12-10T08:53:04.161Z"
    },
    "pagination": {},
    "data": "Admin added Successfully........!!!!!"
}
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 401 Unauthorized
    *     Unauthorized
*/


    // api to update an admin
    userRouter.put("/updateAdmin", authenticate, userCtrl.updateAdmin);
       /**
    * @api {put} /users/updateAdmin Update Admin
    * @apiName Update Admin
    * @apiGroup User
    * @apiDescription API for updating an admin 'name' and 'employeeCode'.
    * @apiUse Authenticate 
    *
    * @apiParam {String} name Admin name
    * @apiParam {String} employeeCode Admin employeeCode
    * @apiParam {String} mailId Admin mailId (Can't be changed)
    * 
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/users/updateAdmin
    * @apiSampleRequest http://localhost:4200/api/v1/users/updateAdmin
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    "meta": {
        "code": 200,
        "message": "Success",
        "timestamp": "2020-12-10T09:43:36.839Z"
    },
    "pagination": {},
    "data": "Admin data updated Successfully........!!!!!"
}
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 401 Unauthorized
    *     Unauthorized
*/ 

    // api to delete an admin
    userRouter.put("/deleteAdmin", authenticate, userCtrl.deleteAdmin);
    /**
    * @api {put} /users/deleteAdmin Delete Admin
    * @apiName Delete Admin
    * @apiGroup User
    * @apiDescription API for deleting an admin. It will update 'isAdmin' field of the 'users' collection as 'false'.
    * @apiUse Authenticate 
    *
    * @apiParam {String} mailId Admin mailId, the one, which has to be deleted
    * 
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/users/deleteAdmin
    * @apiSampleRequest http://localhost:4200/api/v1/users/deleteAdmin
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    "meta": {
        "code": 200,
        "message": "Success",
        "timestamp": "2020-12-10T09:32:33.946Z"
    },
    "pagination": {},
    "data": "Namitha is not an admin anymore !!!" 
}
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 401 Unauthorized
    *     Unauthorized
*/

    // api to to add superAdmin
    userRouter.post("/addSuperAdmin", authenticate, userCtrl.addSuperAdmin);
     /**
    * @api {post} /users/addSuperAdmin Add Super Admin
    * @apiName Add Super Admin
    * @apiGroup User
    * @apiDescription API for adding a super admin.
    * @apiUse Authenticate 
    * 
    * @apiParam {String} name Super admin name
    * @apiParam {String} employeeCode Super admin employeeCode
    * @apiParam {String} mailId Super admin mailId
    * 
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/users/addSuperAdmin
    * @apiSampleRequest http://localhost:4200/api/v1/users/addSuperAdmin
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    "meta": {
        "code": 200,
        "message": "Success",
        "timestamp": "2020-12-10T08:53:04.161Z"
    },
    "pagination": {},
    "data": "SuperAdmin added Successfully........!!!!!"
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 401 Unauthorized
    *     Unauthorized
*/

    // api to update a superAdmin
    userRouter.put("/updateSuperAdmin", authenticate, userCtrl.updateSuperAdmin);
    /**
    * @api {put} /users/updateSuperAdmin Update Super Admin
    * @apiName Update Super Admin
    * @apiGroup User
    * @apiDescription API for updating a super admin 'name' and 'employeeCode'.
    * @apiUse Authenticate 
    *
    * @apiParam {String} name Super admin name
    * @apiParam {String} employeeCode Super admin employeeCode
    * @apiParam {String} mailId Super admin mailId (Can't be changed)
    * 
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/users/updateSuperAdmin
    * @apiSampleRequest http://localhost:4200/api/v1/users/updateSuperAdmin
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    "meta": {
        "code": 200,
        "message": "Success",
        "timestamp": "2020-12-10T09:43:36.839Z"
    },
    "pagination": {},
    "data": "SuperAdmin data updated Successfully........!!!!!"
}
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 401 Unauthorized
    *     Unauthorized
*/ 

    // api to delete a superAdmin
    userRouter.put("/deleteSuperAdmin", authenticate, userCtrl.deleteSuperAdmin);
    /**
    * @api {put} /users/deleteSuperAdmin Delete Super Admin
    * @apiName Delete Super Admin
    * @apiGroup User
    * @apiDescription API for deleting a super admin. It will update 'isSuperAdmin' field of the 'users' collection as 'false'.
    * @apiUse Authenticate 
    *
    * @apiParam {String} mailId Super admin mailId, the one, which has to be deleted
    * 
    * @apiExample {curl} Example usage:
    *     curl -i http://localhost:4200/api/v1/users/deleteSuperAdmin
    * @apiSampleRequest http://localhost:4200/api/v1/users/deleteSuperAdmin
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    "meta": {
        "code": 200,
        "message": "Success",
        "timestamp": "2020-12-10T09:19:13.737Z"
    },
    "pagination": {},
    "data": "Anu is not a super admin anymore !!!"
}
    *    
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 401 Unauthorized
    *     Unauthorized
*/

 //api for getting details of pending agreements of particular user
 userRouter.get("/getPendingAgreements", authenticate, userCtrl.getPendingAgreements);
 /**
 * @api {get} /users/getPendingAgreements Get pending agreements
 * @apiName Get pending agreements
 * @apiGroup User
 * @apiDescription API for getting pending agreements of specific user
 *
 * @apiUse Authenticate
 * 
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:4200/api/v1/users/getPendingAgreements
 * @apiSampleRequest http://localhost:4200/api/v1/users/getPendingAgreements
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *{
 "meta": {
     "code": 200,
     "message": "Success",
     "timestamp": "2020-12-14T10:27:57.077Z"
 },
 "pagination": {},
 "data": [
     {
         "_id": "5fd353c75202d54111eaa140",
         "agreed": false,
         "userId": {
             "_id": "5fd20978eff7064e5ef86f27",
             "mailId": "jayashree.cs16@sahyadri.edu.in",
             "name": "Jayashree",
             "employeeCode": "MNG003"
         },
         "questionnaireId": "5fd20836d7c9764d8df81ad2"
     },
     {
         "_id": "5fd73b547f6f879badea3927",
         "agreed": false,
         "userId": {
             "_id": "5fd20978eff7064e5ef86f27",
             "mailId": "jayashree.cs16@sahyadri.edu.in",
             "name": "Jayashree",
             "employeeCode": "MNG003"
         },
         "questionnaireId": "5fd20836d7c9764d8df81ad2"
     }
 ]
}
 *    
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     Unauthorized
 */

    app.use("/api/v1/users", userRouter);
};