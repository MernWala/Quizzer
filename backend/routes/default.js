const express = require('express')
const router = express.Router();

// ROUT 1 - Default endpoint        // to be modify on completion of backend
router.get('/', (req, res) => {
    res.status(200).send(`Welcome to Quizeer Server`);
})

module.exports = router