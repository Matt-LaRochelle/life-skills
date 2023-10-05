const User = require('../models/userModel')
const Skill = require('../models/skillModel')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}


// create new skill list
const createSkillList = async (req, res) => {
    const { id } = req.user
    const skillsObject = req.body

    const skillsList = {...skillsObject, "userID": id, "tally": []}
    console.log("skills list", skillsList);

    try {
        const newSkillsList = await Skill.create(skillsList)
        res.status(200).json(newSkillsList)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update skill list
const updateSkillList = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// reset skill list at end of day

// add number to list at end of day




module.exports = { createSkillList, updateSkillList,  }