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

        let { email, password } = req.body

        // Validations

        email = validator.trim(email);
        password = validator.trim(password);

        // 1. Email is Valid or not
        if (!validator.isEmail(email)) {
            return res.send("Invalid Email")
        }

        // 2. Strong Password
        if (!validator.isStrongPassword(password, { minLength: 6 })) {
            return res.send("Weak Password")
        }


        const isUserAlreadyExists = await UserModel.findOne({ email: email })
        if (isUserAlreadyExists) {
            return res.send("Email Already Exists")
        }

        // User does not exists
        // 1. Hash the Password
        const hashedPassword = await bcrypt.hash(password, 12)
        if (!hashedPassword) {
            return res.send("Something went wrong")
        }

        // 2. Create User 
        const newUser = await new UserModel({
            email: email,
            password: hashedPassword
        })

        await newUser.save()
        res.status(201).json(newUser)
    }

    catch (e) {
        console.log(e)
        res.send(e)
    }
})


module.exports = router;