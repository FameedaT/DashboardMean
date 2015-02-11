'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require('mongoose-relationship');

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Project name',
        trim: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: false
    },
    ongoing: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.ObjectId,
        ref: 'Employee'
    },
    belongsTo: {
        type: Schema.ObjectId,
        ref: 'Organization',
        childPath: 'projects'
    },
    members: [
        {
            type: Schema.ObjectId,
            ref: 'Employee'
        }
    ],
    totalHeadCount: {
        type: Number,
        default: 0
    },
    billableHeadCount: {
        type: Number,
        default: 0
    },
    benchHeadCount: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

ProjectSchema.plugin(relationship, {relationshipPathName: 'belongsTo'});
mongoose.model('Project', ProjectSchema);
