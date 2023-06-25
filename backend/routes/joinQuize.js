const express = require('express');
const router = express.Router();
const StudentModal = require("../model/Student");
const Question = require('../model/Question');
const fetchuser = require('../middleware/fetchuser')

// Route 1 -> this route will send question set without answer, and also send user data
router.get('/join/:quizeCode', fetchuser, async (req, res) => {
    try {
        const UserData = await StudentModal.findById({ _id: req.user.id }).select('-password');
        if (UserData === null) {
            return res.status(400).json({ error: "Can't find student profile" })
        }

        const qCode = req.params.quizeCode
        const qSet = await Question.findOne({ quizeCode: qCode }).select('_id').select('user').select("quizeCode").select('isPublish').select('qname').select('questions.question').select('questions.picture').select('questions.option').select('questions.marks').select('questions.multiAns').select('questions._id').select('qName');
        if (!qSet)
            return res.status(404).json({ error: `There is no quiz with id: ${qCode}` });
        else
            return res.status(200).json({ quizeSet: qSet, userData: UserData });

    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router