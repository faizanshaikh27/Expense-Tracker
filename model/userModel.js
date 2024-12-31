const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    fullName: {
        type: String,
        required: [true, 'Please enter a full name']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);