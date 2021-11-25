const moongose = require('mongoose');

const userSchema = moongose.Schema({

    // E-Mail
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    // Password
    password: {
        type: String,
        trim: true,
        minlength: 6,
        required: true
    },

    // Name
    name: {
        type: String,
        trim: true,
        required: false
    }
})

const User = moongose.model('User', userSchema);
module.exports = User;


// Some Points

// 1. Instance ke liye methods use karte hai