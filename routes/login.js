const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validator = require('validator')

// 
const UserModel = require('../models/user')

// GET Request
router.get('/login', (req, res) => {
    res.send('Welcome to the Login Page');
})


// POST Request
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;

        // Validations

        email = validator.trim(email);
        password = validator.trim(password);

        // 1. Email is Valid or not
        if (!validator.isEmail(email)) {
            return res.json({
                status: 'FAILED',
                msg: 'Invalid Email'
            })
        }

        // 2. User Exists or Not
        const currUserLogin = await UserModel.findOne({ email: email })
        if (!currUserLogin) {
            return res.json({
                status: 'FAILED',
                msg: 'Invalid Email or Password'
            })
        }

        // 3 .Password is Valid or not
        const isValidPassword = await bcrypt.compare(password, currUserLogin.password)
        if (!isValidPassword) {
            return res.json({
                status: 'FAILED',
                msg: 'Invalid Email or Password'
            })
        }
        const token = await currUserLogin.generateAuthToken()

        return res.json({
            status: 'OK',
            msg: 'Logged in Successfully',
            user: currUserLogin.email,
            token: token,
            name: currUserLogin.name
        })

    }

    catch (e) {
        console.log(e)
        res.json({
            status: 'FAILED',
            msg: 'Something Went Wrong. Please try again'
        })
    }
})


module.exports = router;