const express = require('express');
const router = express.Router();
const validation = require('../../validations/api/auth.validation');
const authController = require('../../controllers/api/auth/auth.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.post("/login", validation.login, authController.login);
router.post('/register', validation.register, authController.register);
router.post('/logout', authMiddleware.Verify, authController.logout);
router.post('/change-password', authController.changePassword);

module.exports = router;
