require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user')
const skillRoutes = require('./routes/skill')
const cors = require('cors');
var cron = require('node-cron');


// express app
const app = express();

// middleware
app.use(express.json())
app.use(cors());

//This right here is the difference between "coder" and "engineer".
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/skill', skillRoutes)


// Calculate users scores at midnight
cron.schedule('* * * * *', () => {
    console.log('running cron job');
    fetch(`http://localhost:${process.env.PORT}/api/user/triggerAtMidnight`)
        .then(response => {
            console.log('Function executed at midnight');
        })
        .catch(error => {
            console.error('Error executing function at midnight:', error);
        });
  });


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to DB and listening on port", process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })

