const fetchUser = require('../middleware/fetchuser')
const router = require('express').Router()
const QuestionSchema = require('../model/Question')
const TestRecordSchema = require('../model/TestRecord')
const StudentSchema = require('../model/Student')

// Route 1
router.get('/result', fetchUser, async (req, res) => {
    try {

        let instId = req.user.id
        let finalArr = []

        let student = {
            studentName: "",
            studentEmail: "",
            scoredMarks: 0
        }

        let obj = {
            main: {
                qCode: "",
                totalMarks: 0,
                responseCollected: 0
            },
            table: [student]
        }

        // finding all question set
        await QuestionSchema.find(
            { user: instId, isPublish: true }
        ).then((mainData) => {
            mainData.forEach(async (ele) => {
                // setting up main information
                obj.main.qCode = ele.quizeCode
                obj.main.totalMarks = ele.totalMarks

                let qCode = ele.quizeCode

                // setting up student information
                await TestRecordSchema.find(
                    { qCode }
                ).then((record) => {
                    obj.main.responseCollected = record.length

                    record.forEach(async (stuRecord) => {
                        // getting student id
                        let stuId = stuRecord.stuId

                        // setting up scored marks by student
                        student.scoredMarks = stuRecord.scoredMarks

                        await StudentSchema.findById(
                            { _id: stuId }
                        ).then((stuData) => {
                            // setting up student name
                            student.studentName = stuData.fName + " " + stuData.lName

                            // setting up student email
                            student.studentEmail = stuData.email
                        })

                        // push student object to obj.table -> student Data
                        obj.table.push(student)
                    })
                })

                // push obj -> final array
                finalArr.push(obj)
            })
        }).then(() => {
            setTimeout(() => {
                return res.status(200).json(finalArr)
            }, 1000);
        })

    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = router

