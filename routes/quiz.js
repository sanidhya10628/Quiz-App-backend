const express = require('express');
const validator = require('validator')
const router = express.Router();
const moment = require('moment')

// Model Dependency
const quizModel = require('../models/quiz')


// Auth
const auth = require('../config/auth')


// Create Quiz GET Request
router.get('/createQuiz', (req, res) => {
    res.json({
        status: 'OK',
        msg: 'Create Quiz Page'
    })
})




// Create Quiz POST Request 
router.post('/user/createQuiz', auth, async (req, res) => {
    try {
        let { title, isOpen, questions } = req.body

        // Validations

        title = validator.trim(title)

        if (isOpen === 1) {
            isOpen = true
        } else {
            isOpen = false
        }

        const date = moment().format('MMMM Do YYYY, h:mm:ss a')


        // Questions 
        const updatedQuestions = questions.map((question) => {

            // Convert Answer string into answer array
            const { answers, options } = question
            let updatedAnswers = []
            for (let i = 0; i < answers.length; i++) {
                if (validator.isNumeric(answers[i])) {
                    updatedAnswers.push(parseInt(answers[i]))
                }
            }
            question.answers = updatedAnswers

            // triming the options
            const updatedOptions = options.map((option) => {
                return validator.trim(option)
            })

            question.options = updatedOptions
        })

        const newQuiz = await new quizModel({
            title: title,
            isOpen: isOpen,
            date: date,
            owner: req.user.id,
            questions: questions
        })

        await newQuiz.save()

        return res.json({
            status: 'OK',
            msg: 'Quiz Created Successfully'
        })

    }
    catch (e) {
        console.log(e)
        res.json({
            status: 'ERROR',
            msg: 'Something went wrong. Please try again'
        })
    }
})



// Route to See a Particular Quiz and its questions
router.get('/user/quiz/:id', auth, async (req, res) => {
    try {
        const quiz = await quizModel.findById(req.params.id)
        const questions = await QuestionModel.find({ quidId: req.params.id })
        res.json({
            status: 'OK',
            msg: 'Quiz and Questions Fetched Successfully',
            quiz: quiz,
            questions: questions
        })
    }
    catch (e) {
        console.log(e)
        res.status({
            status: 'ERROR',
            msg: 'Something Went Wrong. Please try again.'
        })
    }
})
module.exports = router;