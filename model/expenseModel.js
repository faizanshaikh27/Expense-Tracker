const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    expenseName: {
        type: String,
        required: [true, 'Please enter a name']
    },
    expenseAmount: {
        type: Number,
        required: [true, 'Please enter an amount']
    },
    date: {
        type: Date,
    },
    description: {
        type: String
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Expense', expenseSchema);