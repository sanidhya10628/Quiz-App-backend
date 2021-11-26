const moongose = require('mongoose');

const responseSchema = moongose.Schema({

    // name
    name: {
        type: String,
        required: true,
        trim: true
    },

    // email
    email: {
        type: String,
        required: true,
        trim: true
    },

    //score
    score: {
        type: Number,
        required: true
    },

    // date
    date: {
        type: String,
        required: true
    },

    // Quiz Id
    quizId: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'Quiz'
    }
})


const Response = moongose.model('Response', responseSchema);
module.exports = Response;


// Some Points

// 1. Instance ke liye methods use karte hai