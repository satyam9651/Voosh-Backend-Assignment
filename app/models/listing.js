const mongoose = require('mongoose');
const user = require('./user');


const ListingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    modifiedOn: {
        type: Date,
        default: Date.now()
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    images: [{
        type: String
    }]
});

module.exports = mongoose.model('listing', ListingSchema);
