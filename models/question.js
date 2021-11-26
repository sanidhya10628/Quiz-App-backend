const moongose = require('mongoose');

const quizSchema = moongose.Schema({

    // Quiz ID
    quizId: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'Quiz'
    },
    userId: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: [
        Number
    ],
    options: [
        String
    ]

})

const Question = moongose.model('Question', quizSchema);
module.exports = Question;


// Some Points

// 1. Instance ke liye methods use karte hai