const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Response } = require('../utils/response');
const { JWT_SECRET } = require('../config');
const { StatusCodes, Messages } = require('../utils/constants');


/**
 * This method acts as a middleware to check if requester is logged in.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        let response = new Response(
            401, 
            null, 
            "You must be logged in!"
        );
        return res.json(response);
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if(err) {
            let response = new Response(
                StatusCodes.ACCESS_DENIED, 
                null, 
                Messages.ACCESS_DENIED
            );
            return res.json(response);
        }

        const { _id } = payload;
        User.findById(_id).then(userData => {
            req.user = userData
            next()
        })
    })
}
