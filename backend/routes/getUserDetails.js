const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Instructor = require('../model/Instructor');
const Student = require('../model/Student');

router.post('/inst', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        // const user = await Instructor.findById(userId).select("-password");
        const user = await Instructor.findById(userId, 'fName lName email verified picture');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post('/stu', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        // const user = await Student.findById(userId).select("-password");
        const user = await Student.findById(userId, 'fName lName email verified picture');
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router