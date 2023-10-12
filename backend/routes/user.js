const express = require('express')
const router = express.Router()

// controller functions
const { 
    signupUser, 
    loginUser, 
    forgotUser, 
    verifyLink, 
    resetPassword, 
    checkUser,
    dailySkillTally
} = require('../controllers/userController')

const requireAuth = require('../middleware/requireAuth')

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// send password reset link route
router.post('/forgot', forgotUser)

// verify link from email route
router.post('/verify', verifyLink)

// reset password
router.post('/reset', resetPassword)

// tally up the user's skills completed for the day + log them in db
router.get('/triggerAtMidnight', dailySkillTally)


// Require authentication to check the user
router.use(requireAuth)

// check that user is inside 3 day window of logging in
router.get('/check', checkUser)

module.exports = router