const User = require('../models/user');
const { Roles } = require('../utils/constants');


const listing_permissions = {
    "user": ["read"],
    "business_owner": ["create", "read", "update"],
    "admin": ["create", "read", "update", "delete"]
}

/**
 * This method acts as a middleware to add permissions for a user for listing CRUP operations.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {

    const { _id } = req.user;
    User.findById(_id).then(userData => {
        let permissions = [];
        console.log("role: "+userData.role);
        if (userData.role == Roles.USER_ROLE) {
            permissions = listing_permissions[Roles.USER_ROLE];
        } else if (userData.role == Roles.OWNER_ROLE) {
            permissions = listing_permissions[Roles.OWNER_ROLE];
        } else {
            permissions = listing_permissions[Roles.ADMIN_ROLE];
        }
        req.user["permissions"] = permissions;
        console.log("permissions: "+req.user.permissions)
        next();
    })
}
