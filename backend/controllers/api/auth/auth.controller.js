const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../../../models/user.model');
const { StatusCodes } = require('http-status-codes');
const { resp } = require('../../../helpers/response.helpers');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const isVerified = await User.verifyPass(username, password);
        if (isVerified == undefined) {
            return resp(res, StatusCodes.UNAUTHORIZED, 'Username and Password Invalid.', false);
        } else {
            const newToken = crypto.randomBytes(251).toString("hex");
            const userRecord = await User.getUserById(isVerified.id);
            await User.updateOne(
                { _id: isVerified.id },
                { $unset: { 'tokens': 1 } }
            );
            await User.updateOne(
                { _id: isVerified.id },
                {
                    $push: {
                        tokens: {
                            token: newToken
                        }
                    }
                }
            );

            const loginRes = {
                user: userRecord,
                access_token: newToken
            }
            return resp(res, StatusCodes.OK, "Login Successfully", true, loginRes);
        }
    } catch (err) {
        return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred during login', false);
    }
}

const register = (req, res) => {
    try {
        User.createUser(req.body).then((user) => {
            return resp(res, StatusCodes.OK, 'User Register successfully.', true, user);
        }).catch((err) => {
            return resp(res, StatusCodes.BAD_GATEWAY, 'Error creating user record.' + err.message, false);
        });
    } catch (err) {
        return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred during register', false);
    }
};

const logout = async (req, res) => {
    try {
        const { _id } = req.user;
        if (_id) {
            await User.updateOne(
                { _id },
                { $unset: { tokens: 1 } }
            );
        }

        req.session.destroy((err) => {
            if (err) {
                return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Error during session destruction', false);
            }
            res.clearCookie('connect.sid');
            return resp(res, StatusCodes.OK, 'Logged out successfully', true);
        });
    } catch (err) {
        return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred during logout', false);
    }
};

const changePassword = async (req, res) => {
    try {

        const { username, password, newPassword } = req.body;
        const userDetails = await User.getUser('username', username);
        if (userDetails.length <= 0) {
            return resp(res, StatusCodes.NOT_FOUND, 'User not found.', false);
        }
        const updateData = {
            'password': newPassword,
        }
        const matchOldPass = await bcrypt.compare(newPassword, userDetails.password);
        if (matchOldPass) {
            return resp(res, StatusCodes.NOT_ACCEPTABLE, 'New password must differ from the old one.', false);

        }
        await User.updateUser(userDetails._id, updateData).then(() => {
            return resp(res, StatusCodes.OK, 'Password change successfully.', true);
        }).catch((err) => {
            return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred during update password :' + err.message, false);
        });
    } catch (err) {
        return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'An error occurred during update password' + err, false);
    }
}

module.exports = {
    login,
    register,
    logout,
    changePassword
};