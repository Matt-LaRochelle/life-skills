const User = require('../models/userModel')
const Skill = require('../models/skillModel')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}


// update skill list
const updateSkillList = async (req, res) => {

    try {
        res.status(200).json({message: "received!"})
    } catch (error) {
        res.status(400).json({message: "Bad things happened"})
    }
}

// reset skill list at end of day

// add number to list at end of day




module.exports = { updateSkillList }