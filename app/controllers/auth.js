const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Messages, StatusCodes, Roles } = require('../utils/constants');
const { Response } = require('../utils/response');
const { JWT_SECRET } = require('../config');


/**
 * This method is used to register a user.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.register = async (req, res) => {

    const { name, email, password, role } = req.body;
    if(!email || !password || !name) {
        let response = new Response
        (
            StatusCodes.SERVER_ERROR, 
            null, 
            "All fields are mandatory!"
        );
        return res.json(response);
    }

    User.findOne({ email: email })
    .then((savedUser) => {
        if(savedUser) {
            let response = new Response
            (
                StatusCodes.SERVER_ERROR,
                null,
                "User already exists with that email!"
            );
            return res.json(response);
        }

        bcrypt.hash(password, 12)
        .then(hashedpassword => {
            const user = new User({
                name,
                email,
                password: hashedpassword,
                role: role ?? Roles.USER_ROLE
            });
    
            user.save()
            .then(user => {
                let response = new Response(
                    StatusCodes.CREATED, 
                    {}, 
                    "User created!"
                );
                res.json(response);
            })
            .catch(err => {
                console.log(err);
                let response = new Response(
                    StatusCodes.SERVER_ERROR, 
                    null, 
                    Messages.SOMETHING_WENT_WRONG
                );
                res.json(response);
            })
        })
    })
    .catch(err => {
        console.log(err);
        let response = new Response(
            StatusCodes.SERVER_ERROR, 
            null, 
            Messages.SOMETHING_WENT_WRONG
        );
        res.json(response);
    })
}

/**
 * This method is used to login a user.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.login = async (req, res) => {

    const { email, password } = req.body;
    if(!email || !password){
        let response = new Response(
            StatusCodes.INVALID_CREDENTIALS, 
            null, 
            Messages.INVALID_CREDENTIALS
        );
        return res.json(response);
    }

    await User.findOne({ email: email })
    .then(savedUser => {
        if(!savedUser) {
            let response = new Response(
                StatusCodes.INVALID_CREDENTIALS, 
                null, 
                Messages.INVALID_CREDENTIALS
            );
            return res.json(response);
        }

        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch) {
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
                let response = new Response(
                    StatusCodes.SUCCESS, 
                    {token, userId: savedUser._id, role: savedUser.role}, 
                    "LoggedIn!"
                );
                return res.json(response);
            }
            else {
                let response = new Response(
                    StatusCodes.INVALID_CREDENTIALS, 
                    null, 
                    Messages.INVALID_CREDENTIALS
                );
                return res.json(response);
            }
        })
        .catch(err => {
            let response = new Response(
                StatusCodes.INVALID_CREDENTIALS, 
                null, 
                Messages.INVALID_CREDENTIALS
            );
            return res.json(response);
        })
    })
}
