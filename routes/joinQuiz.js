const express = require('express');
const validator = require('validator')
const router = express.Router();


// Model Dependency
const QuizModel = require('../models/quiz')

// GET Route to See the Form to JOIN the Quiz
router.get('/joinQuiz', (req, res) => {
    res.render('joinQuiz')
})


// POST Request 
router.post('/joinQuiz', async (req, res) => {
    try {
        let { joinQuizCode } = req.body

        // Validations 
        // 1. Triming
        joinQuizCode = validator.trim(joinQuizCode)

        // 2. Check that the Quiz id is valid or not
        const isQuizCodeValid = await QuizModel.findById(joinQuizCode);
        if (!isQuizCodeValid) {
            return res.send("Invalid Quiz Code")
        }

        res.redirect(`/attemptQuiz/${joinQuizCode}`)

    }
    catch (e) {
        console.log(e)
        res.send(e);
    }
})







module.exports = router;