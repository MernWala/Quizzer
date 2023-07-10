const express = require('express');
const router = express.Router();
const StudentModal = require("../model/Student");
const Question = require('../model/Question');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const TestRecord = require('../model/TestRecord');

// Route 1 -> this route will send question set without answer, and also send user data
router.get('/join/:quizeCode', fetchuser, async (req, res) => {

    const details = await TestRecord.findOne({ qCode: req.params.quizeCode, stuId: req.user.id });
    if (details && details.isSubmited === true) {

        return res.status(400).json({ status: `Can't attempt after submit`, id: req.user.id });

    } else {

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

    }
});

const checkPresence = (arr, questionId) => {
    var flag = false;

    arr.forEach((element) => {
        if (element.questionId.toString() === questionId) {
            flag = true;
        }
    });

    return flag;
}

const udateAnswerData = (arr, ans, questionId) => {
    let tempArr = [];
    let obj = {
        "questionId": "",
        "answer": [],
        "_id": "",
    };

    arr.forEach(element => {
        if (element.questionId.toString() === questionId) {
            obj.questionId = element.questionId;
            ans.forEach((a) => {
                obj.answer.push(a);
            })
            obj._id = element._id;
            tempArr.push(obj);
        } else {
            tempArr.push(element);
        }
    });

    return tempArr;
}

const addAnswerData = (arr, answer) => {
    let array = []

    arr.forEach((ele) => {
        array.push(ele);
    });
    array.push(answer);

    return array;
}

const removeAnswerData = (arr, questionId) => {
    let newArr = []

    arr.forEach((ele) => {
        if (ele.questionId.toString() !== questionId) {
            newArr.push(ele);
        }
    });

    return newArr;
}

// Route 2 -> This route will add answer and update answer
router.post('/join/response/save', fetchuser, [
    // basic details
    body('qSetid', "Quiz id not found").exists(),
    body('qCode', "Quiz code noot found").exists(),

    // question detail
    body('questionId', "Question id not found").exists(),
    body('answer', "Answer not found").exists().isArray()

], async (req, res) => {

    let data = validationResult(req);
    if (!data.isEmpty()) {
        return res.status(400).json({ errors: data.array() });
    }

    try {
        let { questionId, answer, qSetid, qCode } = req.body;

        let answerTemp = {
            questionId: questionId,
            answer: answer
        }

        const details = await TestRecord.findOne({ qSetid: qSetid, qCode: qCode, stuId: req.user.id });
        // insert first data
        if (details === null) {
            data = await TestRecord.create({
                "qSetid": qSetid,
                "qCode": qCode,
                "stuId": req.user.id,
                "record": answerTemp,
                "isSubmited": false
            });

            return res.status(201).json({ status: 'Answer added success' });
        } else {
            const flag = checkPresence(details.record, questionId);

            if (flag) {
                // user will update the question
                let newRecord = udateAnswerData(details.record, answer, questionId);
                await TestRecord.findOneAndUpdate({ qSetid: qSetid, qCode: qCode, stuId: req.user.id }, { $set: { record: newRecord } }).then(() => {
                    return res.status(200).json({ status: 'Answer update success' })
                });

            } else {
                let update = addAnswerData(details.record, answerTemp);

                await TestRecord.findOneAndUpdate({
                    qSetid: qSetid,
                    qCode: qCode,
                    stuId: req.user.id
                }, {
                    $set: { record: update }
                }).then(() => {
                    return res.status(200).json({ status: 'Answer added success' })
                });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }

});

// ROUTE 3 -> This route will remove answer
router.post('/join/response/delete', fetchuser, [

    body('qSetid', "Quiz id not found").exists(),
    body('qCode', "Quiz code noot found").exists(),
    body('questionId', "Question id not found").exists(),

], async (req, res) => {

    let data = validationResult(req);
    if (!data.isEmpty()) {
        return res.status(400).json({ errors: data.array() });
    }

    let { qSetid, qCode, questionId } = req.body;

    try {

        let details = await TestRecord.findOne({ qSetid: qSetid, qCode: qCode, stuId: req.user.id });
        let newRecord = removeAnswerData(details.record, questionId);

        await TestRecord.findOneAndUpdate({
            qSetid: qSetid,
            qCode: qCode,
            stuId: req.user.id
        }, {
            $set: { record: newRecord }
        }).then((e) => {
            return res.status(200).json({ status: "Answer reset success" })
        })

    } catch (error) {
        return res.status(500).json({ error });
    }

})

// ROUTE 4 -> This route will submit answer
router.post(`/join/response/submit`, fetchuser, [

    body('qSetid', "Quiz id not found").exists(),
    body('qCode', "Quiz code noot found").exists()

], async (req, res) => {
    let data = validationResult(req);
    if (!data.isEmpty()) {
        return res.status(500).json({ errors: data.array() });
    }

    try {
        await TestRecord.findOneAndUpdate({ qSetid: req.body.qSetid, qCode: req.body.qCode, stuId: req.user.id }, { $set: { isSubmited: true } });
        return res.status(200).json({ status: `Thank you for using quizzer, Your response is recorded` });
    } catch (error) {
        return res.status(500)
    }
})

module.exports = router