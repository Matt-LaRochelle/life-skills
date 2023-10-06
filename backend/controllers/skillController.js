const User = require('../models/userModel')
const Skill = require('../models/skillModel')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// GET skill list
const getSkillList = async (req, res) => {
    try {
        const skillList = await Skill.findOne({ userID: req.user._id})
        res.status(200).json(skillList)
    } catch (err) {
        console.log(err)
        res.status(400).json({message: err.message})
    }
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




module.exports = { getSkillList, updateSkillList }