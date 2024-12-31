const express = require('express');
const router = express.Router();
const {getExpenses, createExpense, getExpense, updateExpense, deleteExpense} = require('../controller/expenseController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken)

router.route('/').get(getExpenses)
router.route('/').post(createExpense)
router.route('/:id').get(getExpense)
router.route('/:id').put(updateExpense)
router.route('/:id').delete(deleteExpense)

module.exports = router;