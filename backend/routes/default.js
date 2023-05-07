const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({"connection": "connection sucess with quizer"})
});

module.exports = router