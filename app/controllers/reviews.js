const Review = require('../models/review');
const Listing = require('../models/listing');
const User = require('../models/user');
const { StatusCodes, Messages } = require("../utils/constants");
const { Response } = require("../utils/response");


/**
 * This method is used to get all reviews.
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllReviews = async (req, res) => {
    
    try {
        const reviews = await Review.find();
        let response = new Response(
            StatusCodes.SUCCESS, 
            reviews, 
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
 * This method is used to create a review for a listing.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.createReview = async (req, res) => {

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

        const { content, listingId } = req.body;
        if (!content || !listingId) {
            let response = new Response(
                StatusCodes.BAD_REQUEST,
                null,
                Messages.BAD_REQUEST
            );
            return res.json(response);
        }

        const currentUser = req.user;
        const user = await User.findById(currentUser._id);
        const listing = await Listing.findById(listingId);

        const review = new Review({
            content,
            listing,
            createdBy: user,
            modifiedBy: user,
            replies: []
        });

        const createdReview = await review.save();
        let response = new Response(
            StatusCodes.SUCCESS, 
            createdReview._id, 
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
 * This method is used to reply to a review.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.replyToReview = async (req, res) => {

    try {

        const { replyText } = req.body;
        if (!replyText || replyText == "") {
            let response = new Response(
                StatusCodes.BAD_REQUEST,
                null,
                Messages.BAD_REQUEST
            );
            return res.json(response);
        }

        const reviewId = req.params.reviewId;
        const review = await Review.findById(reviewId);
        review.replies = [...review.replies, replyText];

        const updatedReview = await review.save();
        let response = new Response(
            StatusCodes.SUCCESS, 
            updatedReview._id, 
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
 * This method is used to update the content of a review.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.updateReview = async (req, res) => {

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

        const { content } = req.body;
        if (!content) {
            let response = new Response(
                StatusCodes.BAD_REQUEST,
                null,
                Messages.BAD_REQUEST
            );
            return res.json(response);
        }

        const currentUser = req.user;
        const user = await User.findById(currentUser._id);
        const reviewId = req.params.reviewId;
        const review = await Review.findById(reviewId);

        review.content = content;
        review.modifiedBy = user;
        review.modifiedOn = Date.now();

        const updatedReview = await review.save();
        let response = new Response(
            StatusCodes.SUCCESS, 
            updatedReview._id, 
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
 * This method is used to delete a review.
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteReview = async (req, res) => {

    try {

        const permissions = req.user.permissions;

        if (!permissions.includes("delete")) {
            let response = new Response(
                StatusCodes.ACCESS_DENIED, 
                null, 
                Messages.ACCESS_DENIED
            );
            return res.json(response);
        }

        const reviewId = req.params.reviewId;
        const review = await Review.findById(reviewId);
        await review.deleteOne();
        let response = new Response(
            StatusCodes.SUCCESS, 
            reviewId, 
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
