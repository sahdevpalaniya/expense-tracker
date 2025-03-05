// userController.js
const { StatusCodes } = require('http-status-codes');
const Users = require('../../models/user.model');
const { resp } = require('../../helpers/response.helpers');

const getAllUsers = (req, res) => {
    return res.status(statusCode.OK).json({ message: 'Get all users.' });
};

const createUser = (req, res) => {
    try {
        Users.createUser(req.body).then((user) => {
            const userData = {
                name: user.name,
                email: user.email,
                username: user.username,
                activation_status: user.activation_status,
            }
            return resp(res, StatusCodes.OK, 'User created successfully.', true, userData);
        }).catch((err) => {
            return resp(res, StatusCodes.BAD_GATEWAY, 'Error creating user record.' + err.message, false);
        });
    } catch (err) {
        throw new Error("User Creation Error :" + err.message);
    }
};

const getUserForUpdate = (req, res) => {
    try {
        Users.getUserById(req.params.id)
            .then((user) => {
                const userData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    activation_status: user.activation_status,
                }
                return resp(res, StatusCodes.OK, 'User record get successfully', true, userData);
            })
            .catch((err) => {
                return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Error getting user record.' + err.message, false);
            });
    } catch (err) {
        return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'User Get Error: ' + err.message, false);
    }
};

const updateUser = (req, res) => {
    try {
        Users.updateUser(req.params.id, req.body)
            .then((user) => {
                console.log(user);
                const userData = {
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    activation_status: user.activation_status,
                }
                return resp(res, StatusCodes.OK, 'User updated successfully.', true, userData);
            })
            .catch((err) => {
                return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Error updating user record.' + err.message, false);
            });
    } catch (err) {
        return resp(res, StatusCodes.INTERNAL_SERVER_ERROR, 'User Updation Error: ' + err.message, false);
    }
};

const deleteUser = (req, res) => {
    return res.status(StatusCodes.OK).json({ message: 'Delete user record' });
};

module.exports = {
    getAllUsers,
    createUser,
    getUserForUpdate,
    updateUser,
    deleteUser
};
