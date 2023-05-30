import React from 'react'
import "./style/questionForm.scss"

const QuestionForm = () => {
  return (
    <>
      <div className="row question-form-main mb-4">
        <div className="question-form-closer p-0">
          <form>
            <div className="row mx-2 p-0">
              <div className="question-form-input-group p-0">
                <textarea name="question" cols="140" rows="4" spellCheck="true" placeholder='Enter question here'></textarea>
              </div>
            </div>
            <div className="row mx-1">
              <div className="set-box width-38p">
                <div className="set-box-closer">
                  <div className="set-box-header">
                    <span>
                      Option set
                    </span>
                  </div>
                  <div className="option-btn-group">
                    <input type="text" name="option1" placeholder='Option 1' />
                    <input type="text" name="option2" placeholder='Option 2' />
                    <input type="text" name="option3" placeholder='Option 3' />
                    <input type="text" name="option4" placeholder='Option 4' />
                  </div>
                </div>
              </div>

              <div className="set-box width-38p">
                <div className="set-box-closer">
                  <div className="set-box-header">
                    <span>Answer set</span>
                  </div>
                  <div className="option-btn-group">
                    <input type="text" name="anwer1" placeholder='Answer 1' />
                    <input type="text" name="anwer2" placeholder='Answer 2' />
                    <input type="text" name="anwer3" placeholder='Answer 3' />
                    <input type="text" name="anwer4" placeholder='Answer 4' />
                  </div>
                </div>
              </div>

              <div className="set-box border-0 width-18p p-0">
                <div className="option-btn-group">
                  {/* <button className="btn btn-custom btn-shadow">Add Question</button> */}
                  <label htmlFor="carriedMark">Caried Marks</label>
                  <input type="number" name="carriedMark" required />
                </div>

                <div className="option-btn-group">
                  <input type="checkbox" name="multipleSelect" />
                  <label htmlFor="multipleAnswer">Allow Multiple Answer</label>
                </div>

                <div className="option-btn-group mb-4 ml-auto">
                  <input type="file" name="image" accept='image/*' className='inp-type-file btn' />
                  <label htmlFor="image" className='mx-1 font-size-1-3' style={{ userSelect: 'none' }}>Any Image</label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="option-btn-group mt-4 col-2">
          <button className="btn btn-custom btn-shadow">Add Question</button>
        </div>
      </div>

      <div className="row px-0">
        <div id="totalNumberOfQuestion">
          
          <div className="col col-12 mb-4">
            <i class="fa-solid fa-forward fa-2x"></i>
            <span className='mx-3'>Total Number Of Question</span>
            <span className='theamText font-size-2'>
              10    {/* make it dynamic later */}
            </span>
          </div>

          <div className="col col-2">
            <button className='btn btn-custom'>Previev Question</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default QuestionForm
