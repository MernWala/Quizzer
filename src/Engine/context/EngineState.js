import React, { useState, useContext } from 'react'
import EngineContext from "./EngineContext";
import UtilityContext from '../../context/utility/UtilityContext';
import DataContext from '../../context/userData/DataContext';

const EngineState = (props) => {

    const { backendHost } = useContext(DataContext)

    const [choice, setChoice] = useState(2)
    const handleChoice = (e) => {
        setChoice(e)
    }

    const [questionData, setQuestionData] = useState({
        "u_question": "",
        "u_picture": "",
        "u_option": [],
        "u_answer": [],
        "u_multiAns": false,
        "u_marks": 0
    });
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
            await fetch(`${backendHost}/genrate-question/get-question-set/`, {
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
            sendMess("info", "Somthing went wrong")
        }
    }

    const addQuestionApiCall = async (e) => {
        e.preventDefault()
        const quizeCode = await localStorage.getItem('quizer-quize-code');
        try {
            await fetch(`${backendHost}/genrate-question/add-question/`, {
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
                    "picture": questionData.u_picture ? questionData.u_picture : ""
                })
            }).then(async (data) => {
                const json = await data.json();
                if (json.sent) {
                    sendMess('success', 'Question added successfully');
                    setTimeout(() => {
                        e.target.reset()
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
            sendMess("info", "Somthing went wrong")
        }
    }

    const modifyQuestionApiCall = async (qSet_Id, qId) => {
        try {
            await fetch(`${backendHost}/genrate-question/update-question/${qSet_Id}/${qId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': await localStorage.getItem('quizer-auth-token')
                },
                body: JSON.stringify({
                    "u_question": questionData.question ? questionData.question : "",
                    "u_picture": questionData.u_picture ? questionData.u_picture : "",
                    "u_option": genrateOptionArray(questionData) ? genrateOptionArray(questionData) : [],
                    "u_answer": genrateAnswerArray(questionData) ? genrateAnswerArray(questionData) : [],
                    "u_multiAns": multiSelect === true ? true : false,
                    "u_marks": questionData.carriedMark,
                })
            }).then(async (data) => {
                const res = await data.json()
                if (res.update) {
                    sendMess('success', 'Question updated sucessfull');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
            });
        } catch (error) {
            console.log(error);
            sendMess("info", "Somthing went wrong")
        }
    }

    const handleDeleteQuestion = async (qSetId, qId) => {
        let conf = window.confirm("Are you sure to delete question ?");
        if (conf) {
            const token = localStorage.getItem('quizer-auth-token')
            try {
                await fetch(`${backendHost}/genrate-question/delete-question/${qSetId}/${qId}/`, {
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
                sendMess("info", "Somthing went wrong")
            }
        }
    }

    const [multiSelect, setmultiSelect] = useState(false);
    const handleMultiSelect = (e, value) => {
        if (value) {
            setmultiSelect(true);
        } else {
            setmultiSelect(e.target.checked);
        }
    }

    const [selectedQuestionSet, setSelectedQuestionSet] = useState()
    const fetchSelectedQuestionSet = async (quizeCode) => {
        let userId = await localStorage.getItem('userProfileData');
        userId = await JSON.parse(userId)._id;

        try {
            await fetch(`${backendHost}/genrate-question/get-question/${userId}/${quizeCode}/`, {
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
            sendMess("info", "Somthing went wrong")
        }
    }

    const handleDelete = async (_id) => {
        let confirmation = window.confirm("Are you sure to delete question set");

        if (confirmation) {
            await fetch(`${backendHost}/genrate-question/delete-qSet/${_id}`, {
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

    const [insertedImg, setInsertedImg] = useState(null)
    const [pastedImage, setPastedImage] = useState(null)
    const handlePastImage = async (event) => {
        setInsertedImg(null)
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        const temp = async (items) => {
            for (let index in items) {
                var item = items[index];
                if (item.kind === 'file') {
                    var blob = item.getAsFile();
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        setPastedImage(event.target.result)
                    };
                    reader.readAsDataURL(blob);
                }
            }
        }

        await temp(items).then(() => {
            setQuestionData({ ...questionData, u_picture: pastedImage })
        })
    }

    const [modifyQuestionData, setModifyQuestionData] = useState({
        answer: [],
        marks: '',
        multiAns: false,
        option: [],
        picture: "",
        question: '',
        _id: ''
    })

    return (
        <EngineContext.Provider value={{
            choice, handleChoice, handleOnChange, addQuestionApiCall, fetchAllQuestionData, userAllQuestionSet,
            handleMultiSelect, multiSelect, setmultiSelect, selectedQuestionSet, fetchSelectedQuestionSet,
            handleDelete, handleDeleteQuestion, currentQset, handleCurrentQset, handleClickedQuestionId,
            modifyQuestionApiCall, setQuestionData, questionData, handlePastImage, pastedImage, setPastedImage, modifyQuestionData, setModifyQuestionData, insertedImg, setInsertedImg
        }}>
            {props.children}
        </EngineContext.Provider>
    )
}

export default EngineState
