'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Organization Schema
 */
var OrganizationSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Organization name',
        trim: true
    },
    owner: {
        type: Schema.ObjectId,
        ref: 'Employee'
    },
    members: [
        {
            type: Schema.ObjectId,
            ref: 'Employee'
        }
    ],
    projects: [
        {
            type: Schema.ObjectId,
            ref: 'Project'
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

mongoose.model('Organization', OrganizationSchema);
