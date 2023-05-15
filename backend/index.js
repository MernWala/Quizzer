require('dotenv').config('../.env')
const express = require('express')
const connectToMongoose = require('./db');
var cors = require('cors')

connectToMongoose();

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(cors());

app.use('/', require('./routes/default'));
app.use('/auth-register', require('./routes/register'));
app.use('/auth-login', require('./routes/login'));
app.use('/api/getDetails', require('./routes/getUserDetails'));

app.listen(port, () => {
    console.log(`Quizer is listening at ${port}`);
})
