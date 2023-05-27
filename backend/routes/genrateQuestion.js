const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Question = require('../model/Question')

// method to remove perticular question
const removeQuestion = (arr, _id) => {
    const index = arr.findIndex((ele) => {
        return ele._id.toString() === _id
    });

    arr[index] = null
    let newArr = [];

    arr.map((ele) => {
        if (ele !== null) {
            newArr.push(ele)
        }
    });

    return (index === -1) ? -1 : newArr;
}

// method to get index of perticular question
const getIndex = (arr, _id) => {
    return arr.findIndex((ele) => {
        return ele._id.toString() === _id
    });
}

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

// ROUTE 2 - Add new question endpoint
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
        if (!ques) {
            res.status(400).json({ error: `Data with ${req.body.quizeCode} exam code not found` })
            return;
        } else {
            ques.questions.push(qSet)
        }

        const sent = await Question.findByIdAndUpdate(ques._id, { $set: ques }, { new: true })
        res.status(200).json({ sent })

    } catch (error) {
        res.status(500).json({ error })
        return;
    }
});

// ROUTE 3 - Delete question endpoint
router.delete('/delete-question/:mainId/:questionId', async (req, res) => {
    try {
        let ques = await Question.findById(req.params.mainId);
        if (!ques) {
            res.status(400).json({ error: `Data with ${req.params.mainId} exam code not found` })
            return;
        }

        const newArr = removeQuestion(ques.questions, req.params.questionId);
        if (newArr < 0) {
            res.status(400).json({ error: "Not found" });
            return;
        }
        ques.questions = newArr;

        await Question.findByIdAndUpdate(req.params.mainId, { $set: ques }, { new: false })
        res.status(200).json({ updated: newArr })

    } catch (error) {
        res.status(500).json({ error })
        return;
    }
})

// ROUTE 4 - Update question endpoint
router.put('/update-question/:mainId/:questionId', async (req, res) => {
    try {
        let ques = await Question.findById(req.params.mainId);
        if (!ques) {
            res.status(400).json({ error: `Data with ${req.params.mainId} exam code not found` })
            return;
        }

        const index = getIndex(ques.questions, req.params.questionId);
        const oldData = ques.questions[index];

        const { question, picture, option, answer, _id } = oldData
        const { u_question, u_picture, u_option, u_answer } = req.body;

        const newData = {
            "question": u_question ? u_question : question,
            "picture": u_picture ? u_picture : picture,
            "option": u_option ? u_option : option,
            "answer": u_answer ? u_answer : answer,
            "_id": _id
        }

        ques.questions[index] = newData;
        await Question.findByIdAndUpdate(req.params.mainId, { $set: ques }, { new: false })
        res.status(200).json({ update: newData })

    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router;