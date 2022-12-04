const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/user.model');
const nodemailer = require('nodemailer');

let otpVerification;
let storeEmail;
let storePassword;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'subhankarroytest612@gmail.com',
        pass: 'cnwpihhwfmvqjbjb'
    }
});

const app = express.Router();

app.get('/', (req, res) => res.send('User route!'));

app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    otpVerification = Math.floor(1000 + Math.random() * 9000);

    try {
        transporter.sendMail({
            to: email,
            from: 'subhankarroytest612@gmail.com',
            subject: 'OTP Verification',
            text: `Please enter this OTP ${otpVerification}`
        }).then(() => {
            storeEmail = email;
            storePassword = password;
            console.log(otpVerification);
            res.send({ message: 'OTP Sent' })
        })
    } catch (e) {
        return res.send(e.message)
    }
})

app.post('/otp', async (req, res) => {
    const { otp } = req.body;
    try {
        if (otp == otpVerification) {
            const newUser = new userModel({ email: storeEmail, password: storePassword })
            await newUser.save()
            return res.send('Signup Successful')
        } else {
            return res.send('Invalid OTP')
        }

    } catch (e) {
        return res.send(e.message)
    }
})

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ _id: existingUser._id, email, password }, process.env.TOKEN)
            res.send({ message: 'signin successful', token })
        } else {
            return res.send('invalid credentials')
        }
    } catch (e) {
        return res.send(e.message)
    }
})



module.exports = app;