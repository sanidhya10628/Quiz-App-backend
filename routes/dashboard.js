const express = require('express');
const router = express.Router();

// Auth
const auth = require('../config/auth')

// Model Dependency
const QuizModel = require('../models/quiz');



router.get('/dashboard', auth, async (req, res) => {
    try {

        const createdQuiz = await QuizModel.find({ owner: req.user.id })
        res.json({
            status: 'OK',
            msg: 'Success',
            createdQuiz
        })
    }
    catch (e) {
        console.log(e)
        res.json({
            status: 'OK',
            msg: 'Something Went Wrong. Please try again'
        })
    }
})




module.exports = router;

// Dashboard to show
// 1. how many quiz created till now
// 2. how many attempted quiz till now