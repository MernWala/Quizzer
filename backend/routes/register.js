const express = require('express');
const router = express.Router();
const Instructor = require('../model/Instructor');
const Student = require('../model/Student');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route 1 - Create Instructor account
router.post('/inst', [
    body("fName", "First name is too short").isLength({ min: 3 }),
    body("lName", "First name is too short").isLength({ min: 3 }),
    body('email', "Invalied email address").isEmail(),
    body('password', "Length of password is short").isLength({ min: 6 }),

], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    try {
        // Check whether the user with this email exists already
        let inst = await Instructor.findOne({ email: req.body.email });
        if (inst) {
            return res.status(400).json({ error: "Sorry, user with this email already exists" })
        }

        let salt = bcrypt.genSaltSync(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        // creating users
        inst = await Instructor.create({
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: inst.id
            }
        }

        const authTocken = jwt.sign(data, process.env.JWT_SIGN_KEY);

        // send response that this user is created
        res.json({ authTocken });

    } catch (err) {
        // catching unknown erros
        console.error(err);
        res.status(500).send("Internal Server Error")
    }
});

// Route 2 - Create Student account
router.post('/stu', [
    body("fName", "First name is too short").isLength({ min: 3 }),
    body("lName", "First name is too short").isLength({ min: 3 }),
    body('email', "Invalied email address").isEmail(),
    body('password', "Length of password is short").isLength({ min: 6 }),

], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    try {
        // Check whether the user with this email exists already
        let stu = await Student.findOne({ email: req.body.email });
        if (stu) {
            return res.status(400).json({ error: "Sorry, user with this email already exists" })
        }

        let salt = bcrypt.genSaltSync(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        // creating users
        stu = await Student.create({
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: stu.id
            }
        }

        const authTocken = jwt.sign(data, process.env.JWT_SIGN_KEY);

        // send response that this user is created
        res.json({ authTocken });

    } catch (err) {
        // catching unknown erros
        console.error(err);
        res.status(500).send("Internal Server Error")
    }
});

module.exports = router;