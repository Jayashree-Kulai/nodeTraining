/**
 * Project          : NodejsBasics
 * Module           : Favourite model File
 * Source filename  : schema.js
 * Description      : This file is to set the schema for the brand collection.
 * Author           : Likhitha M<likhitha.m@robosoftin.com>
 * Copyright        : Copyright © 2020, NodejsBasics
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */

"use strict";

/**
 * Module dependencies.
 * https://code.tutsplus.com/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527
 */
/*Mongoose is a JavaScript library that allows you to define schemas with strongly typed data. Once a schema is defined, Mongoose lets you create a Model based on a specific schema. A Mongoose Model is then mapped to a MongoDB Document via the Model's schema definition.

Once you have defined your schemas and models, Mongoose contains many different functions that allow you to validate, save, delete, and query your data using common MongoDB functions.*/
module.exports = function (mongoose) {
    var Schema = mongoose.Schema;


    /*
     * Favourite Schema
     */
    var FavouriteSchema = new Schema({
        favCityId: {
            type: mongoose.Schema.Types.ObjectId, ref :'Citys'  
            /*
            Schema types (dataTypes)
            String
            Number
            Date
            Buffer -- The Buffer data type allows you to save binary data. A common example of binary data would be an image or an encoded file, such as a PDF document.
            Boolean
            Mixed --The Mixed data type turns the property into an "anything goes" field. 
            ObjectId -- The ObjectId data type commonly specifies a link to another document in your database. For example, if you had a collection of books and authors, the book document might contain an ObjectId property that refers to the specific author of the document.
            Array -- The Array data type allows you to store JavaScript-like arrays. With an Array data type, you can perform common JavaScript array operations on them, such as push, pop, shift, slice, etc.
            */
        },
        userId : {
            type: mongoose.Schema.Types.ObjectId, ref :'Users'
        },
        
        // minTemperature: {
        //     type: Number 
        // },
        // maxTemperature: {
        //     type: Number 
        // },
        // precipitation: {
        //     type: Number 
        // },
        // humidity: {
        //     type: Number 
        // },
        // wind: {
        //     type: Number 
        // },
        // visibility: {
        //     type: Number 
        // },
        
        
        // isDeleted:{
        //     type: Boolean,
        //     default: false,
        //     select: false
        // },
        createdAt: {
            type: Date,
            select: false
        },
        updatedAt: {
            type: Date,
            select: false
        },
        __v: {
            type: Number,
             select: false
        }
    }, { timestamps: true });

    FavouriteSchema = require('../../utils/db_querires')(FavouriteSchema);
    return mongoose.model('Favourites', FavouriteSchema);
};
