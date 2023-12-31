const express = require('express')

// controller functions
const { 
    getSkillList,
    updateSkillList
} = require('../controllers/skillController')

const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

// Require authentication to check the user
router.use(requireAuth)

// GET the skill list
router.get('/', getSkillList)

// UPDATE the skill list
router.patch('/', updateSkillList)

// reset a skill list

// add number at the end of day

module.exports = router