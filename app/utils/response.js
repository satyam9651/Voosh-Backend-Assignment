/**
 * This class is blueprint for all the API response for this app.
 */
class Response {

    constructor(status, data, message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

module.exports = {
    Response
}
