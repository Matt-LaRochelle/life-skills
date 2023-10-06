const express = require('express')

// controller functions
const { 
    signupUser, 
    loginUser, 
    forgotUser, 
    verifyLink, 
    resetPassword, 
    checkUser 
} = require('../controllers/userController')

const router = express.Router()
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

// Require authentication to check the user
router.use(requireAuth)

// check that user is 3d inside logging in
router.get('/check', checkUser)

module.exports = router