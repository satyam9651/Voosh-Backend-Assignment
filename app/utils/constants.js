/**
 * This class is a collection of roles constants.
 */
class Roles {

    static USER_ROLE = "user";
    static ADMIN_ROLE = "admin";
    static OWNER_ROLE = "business_owner";
}

/**
 * This class is a collection of message constants.
 */
class Messages {

    static WELCOME = "Welcome user!";
    static SUCCESS = "Success!";
    static SOMETHING_WENT_WRONG = "Something went wrong!";
    static INVALID_CREDENTIALS = "Invalid credentials!";
    static BAD_REQUEST = "Bad request!";
    static ACCESS_DENIED = "Access denied!";
}

/**
 * This class is a collection of status code constants.
 */
class StatusCodes {

    static SUCCESS = 200;
    static CREATED = 201;
    static BAD_REQUEST = 400;
    static ACCESS_DENIED = 403;
    static NOT_FOUND = 404;
    static INVALID_CREDENTIALS = 422;
    static SERVER_ERROR = 500;
}

module.exports = {
    Roles,
    Messages,
    StatusCodes
}
