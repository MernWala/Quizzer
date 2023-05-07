const express = require('express');
const connectToMongoose = require('./db')
const port = 5000
const app = express();
var cors = require('cors')

connectToMongoose();
app.use(cors());

// Default route
app.get('/', require('./routes/default'));

// Login route


app.listen(port, () => {
    console.log(`Quizer is listning at ${port}`);
})