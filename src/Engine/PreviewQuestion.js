import React, { useEffect, useContext } from 'react'
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
            <div className='container px-5'>
                {
                    selectedQuestionSet && <QuestionDesine data={selectedQuestionSet.questions} qSet_Id={selectedQuestionSet._id} edit={true} />
                }
            </div>
        </>
    )
}

export default PreviewQuestion
