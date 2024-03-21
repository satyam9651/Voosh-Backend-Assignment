const express = require('express');
const router = express.Router();
const { 
    getAllListings,
    getListing,
    createListing,
    updateListing,
    deleteListing
} = require('../controllers/listings');
const { 
    isLoggedIn, 
    addListingPermissions
} = require('../middlewares');


router.get("/", isLoggedIn, getAllListings);
router.get("/:listingId", isLoggedIn, getListing);
router.post("/", isLoggedIn, addListingPermissions, createListing);
router.put("/:listingId", isLoggedIn, addListingPermissions, updateListing);
router.delete("/:listingId", isLoggedIn, addListingPermissions, deleteListing);

module.exports = router;
