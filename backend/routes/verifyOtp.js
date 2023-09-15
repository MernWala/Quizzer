const express = require('express');
const router = express.Router();
const OTP = require('../model/OTP')
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer')

router.post('/genrate/otp', [
    body('email', "Email id not found").exists()
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    let data = await OTP.findOne({ email: req.body.email });

    if (!data) {
        try {
            await OTP.create({
                email: req.body.email,
                otp: otp
            }).then(async () => {
                await nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.MAILINGADDRESS,
                        pass: process.env.MAILINGKEY
                    }
                }).sendMail({
                    from: process.env.MAILINGADDRESS,
                    to: req.body.email,
                    subject: "OTP Verification",
                    html: `<p>Hello ${req.body.email} your verfification OTP is <b>${otp}</b></p> <br/> Thanks for using Quizer <br> <a href="mailto:${process.env.MAILINGADDRESS}">Contact Us</a>`
                }).then(() => {
                    return res.status(201).json({
                        msg: `OTP sent succesfully and will valid only upto 5 min`
                    })
                })
            });
        } catch (error) {
            return res.status(500).json({ errors: [{ msg: "Interal server error" }] })
        }
    } else {
        try {
            await OTP.findOneAndUpdate(
                { email: req.body.email },
                { $set: { otp: otp } }
            ).then(async () => {
                await nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.MAILINGADDRESS,
                        pass: process.env.MAILINGKEY
                    }
                }).sendMail({
                    from: process.env.MAILINGADDRESS,
                    to: req.body.email,
                    subject: "OTP Verification",
                    html: `<p>Hello ${req.body.email} your verfification OTP is <b>${otp}</b></p> <br/> Thanks for using Quizer <br> <a href="mailto:${process.env.MAILINGADDRESS}">Contact Us</a>`
                }).then(() => {
                    return res.status(201).json({
                        msg: `OTP sent succesfully and will valid only upto 5 min`
                    })
                })
            });
        } catch (error) {
            return res.status(500).json({ errors: [{ msg: "Interal server error" }] })
        }
    }
});

router.delete('/delete/otp', [
    body('email', "Email id not found").exists()
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    try {
        await OTP.findOneAndDelete({
            email: req.body.email
        }).then(async (e) => {
            let data = await e.json();
            return res.status(200).json({ data })
        });
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Interal server error" }] })
    }
})

module.exports = router;