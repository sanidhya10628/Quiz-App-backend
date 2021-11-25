const express = require('express');
const validator = require('validator')
const router = express.Router();

// Create Quiz GET Request
router.get('/createQuiz', (req, res) => {
    res.send('Create Quiz');
})


// Create Quiz POST Request 
router.post('/createQuiz', (req, res) => {

})




module.exports = router;