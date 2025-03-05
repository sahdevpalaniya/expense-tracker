const { StatusCodes } = require('http-status-codes');
const { resp } = require('../helpers/response.helpers');
const User = require('../models/user.model');

const Verify = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (token == undefined || token == "") {
        return resp(res, StatusCodes.BAD_REQUEST, 'Token is empty.', false);
    }
    const userDetails = await User.getUser('tokens.token', token);
    if (userDetails == null || userDetails.length === 0) {
        return resp(res, StatusCodes.NOT_FOUND, 'Invalid Authorization Token.', false);
    } else {
        req.user = userDetails;

        req.session.save((err) => {
            if (err) {
                return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Session save failed.', false);
            }
            next();
        });
    }

}

module.exports = { Verify };