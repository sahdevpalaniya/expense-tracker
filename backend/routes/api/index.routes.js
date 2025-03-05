const express = require("express");
const router = express.Router();
const usersRoute = require("./users.routes");
const expenseRoute = require("./expense.routes");
const authRoute = require("./auth.routes");
const authMiddleware = require('../../middlewares/auth.middleware');

router.use("/", authRoute)
router.use("/user", authMiddleware.Verify, usersRoute);
router.use("/expense", authMiddleware.Verify, expenseRoute);

module.exports = router;