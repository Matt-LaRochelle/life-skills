const User = require('../models/userModel')
const Skill = require('../models/skillModel')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
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

// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        // Create a new user
        const user = await User.signup(email, password)

        // Also create a new skills list
        const skill = await Skill.create({
                "userID": user._id,
                "exe": false,
                "fin": false,
                "med": false,
                "com": false,
                "upE": false,
                "pub": false,
                "hon": false,
                "lea": false,
                "dec": false,
                "lis": false,
                "tally": []
            })

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// send reset password link to email
const forgotUser = async (req, res) => {
    const email = req.body.email

    try {
        const user = await User.forgot(email)

        // create a token
        const token = jwt.sign({ userID: user._id }, process.env.SECRET, { expiresIn: '1h' })

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour
        await user.save();
       
        // create the email
        const message = {
            to: user.email,
            from: 'mattsdevprojects@gmail.com',
            subject: 'Password reset link',
            html: `<p>Click <a href="https://bingo-kncb.onrender.com/reset-password/${user.resetPasswordToken}">here</a> to reset your password.</p>`,
          };
        // send the email
        sgMail.send(message)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error('Email failed: ' + error);
        });
        res.status(200).json({message: "Reset password link has been succesffuly sent."})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// verifies link from email
const verifyLink = async (req, res) => {
    const token = req.body.token;
    console.log(token)
    try {
        // Look up the user by token
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
       
        if (!user) {
        // If the token is invalid or has expired, render an error message or redirect to an error page
        return res.status(400).send('Invalid or expired password reset token');
        }
        
        // Render the password reset form with the token as a hidden input
        res.json({ token });
  } catch (err) {
        console.error(err);
        res.status(400).json({error: err.message})
  }
}

// reset the password
const resetPassword = async (req, res) => {
    const { token, password }= req.body

    try {
        // Look up the user by token
        const validUser = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!validUser) {
        // If the token is invalid or has expired, render an error message or redirect to an error page
        return res.status(400).send('Invalid or expired password reset token');
        }
        // Render the password reset form with the token as a hidden input
        const user = await User.reset(token, password)
        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(400).json({error: err.message})
    }
}

// When someone reloads the page, or logs in after a while, they get this to check
// If they are still logged in our not.
const checkUser = async (req, res) => {
    const skillList = await Skill.findOne({ userID: req.user._id });
    res.status(200).json({skillList})
}


const dailySkillTally = async (req, res) => {
    // Get all the users and store them in a list
    const userList = await User.find({});
    console.log(userList)

    // Loop through each user
    for (const user of userList) {
        console.log("Email:", user.email)
        console.log("ID:", user._id)

        // Use the user._id to look up their skills document
        const individualUsersSkillDocument = await Skill.findOne({ userID: user._id });
        console.log("Document:", individualUsersSkillDocument)
        // Loop through the individualUsersSkillDocument and add +1 to the tally variable for each item that equals true
        let skillTally = 0;
        for (const key in individualUsersSkillDocument) {
            if (individualUsersSkillDocument[key] === true
                    && key !== "$isMongooseModelPrototype"
                    && key !== "$isMongooseDocumentPrototype") {
                console.log("item which is true:", key)
                skillTally += 1;
            }
        }
        console.log("skill tally:", skillTally)

        // Create an object with the tally and today's date
        const skillData = {
            skillNumber: skillTally,
            date: new Date()
        };

        // Push that object to the skills DB
        const updatedSkillsObject = await Skill.updateOne(
            { userID: user._id },  
            { $push: { tally: skillData } }
        );

        console.log("updated user:", updatedSkillsObject)

        // Reset their skills to 0 - not until everything is working
        // Mario 8, Luigi 5, Peach 2


    }
    res.status(200).json({message: "Triggered at midnight complete"})
}

module.exports = { signupUser, loginUser, forgotUser, verifyLink, resetPassword, checkUser, dailySkillTally }