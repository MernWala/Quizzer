import React, { useContext, useState } from 'react'
import "./style/questionForm.scss"
import EngineContext from './context/EngineContext'
import { Link } from 'react-router-dom';

const QuestionForm = () => {

  const enginContext = useContext(EngineContext);
  const { handleOnChange, addQuestionApiCall, handleMultiSelect, multiSelect } = enginContext;

  return (
    <>
      <div className="row question-form-main mb-4">
        <div className="question-form-closer p-0">
          <form id='questionForm' onSubmit={addQuestionApiCall}>
            <div className="row mx-2 p-0">
              <div className="question-form-input-group p-0">
                <textarea name="question" cols="140" rows="4" spellCheck="true" placeholder='Enter question here*' onChange={handleOnChange} required></textarea>
              </div>
            </div>
            <div className="row mx-1 my-3">
              <div className="set-box width-38p">
                <div className="set-box-closer">
                  <div className="set-box-header">
                    <span>
                      Option set
                    </span>
                  </div>
                  <div className="option-btn-group">
                    <input onChange={handleOnChange} type="text" name="option1" placeholder='Option 1*' required />
                    <input onChange={handleOnChange} type="text" name="option2" placeholder='Option 2*' required />
                    <input onChange={handleOnChange} type="text" name="option3" placeholder='Option 3' />
                    <input onChange={handleOnChange} type="text" name="option4" placeholder='Option 4' />
                  </div>
                </div>
              </div>

              <div className="set-box width-38p">
                <div className="set-box-closer">
                  <div className="set-box-header">
                    <span>Answer set</span>
                  </div>
                  <div className="option-btn-group">
                    <input onChange={handleOnChange} type="text" name="answer1" placeholder='Answer 1*' required />
                    <input onChange={handleOnChange} type="text" name="answer2" placeholder={!multiSelect ? 'Disabled' : 'Answer 2*'} className={`${!multiSelect && 'disable-btn'}`} disabled={!multiSelect} required />
                    <input onChange={handleOnChange} type="text" name="answer3" placeholder={!multiSelect ? 'Disabled' : 'Answer 3'} className={`${!multiSelect && 'disable-btn'}`} disabled={!multiSelect} />
                    <input onChange={handleOnChange} type="text" name="answer4" placeholder={!multiSelect ? 'Disabled' : 'Answer 4'} className={`${!multiSelect && 'disable-btn'}`} disabled={!multiSelect} />
                  </div>
                </div>
              </div>

              <div className="set-box border-0 width-18p p-0">
                <div className="option-btn-group">
                  <label htmlFor="carriedMark">Caried Marks*</label>
                  <input onChange={handleOnChange} type="number" name="carriedMark" required />
                </div>

                <div className="option-btn-group my-4">
                  <input onChange={handleMultiSelect} type="checkbox" name="multipleAnswer" className='mx-0' />
                  <label htmlFor="multipleAnswer" className='mx-2'>Allow Multiple Answer</label>
                </div>

                <div className="option-btn-group mb-4 ml-auto justify-content-start">
                  <input onChange={handleOnChange} type="file" name="image" accept='image/*' className='inp-type-file btn p-0 cursor-pointer' />
                  <label htmlFor="image" className='mx-1 font-size-1-3' style={{ userSelect: 'none' }}>Any Image</label>
                </div>
              </div>


              <div className="row">
                <div className="option-btn-group mt-4 col-2">
                  <button type="submit" className="btn btn-custom btn-shadow">Add Question</button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>

      <div className="row px-0">
        <div id="totalNumberOfQuestion" className='p-0'>
          <div className="d-flex mt-4">
            <Link className='width-18p btn btn-custom' to="/question-set/preview" target='_blank' >Previev all questions</Link>
            <button className='width-18p mx-4 btn btn-custom' data-bs-toggle="modal" data-bs-target="#modal2" >Publish Quize</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default QuestionForm
