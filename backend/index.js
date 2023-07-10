require('dotenv').config('../.env')
const express = require('express')
const connectToMongoose = require('./db');
var cors = require('cors')

connectToMongoose();

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(cors());

app.use('/', require('./routes/default'));                          // default
app.use('/auth-register', require('./routes/register'));            // register --------> Instructor, Student
app.use('/auth-login', require('./routes/login'));                  // login -----------> Instructor, Student
app.use('/api/getDetails', require('./routes/getUserDetails'));     // getDetails ------> Instructor, Student
app.use('/api/report-bug', require('./routes/reportbug'));          // reportBug -------> Report bug (login require)
app.use('/genrate-question', require('./routes/genrateQuestion'));  // genrateQuestion -> genrate question set, CRUD -> for questions, get all question array, delete question set, publish qSet, 
app.use('/ask/', require("./routes/ask"));                          // AskQuestion -----> in about.js ask a question
app.use('/quiz/', require('./routes/joinQuize'))                    // joinTest --------> send question set without answer and user (Student) information also
app.use('/record/get-result', require('./routes/recordedResult'))

app.listen(port, () => {
    console.log(`Quizer is listening at ${port}`);
})
