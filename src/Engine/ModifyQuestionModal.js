import React, { useContext } from 'react'
import QuestionForm from "./QuestionForm"
import EngineContext from './context/EngineContext';

const ModifyQuestionModal = () => {

    const enginContext = useContext(EngineContext);
    const { currentQset } = enginContext

    return (
        <>
            <div className="modal fade font-size-150p" id="ModifyQuestionModal" tabIndex="-1" aria-labelledby="ModifyQuestionModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 'fit-content' }}>
                    <div className="modal-content bg-theam">
                        <div className="modal-header px-5">
                            <h1 className="modal-title fs-5 modal-title fw-bold fs-2 ff-nunito text-white" id="ModifyQuestionModalLabel">Question Modification Form</h1>
                            <i className="fa-solid fa-xmark cursor-pointer text-white" data-bs-dismiss="modal" style={{fontSize: '2rem'}}></i>
                        </div>
                        <div className="modal-body">
                            <QuestionForm isModify={true} qSetId={currentQset} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModifyQuestionModal
