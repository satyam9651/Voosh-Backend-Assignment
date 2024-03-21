const User = require('../models/user');
const { Roles } = require('../utils/constants');


const review_permissions = {
    "user": ["create", "read", "update", "delete"],
    "business_owner": ["read", "update"],
    "admin": ["create", "read", "update", "delete"]
}

/**
 * This method acts as a middleware to add permissions for a user for review CRUP operations.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {

    const { _id } = req.user;
    User.findById(_id).then(userData => {
        let permissions = [];
        if (userData.role == Roles.USER_ROLE) {
            permissions = review_permissions[Roles.USER_ROLE];
        } else if (userData.role == Roles.OWNER_ROLE) {
            permissions = review_permissions[Roles.OWNER_ROLE];
        } else {
            permissions = review_permissions[Roles.ADMIN_ROLE];
        }
        req.user["permissions"] = permissions;
        next();
    })
}
