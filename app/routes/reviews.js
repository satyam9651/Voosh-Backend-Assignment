const express = require('express');
const router = express.Router();
const { 
    getAllReviews,
    createReview,
    replyToReview,
    updateReview,
    deleteReview 
} = require('../controllers/reviews');
const { 
    isLoggedIn, 
    addReviewPermissions
} = require('../middlewares');


router.get("/", isLoggedIn, getAllReviews);
router.post("/", isLoggedIn, addReviewPermissions, createReview);
router.post("/reply/:reviewId", isLoggedIn, replyToReview);
router.put("/:reviewId", isLoggedIn, addReviewPermissions, updateReview);
router.delete("/:reviewId", isLoggedIn, addReviewPermissions, deleteReview);

module.exports = router;
