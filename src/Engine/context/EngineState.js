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

    // engine -> new quize state
    const [create, setCreate] = useState(true)
    const handleCreteState = (e) => {
        setCreate(e)
    }

    const handlePublishQuize = async (quizeCode) => {
        try {
            await fetch(`http://localhost:5001/genrate-question/publish-question-set/${quizeCode}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': await localStorage.getItem('quizer-auth-token')
                }
            }).then(async (e) => {
                const response = await e.json();
                if (response.response) {
                    sendMess('success', 'Publish success, now this quize is ready to use.')
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
            }).then((response) => {
                if (!response.error) {
                    sendMess('danger', `Question set with quize code - ${response.quizeCode} deleted.`)
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
            })
        }
    }

    return (
        <EngineContext.Provider value={{
            choice, handleChoice, handleOnChange, addQuestionApiCall, fetchAllQuestionData, userAllQuestionSet,
            handleMultiSelect, multiSelect, selectedQuestionSet, fetchSelectedQuestionSet, create, handleCreteState,
            handlePublishQuize, handleDelete
        }}>
            {props.children}
        </EngineContext.Provider>
    )
}

export default EngineState
