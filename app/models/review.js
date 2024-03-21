const mongoose = require('mongoose');
const listing = require('./listing');
const user = require('./user');


const ReviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'listing'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    modifiedOn: {
        type: Date,
        default: Date.now()
    },
    replies: [{
        type: String
    }]
});

module.exports = mongoose.model('review', ReviewSchema);
