const express = require('express');
const validator = require('validator')
const router = express.Router();
const moment = require('moment')

// Model Dependency
const quizModel = require('../models/quiz')
const QuestionModel = require('../models/question')





// Create Quiz GET Request
router.get('/createQuiz', (req, res) => {
    res.send('Create Quiz');
})

//Gloabl for demo
const userModel = require('../models/user')


// Create Quiz POST Request 
router.post('/user/createQuiz', async (req, res) => {
    /* for demo only */

    const currUser = await userModel.findOne({ email: 'sanidhya10628@gmail.com' })
    /* for demo only */
    try {
        let { title, isOpen } = req.body

        // Validations

        title = validator.trim(title)
        isOpen = validator.trim(isOpen)
        isOpen = validator.toBoolean(isOpen)
        const date = moment().format('MMMM Do YYYY, h:mm:ss a')

        const newQuiz = await new quizModel({
            title: title,
            isOpen: isOpen,
            date: date,
            owner: currUser.id
        })

        await newQuiz.save()

        res.redirect(`/user/quiz/${newQuiz._id}/addQuestion`)

    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})



// Route to See a Particular Quiz and its questions
router.get('/user/quiz/:id', async (req, res) => {
    try {
        const quiz = await quizModel.findById(req.params.id)
        const questions = await QuestionModel.find({ quidId: req.params.id })
        res.json({ quiz, questions })
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})
module.exports = router;