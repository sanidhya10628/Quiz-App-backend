const express = require('express');
const validator = require('validator')
const router = express.Router();


// Model Dependency
const QuizModel = require('../models/quiz')
const QuestionModel = require('../models/question')


// for demo only
const UserModel = require('../models/user')
// for demo only

// GET Request
router.get('/user/quiz/:id/addQuestion', (req, res) => {

    res.render('addQuestion')
})

// POST Request
router.post('/user/quiz/:id/addQuestion', async (req, res) => {
    try {
        // for demo only

        const currUser = await UserModel.findOne({ email: 'sanidhya10628@gmail.com' })
        // for demo only
        let quizId = req.params
        let { question, answers, options } = req.body

        // Validations
        // 1. Filtering Data

        // Trim the Question
        question = validator.trim(question)

        // Convert Answer string into answer array
        let updatedAnswers = []
        for (let i = 0; i < answers.length; i++) {
            if (validator.isNumeric(answers[i])) {
                updatedAnswers.push(parseInt(answers[i]))
            }
        }

        // Futhure Check that answer is within the range or not
        // updatedAnswers.forEach((updatedAnswer) => {
        //     if (updatedAnswer <= 0 && updatedAnswer > updatedAnswers.length) {
        //         console.log("hello ")
        //         return res.send("Invalid answer option")
        //     }
        // })

        // triming the options
        const updatedOptions = options.map((option) => {
            return validator.trim(option)
        })


        // Check that Question type is Radio or Check
        if (updatedAnswers.length > 1) {
            optionType = 'check'
        } else {
            optionType = 'radio'
        }

        const newQuestion = await new QuestionModel({
            question: question,
            answer: updatedAnswers,
            options: updatedOptions,
            userId: currUser.id,
            quizId: req.params.id,
            optionType: optionType
        })

        await newQuestion.save()
        res.redirect(`/user/quiz/${req.params.id}`)
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})




module.exports = router;