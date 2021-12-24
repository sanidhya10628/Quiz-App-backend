const express = require('express');
const validator = require('validator')
const router = express.Router();


// Auth
const auth = require('../config/auth')

// Model Dependency
const QuizModel = require('../models/quiz')

// GET Route to See the Form to JOIN the Quiz
router.get('/joinQuiz', (req, res) => {
    res.json({
        status: 'OK',
        msg: 'Join Quiz Page'
    })
})


// POST Request 
router.post('/joinQuiz', auth, async (req, res) => {
    try {
        let { joinQuizCode } = req.body

        // Validations 
        // 1. Triming
        joinQuizCode = validator.trim(joinQuizCode)

        // 2. Check that the Quiz id is valid or not
        const isQuizCodeValid = await QuizModel.findById(joinQuizCode);
        if (!isQuizCodeValid) {
            return res.json({
                status: 'FAILED',
                msg: 'Invalid Quiz Code'
            })
        }

        return res.json({
            status: 'OK',
            msg: 'Success',
            quizID: isQuizCodeValid._id,
            quizTitle: isQuizCodeValid.title,
            quizQuestions: isQuizCodeValid.questions
        })

    }
    catch (e) {
        console.log(e)
        return res.json({
            status: 'OK',
            msg: 'Something Went Wrong. Please try again'
        })
    }
})







module.exports = router;