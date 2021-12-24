const moongose = require('mongoose');

const quizSchema = moongose.Schema({


    // Quiz Title
    title: {
        type: String,
        trim: true,
        required: false
    },
    isOpen: {
        type: Boolean,
        required: true
    },
    date: {
        type: String,
        trim: true,
        required: true
    },
    owner: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    // questions 
    questions: [{
        question: {
            type: String,
            required: true,
            trim: true
        },
        answers: [
            Number
        ],
        options: [
            String
        ],
        optionType: {
            type: String,
            enum: ['check', 'radio'],
            required: true
        }
    }]
})


// RelationShip Between Quiz and response
quizSchema.virtual('Response', {
    ref: 'Response',
    localField: '_id',
    foreignField: 'quizId'
})

const Quiz = moongose.model('Quiz', quizSchema);
module.exports = Quiz;


// Some Points

// 1. Instance ke liye methods use karte hai