/**
 * Project          : Invision Policy App
 * Module           : QuestionnaireAgreementStatus model File
 * Source filename  : schema.js
 * Description      : This file is to set the schema for the questionnaireAgreementStatus collection.
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
     * QuestionnaireAgreementStatus Schema
     */
    var QuestionnaireAgreementStatusSchema = new Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },

        questionnaireId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Questionnaires'
        },

        agreed : {
            type: Boolean,
            default: false 
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

    QuestionnaireAgreementStatusSchema = require('../../utils/db_queries')(QuestionnaireAgreementStatusSchema);
    return mongoose.model('QuestionnaireAgreementStatus', QuestionnaireAgreementStatusSchema);
};
