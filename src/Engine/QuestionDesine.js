import React from 'react'
import "./style/question.scss"

const QuestionDesine = (props) => {

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
