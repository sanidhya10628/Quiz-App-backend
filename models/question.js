const moongose = require('mongoose');

const userSchema = moongose.Schema({

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
    questionTitle: {
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