import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import DataContext from '../context/userData/DataContext';

const PublishQuizeModal = () => {

    const [name, setName] = useState({ questionName: localStorage.getItem('quizer-quize-name') });
    const handleName = (e) => {
        setName({ ...name, [e.target.name]: e.target.value })
    }

    const { backendHost } = useContext(DataContext)
    
    const handlePublishQuize = async () => {
        try {
            await fetch(`${backendHost}/genrate-question/publish-question-set/${localStorage.getItem('quizer-quize-code')}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': await localStorage.getItem('quizer-auth-token')
                },
                body: JSON.stringify({
                    qName: name.questionName
                })
            }).then(async (e) => {
                const response = await e.json();
                if (response.response) {
                    window.alert(`Published with the name ${name.questionName}. Now it is ready to use`)
                    window.location.reload()
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="modal fade background-blur" id="modal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header pe-4">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure to publish question</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Before publish question you should verify your question set.
                            <ul type='square'>
                                <li className='mt-3'>
                                    You may Preview Question <Link to="/question-set/preview/" target="_blank" rel="noopener noreferrer">here.</Link>
                                </li>
                                <li>
                                    Remember, after publish this question set having quize code ' {localStorage.getItem('quizer-quize-code')} ' is ready for attempt test if you want to stop taking responses you've to STOP quzie in QUESTION SET option.
                                </li>
                                <li className="mb-3">
                                    You have to give a name to your question set before publishing it.
                                </li>
                            </ul>
                            <p className='mb-0 greeting-font'>Thank you for using Quizzer</p>
                        </div>
                        <div className="modal-footer">
                            <form className='d-flex'>
                                <input type="text" name="questionName" className='form-control border-1px'
                                    style={{ fontSize: '1.5rem' }} onChange={handleName}
                                    placeholder='Question set Name' defaultValue={name.questionName}
                                />
                                <button type="button" className="btn btn-sm btn-warning px-3 py-0 fw-bold mx-4"
                                    data-bs-dismiss="modal" onClick={handlePublishQuize}
                                    disabled={!name || name.questionName === ""} >
                                    Publish
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PublishQuizeModal
