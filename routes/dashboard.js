const express = require('express');
const router = express.Router();


// Model Dependency
const QuizModel = require('../models/quiz');



router.get('/dashboard', async (req, res) => {
    try {


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