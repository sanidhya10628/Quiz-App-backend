require('dotenv').config()

// NPM Dependencies
const express = require('express');
const app = express();
const path = require('path');

// Other Dependencies
const homePageRoute = require('./routes/index')
const signUpPageRoute = require('./routes/signup')
const loginPageRoute = require('./routes/login')
const createQuizRoute = require('./routes/quiz')
// Database connection
require('./db/mongoose')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Body Parser
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public/')))
app.use(express.json());


// Routes
app.use('/', homePageRoute) // for displaying Home Page
app.use('/', signUpPageRoute) // for Sign Up Page
app.use('/', loginPageRoute) // for Login Page
app.use('/', createQuizRoute) // for Create Quiz Page

//ON PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`On Port ${PORT}`);
})
