const express = require('express');
const validator = require('validator')
const moment = require('moment')
const router = express.Router();


// Auth
const auth = require('../config/auth')

// Model Dependency
const QuizModel = require('../models/quiz')
const ResponseModel = require('../models/response')




router.post('/finishQuiz', (req, res) => {
    try {

    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})


module.exports = router;