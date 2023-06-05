import React, { useContext } from 'react'
import "./style/questionForm.scss"
import EngineContext from './context/EngineContext'
import { Link } from 'react-router-dom';
import UtilityContext from '../context/utility/UtilityContext'

const QuestionForm = (props) => {

  const enginContext = useContext(EngineContext);
  const { handleOnChange, addQuestionApiCall, handleMultiSelect, multiSelect, modifyQuestionApiCall } = enginContext;

  const code = localStorage.getItem('quizer-quize-code');
  const utilContext = useContext(UtilityContext);
  const { sendMess } = utilContext;

  // modify question API call
  const handleModify = async (e) => {
    e.preventDefault();
    await modifyQuestionApiCall(props.qSetId, localStorage.getItem('quizer-modify-question-id'));
  }

  return (
    <>
      <div className='container fade-in .animation-delay-5' id="createQuizeMain">
        <div className="createQuizeMain-closer mx-4">
          {!props.isModify &&
            <div className="row mx-1">
              <div className="col col-8 header-2 text-white">
                <p>
                  <span className="theamText">Y</span>ou may <span className="theamText">A</span>dd question <span className="theamText">H</span>ere
                </p>
              </div>

              <div className="quizeCode col col-4 text-white custom-tooltip-btn" onClick={() => { navigator.clipboard.writeText(code); sendMess('info', `Quiz code ( ${code} ) copied to clipboard`) }}>
                <span className='d-flex align-items-center'>
                  Quize Code
                  <i className="fa-solid fa-arrow-right-long mx-3"></i>
                  <b>
                    {
                      code
                    }
                  </b>
                </span>
                <span className='custom-tooltip custom-tooltip-copyText'>Click to copy code</span>
              </div>
            </div>
          }

          <div className="row question-form-main my-4">
            <div className="question-form-closer p-0">
              <form id='questionForm' onSubmit={!props.isModify ? addQuestionApiCall : handleModify}>
                <div className="row mx-2 p-0">
                  <div className="question-form-input-group p-0">
                    {!props.isModify ?
                      <textarea name="question" cols="140" rows="4" spellCheck="true" placeholder='Enter question here*' onChange={handleOnChange} required />
                      :
                      <textarea name="question" cols="140" rows="4" spellCheck="true" placeholder='Enter question here' onChange={handleOnChange} />
                    }
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
                        {!props.isModify ?
                          <input onChange={handleOnChange} type="text" name="option1" placeholder='Option 1*' required />
                          :
                          <input onChange={handleOnChange} type="text" name="option1" placeholder='Option 1' />
                        }
                        {!props.isModify ?
                          <input onChange={handleOnChange} type="text" name="option2" placeholder='Option 2*' required />
                          :
                          <input onChange={handleOnChange} type="text" name="option2" placeholder='Option 2' />
                        }
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
                        {!props.isModify ?
                          <input onChange={handleOnChange} type="text" name="answer1" placeholder='Answer 1*' required />
                          :
                          <input onChange={handleOnChange} type="text" name="answer1" placeholder='Answer 1' />
                        }
                        {!props.isModify ?
                          <input onChange={handleOnChange} type="text" name="answer2" placeholder={!multiSelect ? 'Disabled' : 'Answer 2*'} className={`${!multiSelect && 'disable-btn'}`} disabled={!multiSelect} required />
                          :
                          <input onChange={handleOnChange} type="text" name="answer2" placeholder={!multiSelect ? 'Disabled' : 'Answer 2'} className={`${!multiSelect && 'disable-btn'}`} disabled={!multiSelect} />
                        }
                        <input onChange={handleOnChange} type="text" name="answer3" placeholder={!multiSelect ? 'Disabled' : 'Answer 3'} className={`${!multiSelect && 'disable-btn'}`} disabled={!multiSelect} />
                        <input onChange={handleOnChange} type="text" name="answer4" placeholder={!multiSelect ? 'Disabled' : 'Answer 4'} className={`${!multiSelect && 'disable-btn'}`} disabled={!multiSelect} />
                      </div>
                    </div>
                  </div>

                  <div className="set-box border-0 width-18p p-0">
                    <div className="option-btn-group">
                      <label htmlFor="carriedMark">
                        {!props.isModify ?
                          'Caried Marks*'
                          :
                          'Caried Marks'
                        }
                      </label>
                      {!props.isModify ?
                        <input onChange={handleOnChange} type="number" name="carriedMark" required />
                        :
                        <input onChange={handleOnChange} type="number" name="carriedMark" />
                      }
                    </div>

                    <div className="option-btn-group my-4">
                      <input onChange={handleMultiSelect} type="checkbox" name="multipleAnswer" className='mx-0' />
                      <label htmlFor="multipleAnswer" className='mx-2 text-white'>Allow Multiple Answer</label>
                    </div>

                    <div className="option-btn-group mb-4 ml-auto justify-content-start">
                      <input onChange={handleOnChange} type="file" name="image" accept='image/*' className='inp-type-file btn p-0 cursor-pointer btn-custom text-white py-2 px-3' />
                    </div>
                  </div>

                  <div className="row">
                    <div className="option-btn-group mt-4 col-2">
                      {!props.isModify ?
                        <button type="submit" className="btn btn-custom btn-shadow">Add Question</button>
                        :
                        <button type="submit" className="btn btn-custom btn-shadow" data-bs-dismiss="modal">Modify It</button>
                      }
                    </div>
                  </div>

                </div>
              </form>
            </div>
          </div>

          {!props.isModify &&
            <div className="row px-0">
              <div id="totalNumberOfQuestion" className='p-0'>
                <div className="d-flex mt-4">
                  <Link className='width-18p btn btn-custom' to="/question-set/preview" target='_blank' >Previev all questions</Link>
                  <button className='width-18p mx-4 btn btn-custom' data-bs-toggle="modal" data-bs-target="#modal2" >Publish Quize</button>
                </div>
              </div>
            </div>
          }

        </div>
      </div>
    </>
  )
}

export default QuestionForm
