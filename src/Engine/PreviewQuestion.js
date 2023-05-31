import React, { useEffect, useContext, useState } from 'react'
import EngineContext from './context/EngineContext'
import QuestionDesine from './QuestionDesine';

const PreviewQuestion = () => {

    const enginContext = useContext(EngineContext);
    const { fetchSelectedQuestionSet, selectedQuestionSet } = enginContext

    useEffect(() => {
        const apiCall = async () => {
            const quizeCode = await localStorage.getItem('quizer-quize-code');
            await fetchSelectedQuestionSet(quizeCode)
        }
        apiCall();
    }, [])


    return (
        <>
            {
                selectedQuestionSet && <QuestionDesine data={selectedQuestionSet.questions} />
            }
        </>
    )
}

export default PreviewQuestion
