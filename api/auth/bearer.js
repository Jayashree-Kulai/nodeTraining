var passport = require("passport");
var BearerStrategy = require("passport-http-bearer").Strategy;
var mongoose = require("mongoose");
var config = require('../configs/config');
var utils = require("../utils/util");
var Users = mongoose.model("Users");
passport.use(new BearerStrategy(
    async function (token, done) {
        try {
            console.log("-----------token (From bearer.js)", token);
            var queryObj = {
                token: token,
                tokenExpiry: { $gte: new Date() }
            };

            let user = await Users.getData(queryObj);
            if (!user) {
                return done(null, false);
            }
            console.log("User data fetched based on token--->",user);
            return done(null, user)

        } catch (error) {
            return done(error);
        }
    }
));


exports.isAuthenticated = passport.authenticate('bearer', { session: false });
