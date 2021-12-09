const express = require('express');
const validator = require('validator')
const moment = require('moment')
const router = express.Router();

// Model Dependency
const QuizModel = require('../models/quiz')
const QuestionModel = require('../models/question')
const ResponseModel = require('../models/response')

// GET Route to attemp the Quiz
router.get('/attemptQuiz/:id', async (req, res) => {
    try {
        const quiz = await QuizModel.findById(req.params.id)
        const questions = await QuestionModel.find({ quidId: req.params.id })

        res.json({ quiz, questions })
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})


router.post('/finishQuiz', (req, res) => {
    try {
        console.log(req.body)
        res.send("hi")
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})


module.exports = router;