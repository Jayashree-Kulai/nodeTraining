/**
 * Project          : Invision Policy App
 * Module           : Questionnaire model File
 * Source filename  : schema.js
 * Description      : This file is to set the schema for the questionnaires collection.
 * Author           : Jayashree Kulai
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
     * Questionnaire Schema
     */
    var QuestionnaireSchema = new Schema({
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },

        title: {
            type: String
        },

        description: {
            type: String
        },

        buttonTitle: {
            type: String
        },

        buttonText: {
            type: String
        },

        checkBoxText: {
            type: String
        },

        startDate: {
            type: Date
        },

        endDate: {
            type: Date
        },

        reminder: {
            type: Number
        },

        pptFile: {
            type: String
        },

        excelSheet: {
            type: String
        },

        mailBody: {
            type: String
        },

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

    QuestionnaireSchema = require('../../utils/db_queries')(QuestionnaireSchema);
    return mongoose.model('Questionnaires', QuestionnaireSchema);
};
