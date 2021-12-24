const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validator = require('validator')

// 
const UserModel = require('../models/user')

// GET Request
router.get('/signup', (req, res) => {
    res.send('Welcome to the SignUp Page');
})

// POST Request 
router.post('/signup', async (req, res) => {
    try {

        let { email, password, name } = req.body

        // Validations

        email = validator.trim(email);
        password = validator.trim(password);
        name = validator.trim(name)
        // 1. Email is Valid or not
        if (!validator.isEmail(email)) {
            return res.json({
                status: 'FAILED',
                msg: 'Invalid Email'
            })
        }

        // 2. Strong Password
        // if (!validator.isStrongPassword(password, { minLength: 6 })) {
        //     return res.json({
        //         status: 'FAILED',
        //         msg: 'Weak Password'
        //     })
        // }


        const isUserAlreadyExists = await UserModel.findOne({ email: email })
        if (isUserAlreadyExists) {
            return res.json({
                status: 'FAILED',
                msg: 'Email already exists'
            })
        }

        // User does not exists
        // 1. Hash the Password
        const hashedPassword = await bcrypt.hash(password, 12)
        if (!hashedPassword) {
            return res.json({
                status: 'FAILED',
                msg: 'Something Went Wrong. Please try again'
            })
        }

        // 2. Create User 
        const newUser = await new UserModel({
            email: email,
            password: hashedPassword,
            name: name
        })

        await newUser.save()

        const token = await newUser.generateAuthToken()
        return res.json({
            status: 'OK',
            msg: 'User Registered Successfully',
            email: newUser.email,
            token: token,
            name: name
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