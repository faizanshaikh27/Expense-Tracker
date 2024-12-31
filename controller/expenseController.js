const asyncHandler = require('express-async-handler');
const Expense = require('../model/expenseModel');


// Get Expenses
const getExpenses = asyncHandler(async(req, res) => {
    const expenses = await Expense.find({user_id: req.user.id});
    const expenseAmounts = expenses.map(expense => expense.expenseAmount);
    const totalExpenseAmount = expenseAmounts.reduce((a, b) => a + b, 0);
    res.status(200).json({sucess: true, data: expenses, totalExpenseAmount});
})


// Create Expense
const createExpense = asyncHandler(async(req, res) => {
    const {expenseName, expenseAmount, date, description} = req.body;
    if (!expenseName || !expenseAmount) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    const expense = await Expense.create({
        expenseName,
        expenseAmount,
        date,
        description,
        user_id: req.user.id
    })
    res.status(200).json({sucess: true, message: expense})
})


// Get Expense
const getExpense = asyncHandler(async(req, res) => {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
        res.status(404);
        throw new Error('Expense not found');
    }
    res.status(200).json({sucess: true, data: expense});
})


// Update Expense
const updateExpense = asyncHandler(async(req, res) => {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
        res.status(404);
        throw new Error('Expense not found');
    }
    if (expense.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error('You do not own this expense')
    }

    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({sucess: true, data: updatedExpense})
})


// Delete Expense
const deleteExpense = asyncHandler(async(req, res) => {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
        res.status(404);
        throw new Error('Expense not found');
    }
    if (expense.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error('You do not own this expense')
    }

    await Expense.deleteOne({_id: req.params.id})
    res.status(200).json({sucess: true, data: expense})
})


module.exports = {
    getExpenses,
    createExpense,
    getExpense,
    updateExpense,
    deleteExpense
}