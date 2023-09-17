import React, { useContext } from 'react'
import StudentContext from './StudentContext'
import UtilityContext from '../../context/utility/UtilityContext';
import DataContext from '../../context/userData/DataContext';

const StudentState = (props) => {

    let { sendMess } = useContext(UtilityContext);
    const {backendHost} = useContext(DataContext)
    
    // save & update answer record
    let handleSaveRecord = async (qSetId, qCode, token, questionId, answer, actualAnswer) => {
        try {
            await fetch(`${backendHost}/quiz/join/response/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({
                    "qSetid": qSetId,
                    "qCode": qCode,
                    "questionId": questionId,
                    "answer": answer,
                    "key": actualAnswer
                })
            }).then(async (e) => {
                const response = await e.json();
                sendMess('info', response.status)
            })

        } catch (error) {
            console.log(error);
        }
    }

    // delete particular question
    let handleResetRecord = async (qSetId, qCode, token, questionId) => {
        try {
            await fetch(`${backendHost}/quiz/join/response/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({
                    "qSetid": qSetId,
                    "qCode": qCode,
                    "questionId": questionId,
                })
            }).then(async (e) => {
                const response = await e.json();
                console.log(response);
                sendMess('danger', response.status)
            })

        } catch (error) {
            console.log(error);
        }
    }

    // submit quize record
    let handleSubmitRecord = async (qSetId, qCode, token) => {
        try {
            await fetch(`${backendHost}/quiz/join/response/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({
                    "qSetid": qSetId,
                    "qCode": qCode,
                })
            }).then(async (e) => {
                const response = await e.json();
                sendMess('success', response.status)
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <StudentContext.Provider value={{ handleSaveRecord, handleResetRecord, handleSubmitRecord }} >
            {props.children}
        </StudentContext.Provider>
    )
}

export default StudentState
