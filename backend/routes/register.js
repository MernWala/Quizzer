const express = require('express');
const router = express.Router();
const Instructor = require('../model/Instructor');
const Student = require('../model/Student');
const OTP = require('../model/OTP')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route 1 - Register Instructor endpoint
router.post('/inst', [
    body("fName", "First name is too short").isLength({ min: 3 }),
    body("lName", "Last name is too short").isLength({ min: 3 }),
    body('email', "Email id is required").isEmail(),
    body('password', "Length of password is short").isLength({ min: 6 }),
    body('OTP', "OTP not found").exists()
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    try {
        // Check whether the user with this email exists already
        let inst = await Instructor.findOne({ email: req.body.email });
        if (inst) {
            return res.status(400).json({ errors: [{ msg: "Sorry, user with this email already exists" }] });
        }

        let salt = bcrypt.genSaltSync(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        const otpData = await OTP.findOne({
            email: req.body.email
        })

        if ((otpData.otp - req.body.OTP) !== 0) {

            console.log(req.body.OTP);
            console.log(otpData.otp);

            return res.status(400).json({ errors: [{ msg: "OTP not matched try please try again" }] });

        } else {

            // creating users
            inst = await Instructor.create({
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                password: secPass,
                picture: req.body.picture,
                verified: true
            });

            const data = {
                user: {
                    id: inst.id
                }
            }

            const authTocken = jwt.sign(data, process.env.JWT_SIGN_KEY);
            return res.status(201).json({ authTocken });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error")
    }
});

// Route 2 - Register Student endpoint
router.post('/stu', [
    body("fName", "First name is too short").isLength({ min: 3 }),
    body("lName", "Last name is too short").isLength({ min: 3 }),
    body('email', "Email id is required").isEmail(),
    body('password', "Length of password is short").isLength({ min: 6 }),
    body('OTP', "OTP not found").exists()

], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    try {

        const otpData = await OTP.findOne({
            email: req.body.email
        })

        if ((otpData.otp - req.body.OTP) !== 0) {

            return res.status(400).json({ errors: [{ msg: "OTP not matched try please try again" }] });

        } else {

            let stu = await Student.findOne({ email: req.body.email });
            if (stu) {
                return res.status(400).json({ errors: [{ msg: "Sorry, user with this email already exists" }] });
            }

            let salt = bcrypt.genSaltSync(10);
            let secPass = await bcrypt.hash(req.body.password, salt);

            // creating users
            stu = await Student.create({
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                OTP: req.body.OTP,
                password: secPass,
                picture: req.body.picture,
                verified: true
            });

            const data = {
                user: {
                    id: stu.id
                }
            }

            const authTocken = jwt.sign(data, process.env.JWT_SIGN_KEY);
            return res.status(201).json({ authTocken });
        }

    } catch (err) {
        // catching unknown erros
        console.error(err);
        return res.status(500).send("Internal Server Error")
    }
});

// Route 3 - Reset password of instructor account with two factor verification
router.put('/account/forget-password/', [

    body('email', "Email id not found").exists(),
    body('otp', "OTP not found").exists(),
    body('account', "Can't get accout type").exists(),
    body('password', "Pawword not found").exists()
    
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    let { email, otp, account, password } = req.body

    try {

        // verifying OTP
        await OTP.findOne(
            { email }
        ).then(async (data) => {
            if(data === null) return res.status(404).json("You can only change your password")
            
            if (data.otp === Number(otp)) {
                let secPass = await bcrypt.hash(password, bcrypt.genSaltSync(10));

                if (account === "instructor") {
                    await Instructor.findOneAndUpdate({ email }, { $set: { password: secPass } }).then(() => {
                        return;
                    })
                    return res.status(200).json("Password has been changed")
                } else if (account === 'student') {
                    await Student.findOneAndUpdate({ email }, { $set: { password: secPass } }).then(() => {
                        return;
                    })
                    return res.status(200).json("Password has been changed");
                }

                return res.status(400).json("Invalid account type")

            } else {

                return res.status(400).json("OTP not matched")

            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: error.message })
    }

})

module.exports = router;