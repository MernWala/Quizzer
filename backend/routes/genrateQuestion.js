const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Question = require('../model/Question')

// ROUTE 1 - Genrate question endpoint
router.post('/', [

    body('user', "Login user's id not found").exists(),
    body('totalStudentAllowed', "Allowed student must be atleast 10").exists(),

], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
        return
    }

    try {

        let quize = await Question.findOne({ quizeCode: req.body.quizeCode });
        if (quize) {
            res.status(400).json({
                error: 'This exam code already exits.',
                resolution: 'Try again to proceed'
            });
            return;
        }

        quize = await Question.create({
            user: req.body.user,
            quizeCode: req.body.quizeCode,
            totalStudentAllowed: req.body.totalStudentAllowed,
            questions: []
        });

        const data = {
            user: {
                id: quize.id
            }
        }

        const token = jwt.sign(data, process.env.JWT_SIGN_KEY)
        res.status(201).json({ token })

    } catch (error) {
        res.status(500).json({ error })
    }
});

// ROUTE 2 - add question
router.put('/add-question/', [

    body('quizeCode', "examCode not found").exists(),
    body('question', "Length of question must be at least 25 character long").isLength({ min: 25 }),
    body('option', "Options not found").exists(),
    body('answer', "Answer not found").exists(),

], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
        return;
    }

    try {
        const qSet = {
            question: req.body.question,
            option: req.body.option,
            answer: req.body.answer,
            picture: req.body.picture ? req.body.picture : ''
        }

        let ques = await Question.findOne({ quizeCode: req.body.quizeCode });
        if(!ques){
            res.status(400).json({error: `Data with ${req.body.quizeCode} exam code not found`})
            return;
        }else{
            ques.questions.push(qSet)
        }

        const sent = await Question.findByIdAndUpdate(ques._id, { $set: ques }, { new: true })
        res.status(200).json({ sent })

    } catch (error) {
        res.status(500).json({ error })
        return;
    }
});

// ROUTE 3 - Update question

// ROUTE 4 - Delete question

module.exports = router;