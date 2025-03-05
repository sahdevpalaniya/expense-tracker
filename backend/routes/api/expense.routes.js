const express = require('express');
const router = express.Router();
const validation = require('../../validations/api/expense.validation');
const expenseController = require('../../controllers/api/expense.controller');

router.route("/")
    .get(expenseController.getAllExpense)
    .post(validation.createExpense,expenseController.createExpense);

router.route("/:id")
    .patch(validation.updateExpense,expenseController.updateExpense)
    .delete(expenseController.deleteExpense);

module.exports = router;
