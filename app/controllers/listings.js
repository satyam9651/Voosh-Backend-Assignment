const Listing = require('../models/listing');
const User = require('../models/user');
const { StatusCodes, Messages } = require('../utils/constants');
const { Response } = require('../utils/response');


/**
 * This method is used to get all listings.
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllListings = async (req, res) => {

    try {

        const listings = await Listing.find();
        let response = new Response(
            StatusCodes.SUCCESS, 
            listings, 
            Messages.SUCCESS
        );
        res.json(response);

    } catch(err) {

        console.log(err);
        let response = new Response(
            StatusCodes.SERVER_ERROR, 
            null, 
            Messages.SOMETHING_WENT_WRONG
        );
        res.json(response);
    }
}

/**
 * This method is used to get a listing.
 * @param {*} req 
 * @param {*} res 
 */
exports.getListing = async (req, res) => {

    try {

        const listingId = req.params.listingId;
        const listing = await Listing.findById(listingId);
        let response = new Response(
            StatusCodes.SUCCESS,
            listing, 
            Messages.SUCCESS
        );
        res.json(response);

    } catch(err) {

        console.log(err);
        let response = new Response(
            StatusCodes.SERVER_ERROR, 
            null, 
            Messages.SOMETHING_WENT_WRONG
        );
        res.json(response);
    }
}

/**
 * This method is used to create a listing.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.createListing = async (req, res) => {

    try {

        const permissions = req.user.permissions;

        if (!permissions.includes("create")) {
            let response = new Response(
                StatusCodes.ACCESS_DENIED, 
                null, 
                Messages.ACCESS_DENIED
            );
            return res.json(response);
        }

        const { name, phone, address, images = [] } = req.body;
        if (!name || !phone || !address) {
            let response = new Response(
                StatusCodes.BAD_REQUEST,
                null,
                Messages.BAD_REQUEST
            );
            return res.json(response);
        }

        const currentUser = req.user;
        const user = await User.findById(currentUser._id);

        const listing = new Listing({
            name,
            phone,
            address,
            images,
            createdBy: user,
            modifiedBy: user
        });

        const createdListing = await listing.save();
        let response = new Response(
            StatusCodes.SUCCESS, 
            createdListing._id, 
            Messages.SUCCESS
        );
        res.json(response);

    } catch(err) {

        console.log(err);
        let response = new Response(
            StatusCodes.SERVER_ERROR, 
            null, 
            Messages.SOMETHING_WENT_WRONG
        );
        res.json(response);
    }
}

/**
 * This method is used to update a listing.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.updateListing = async (req, res) => {

    try {

        const permissions = req.user.permissions;

        if (!permissions.includes("update")) {
            let response = new Response(
                StatusCodes.ACCESS_DENIED, 
                null, 
                Messages.ACCESS_DENIED
            );
            return res.json(response);
        }

        const { name, phone, address, images = [] } = req.body;
        if (!name || !phone || !address) {
            let response = new Response(
                StatusCodes.BAD_REQUEST,
                null,
                Messages.BAD_REQUEST
            );
            return res.json(response);
        }

        const listingId = req.params.listingId;
        const listing = await Listing.findById(listingId);

        const currentUser = req.user;
        const user = await User.findById(currentUser._id);

        listing.name = name;
        listing.phone = phone;
        listing.address = address;
        listing.images = images;
        listing.modifiedBy = user;
        listing.modifiedOn = Date.now();

        const updatedListing = await listing.save();
        let response = new Response(
            StatusCodes.SUCCESS, 
            updatedListing._id, 
            Messages.SUCCESS
        );
        res.json(response);

    } catch(err) {

        console.log(err);
        let response = new Response(
            StatusCodes.SERVER_ERROR, 
            null, 
            Messages.SOMETHING_WENT_WRONG
        );
        res.json(response);
    }
}

/**
 * This method is used to delete a listing.
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteListing = async (req, res) => {

    try {

        const permissions = req.user.permissions;
        console.log(permissions);
        if (!permissions.includes("delete")) {
            let response = new Response(
                StatusCodes.ACCESS_DENIED, 
                null, 
                Messages.ACCESS_DENIED
            );
            return res.json(response);
        }

        const listingId = req.params.listingId;
        const listing = await Listing.findById(listingId);
        await listing.deleteOne();
        let response = new Response(
            StatusCodes.SUCCESS, 
            listingId, 
            Messages.SUCCESS
        );
        res.json(response);

    } catch(err) {

        console.log(err);
        let response = new Response(
            StatusCodes.SERVER_ERROR, 
            null, 
            Messages.SOMETHING_WENT_WRONG
        );
        res.json(response);
    }
}
