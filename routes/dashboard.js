const express = require('express');
const router = express.Router();


// Model Dependency
const UserModel = require('../models/user')
const QuizModel = require('../models/quiz');



router.get('/dashboard', async (req, res) => {
    try {
        // for demo only
        const currUser = await UserModel.findOne({ email: 'sanidhya10628@gmail.com' })
        // for demo only

        const userCreatedQuizes = await QuizModel.find({ owner: currUser._id })
        res.render('dashboard', { userCreatedQuizes })
        // res.json(userCreatedQuizes)
    }
    catch (e) {
        console.log(e)
        res.send(e)
    }
})




module.exports = router;