import React, { useState, useContext } from 'react'
import EngineContext from "./EngineContext";
import UtilityContext from '../../context/utility/UtilityContext';

const EngineState = (props) => {

    const [choice, setChoice] = useState(2)
    const handleChoice = (e) => {
        setChoice(e)
    }

    const [questionData, setQuestionData] = useState({});
    const handleOnChange = (e) => {
        setQuestionData({ ...questionData, [e.target.name]: e.target.value })
    }

    const utilState = useContext(UtilityContext);
    const { sendMess } = utilState

    const genrateOptionArray = (obj) => {
        let arr = [];
        if (obj.option4) {
            arr.push(obj.option4)
        }
        if (obj.option3) {
            arr.push(obj.option3)
        }
        if (obj.option2) {
            arr.push(obj.option2)
        }
        if (obj.option1) {
            arr.push(obj.option1)
        }
        return arr;
    }

    const genrateAnswerArray = (obj) => {
        let arr = []
        if (obj.answer4) {
            arr.push(obj.answer4)
        }
        if (obj.answer3) {
            arr.push(obj.answer3)
        }
        if (obj.answer2) {
            arr.push(obj.answer2)
        }
        if (obj.answer1) {
            arr.push(obj.answer1)
        }
        return arr;
    }

    const [userAllQuestionSet, setUserAllQuestionSet] = useState([])
    const fetchAllQuestionData = async () => {
        try {
            const authToken = localStorage.getItem('quizer-auth-token');
            await fetch('http://localhost:5001/genrate-question/get-question-set/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                }
            }).then(async (e) => {
                const response = await e.json();
                let arr = response.data;
                setUserAllQuestionSet(arr);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const addQuestionApiCall = async (e) => {
        e.preventDefault()
        const quizeCode = await localStorage.getItem('quizer-quize-code');
        try {
            await fetch(`http://localhost:5001/genrate-question/add-question/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "quizeCode": quizeCode,
                    "question": questionData.question,
                    "option": genrateOptionArray(questionData),
                    "answer": genrateAnswerArray(questionData),
                    "marks": questionData.carriedMark,
                    "multiAns": multiSelect,
                })
            }).then(async (data) => {
                const json = await data.json();
                if (json.sent) {
                    sendMess('success', 'Question added successfully');
                    setTimeout(() => {
                        document.getElementById('questionForm').reset();
                        setmultiSelect(false);
                        setQuestionData({})
                    }, 1500);
                } else {
                    if (json.error && Array.isArray(json.error)) {
                        sendMess('danger', json.error[0].msg);
                    } else {
                        sendMess('danger', json.error)
                    }
                }

            })
        } catch (error) {
            console.log(error);
            sendMess('warning', 'Somthing went wrong please try again');
        }
    }

    const modifyQuestionApiCall = async (qSet_Id, qId) => {
        try {
            await fetch(`http://localhost:5001/genrate-question/update-question/${qSet_Id}/${qId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': await localStorage.getItem('quizer-auth-token')
                },
                body: JSON.stringify({
                    "u_question": questionData.question,
                    "u_picture": questionData.image,
                    "u_option": genrateOptionArray(questionData),
                    "u_answer": genrateAnswerArray(questionData),
                    "u_multiAns": multiSelect,
                    "u_marks": questionData.carriedMark,
                })
            }).then(async (data) => {
                const res = await data.json()
                console.log(res);
                if (res.update) {
                    sendMess('success', 'Question updated sucessfull');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
            });
        } catch (error) {
            console.log(error);
            sendMess('warning', 'Somthing went wrong with servers');
        }
    }

    const handleDeleteQuestion = async (qSetId, qId) => {
        let conf = window.confirm("Are you sure to delete question ?");
        if (conf) {
            const token = localStorage.getItem('quizer-auth-token')
            try {
                await fetch(`http://localhost:5001/genrate-question/delete-question/${qSetId}/${qId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                }).then(async (response) => {
                    if (response.statusText === "OK") {
                        sendMess('warning', "Question deleted");
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    } else {
                        sendMess('info', "Somthing went wrong with servers. Please try after some time.")
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const [multiSelect, setmultiSelect] = useState(false);
    const handleMultiSelect = (e) => {
        setmultiSelect(e.target.checked);
    }

    const [selectedQuestionSet, setSelectedQuestionSet] = useState()
    const fetchSelectedQuestionSet = async (quizeCode) => {
        let userId = await localStorage.getItem('userProfileData');
        userId = await JSON.parse(userId)._id;

        try {
            await fetch(`http://localhost:5001/genrate-question/get-question/${userId}/${quizeCode}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async (e) => {
                const response = await e.json();
                setSelectedQuestionSet(response.sets);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handlePublishQuize = async (quizeCode, name) => {
        try {
            await fetch(`http://localhost:5001/genrate-question/publish-question-set/${quizeCode}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': await localStorage.getItem('quizer-auth-token')
                },
                body: JSON.stringify({
                    qName: name
                })
            }).then(async (e) => {
                const response = await e.json();
                if (response.response) {
                    sendMess('success', `Published with the name ${name}. Now it is ready to use`)
                }
                setTimeout(() => {
                    handleChoice(1);
                }, 1000);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (_id) => {
        let confirmation = window.confirm("Are you sure to delete question set");

        if (confirmation) {
            await fetch(`http://localhost:5001/genrate-question/delete-qSet/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': await localStorage.getItem('quizer-auth-token')
                }
            }).then(async (response) => {
                if (!response.error) {
                    let code = await response.json()
                    sendMess('danger', `Question set with quize code - ${code.response.quizeCode} deleted.`)
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            })
        }
    }

    const [currentQset, setCurrentQset] = useState()
    const handleCurrentQset = (qSetId) => {
        setCurrentQset(qSetId);
    }

    const handleClickedQuestionId = (id) => {
        localStorage.setItem('quizer-modify-question-id', id);
    }

    const countMarks = (qSet) => {
        let arr = qSet.questions;
        let marks = 0;
        arr.forEach(element => {
            marks += element.marks
        });
        return marks
    }

    return (
        <EngineContext.Provider value={{
            choice, handleChoice, handleOnChange, addQuestionApiCall, fetchAllQuestionData, userAllQuestionSet,
            handleMultiSelect, multiSelect, selectedQuestionSet, fetchSelectedQuestionSet, handlePublishQuize,
            handleDelete, handleDeleteQuestion, currentQset, handleCurrentQset, handleClickedQuestionId,
            modifyQuestionApiCall, countMarks
        }}>
            {props.children}
        </EngineContext.Provider>
    )
}

export default EngineState
