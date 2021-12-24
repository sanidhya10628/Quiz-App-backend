const moongose = require('mongoose');
const jwt = require('jsonwebtoken')

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
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


// RelationShip Between User and Quiz
userSchema.virtual('Quiz', {
    ref: 'Quiz',
    localField: '_id',
    foreignField: 'owner'
})



userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY);

    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;

}

const User = moongose.model('User', userSchema);
module.exports = User;


// Some Points

// 1. Instance ke liye methods use karte hai