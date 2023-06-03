import React, { useContext, useEffect } from 'react'
import "./style/question.scss";
import EngineContext from './context/EngineContext';

const QuestionDesine = (props) => {
    const enginContext = useContext(EngineContext);
    const { handleDeleteQuestion, handleCurrentQset, currentQset, handleClickedQuestionId } = enginContext;

    useEffect(() => {
        handleCurrentQset(props.qSet_Id)
    }, [currentQset]);

    return (
        <>
            <div className="mainContaier text-white">
                <div className="mainContaier-closer">
                    {/* question main body starts here */}
                    {
                        props.data.map((sample, index) => {
                            return (
                                <form id={`reset-btn-${index + 1}`} key={`question${index + 1}`} >
                                    <div className="container ">
                                        <div className="question-main-container d-flex justify-content-between">
                                            <div className="row col col-10 question-container ms-1">
                                                <div className="question-text d-flex fit-content">
                                                    <div className="sno-text fit-content">
                                                        <span>{index + 1}.</span>
                                                    </div>
                                                    <span className="mx-3">{sample.question}</span>
                                                </div>
                                                {/* add img tag here in future release */}
                                            </div>
                                            <div className="row col col-2 mark-container me-1">
                                                <span className="mark-text fit-content ms-auto">
                                                    {sample.marks + " "}Points
                                                </span>
                                            </div>
                                        </div>
                                        <div className="option-container-main ms-5 ps-4 mt-3">
                                            <div className="option-container-closer">
                                                {sample.multiAns ?
                                                    <div className="option-set fit-content">
                                                        {sample.option.map((op, index) => {
                                                            return (
                                                                <div className="option-group fit-content" key={op + "@0(^l/" + index} >
                                                                    <input type="checkbox" name={`option${index + 1}`} />
                                                                    <label htmlFor={`option${index + 1}`} className="ms-3" >{op}</label>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    :
                                                    <div className="option-set fit-content">
                                                        {sample.option.map((op, index) => {
                                                            return (
                                                                <div className="option-group fit-content" key={op + "@0(^l/" + index} >
                                                                    <input type="radio" name={`option`} />
                                                                    <label htmlFor={`option${index + 1}`} className="ms-3" >{op}</label>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                }
                                            </div>

                                            <div className="question-form-control mt-4">
                                                <div className="question-form-control-closer">
                                                    <button className="btn btn-secondary btn-sm py-0 px-4 me-3" type='reset'> Reset </button>
                                                    <button className="btn btn-primary btn-sm py-0 px-4 me-3" type='submit'> save </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mx-2 mt-4 flex-column fit-content ms-auto">
                                            <div className="btn-group fit-content ms-auto">
                                                <button type="button" className='btn btn-danger btn-sm py-0 q-card-tag-text px-3 border-radius-5rem'
                                                    onClick={() => handleDeleteQuestion(props.qSet_Id, sample._id)}>
                                                    Delete
                                                </button>
                                                <button type="button" className='btn btn-secondary btn-sm py-0 q-card-tag-text px-3 border-radius-5rem'
                                                    data-bs-toggle="modal" data-bs-target="#ModifyQuestionModal"
                                                    onClick={() => handleClickedQuestionId(sample._id)}>
                                                    Modify
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )
                        })}
                    {/* question main body end here */}
                </div>
            </div>
        </>
    )
}

export default QuestionDesine
