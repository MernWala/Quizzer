const fetchUser = require('../middleware/fetchuser')
const router = require('express').Router()
const QuestionSchema = require('../model/Question')

// Route 1
router.get('/result', fetchUser, async (req, res) => {
    try {
        let user = req.user.id;

        // get all question set where user -> valid && isPublish: true
        let data = await QuestionSchema.find({ user: user, isPublish: true })

        // get all test record 
        
        return res.status(200).json({ allQuestionData: data })
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router

