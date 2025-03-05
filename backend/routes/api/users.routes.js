const express = require('express');
const router = express.Router();
const validation  = require('../../validations/api/user.validation');
const userController = require('../../controllers/api/users.controller');

router.route("/")
    .get(userController.getAllUsers)
    .post(validation.createUser, userController.createUser);

router.route("/:id")
    .get(userController.getUserForUpdate)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
