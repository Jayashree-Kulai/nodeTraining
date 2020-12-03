/**
 * Project          : Kassara
 * Module           : City functions File
 * Source filename  : schema.js
 * Description      : This file is to set the schema for the City model related functions.
 * Author           : Sanjana  <sanjana.b@robosoftin.com>
 * Copyright        : Copyright © 2017, Kassara
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */
"use strict";

module.exports = function (schema) {
   // Schema Statics are methods that can be invoked directly by a Model (unlike Schema Methods, which need to be invoked by an instance of a Mongoose document). You assign a Static to a schema by adding the function to the schema's statics object.
   schema.statics.addData = function (data) {
    // self is being used to maintain a reference to the original this even as the context is changing.
    var self = this;
    var dataObj = new self(data);
    //.save method is used to insert the data to the application collection
    return dataObj.save();
}


    schema.statics.getDataById = function (id, options) {
        var self = this; 
        var dbQuery = self.findById(id);
        if (options) {
            if (options.populate) {
                dbQuery = dbQuery.populate(options.populate);
            }
            if (options.selectFields) {
                dbQuery = dbQuery.select(options.selectFields);
            }
        }
        
        return dbQuery.lean().exec();
        //findById method is used to get the data by _id
        //return self.findById(id).lean().exec();
    };
    
    schema.statics.getData = function (query) {
        var self = this; 
        //findOne method is used to get the data based on query condition
        return self.findOne(query).lean().exec();

    };

    schema.statics.getLists = function (queryObj) {
        var self = this;
        var dbQuery;
        var query = (queryObj.query) ? queryObj.query : {};
        var options = (queryObj.options) ? queryObj.options : {};
        var selectFields = (queryObj.selectFields) ? queryObj.selectFields : {};
        options.lean = true;
        var populate = (queryObj.populate) ? queryObj.populate : '';
        if (populate) {
            dbQuery = self.find(query, selectFields, options).populate(populate);
        } else {
            dbQuery = self.find(query, selectFields, options);
        }

        return dbQuery.exec();
    };

    schema.statics.getCount = function (query) {
        var self = this;
        return self.count(query).exec();
    }

    schema.statics.updateDataById = function (id, updateQuery) {
        var self = this;
        var options = { new: true };
        return self.findByIdAndUpdate(id, updateQuery, options).exec();
    };

    schema.statics.updateData = function (query, updateQuery) {
        var self = this;
        var options = { new: true };
        return self.findOneAndUpdate(query, updateQuery, options).exec();
    };

    schema.statics.updateMultipleData = function (queryObj) {
        var self = this;
        var query = (queryObj.query) ? queryObj.query : {};
        var options = (queryObj.options) ? queryObj.options : {};

        var updateQuery = queryObj.updateQuery;
        return self.update(query, updateQuery, options).exec();
    };

    schema.statics.removeDataById = function (id) {
        var self = this;
        return self.findByIdAndRemove(id).exec();
    }
  
    schema.statics.removeData = function (query) {
        var self = this;
        return self.findOneAndRemove(query).exec();
    }

    schema.statics.removeMultipleData = function (query) {
        var self = this;
        options = { multi: true };
        return self.remove(query, options).exec();
    }

    return schema;
}