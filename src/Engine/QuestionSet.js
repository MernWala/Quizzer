import React, { useEffect, useContext } from 'react'
import EngineContext from "./context/EngineContext"
import UtilityContext from '../context/utility/UtilityContext';

const Draft = () => {

  const eContext = useContext(EngineContext);
  const { userAllQuestionSet, fetchAllQuestionData, handleDelete, countMarks, handleChoice } = eContext;

  const UC = useContext(UtilityContext)
  const { sendMess } = UC

  useEffect(() => {
    const asyncApiCall = async () => {
      await fetchAllQuestionData();
    }
    asyncApiCall();
  }, [])

  const saveLocal = (qCode) => {
    localStorage.setItem('quizer-quize-code', qCode);
  }

  return (
    <>
      <div className="container my-3 fade-in">
        <div className="col col-8 header-2">
          <p>
            <span className="theamText">H</span>ere<span className="theamText">'</span>s your <span className="theamText">A</span>ll question <span className="theamText">S</span>ets
          </p>
        </div>
        <hr className='theamText mb-1' />
        <div className="row mx-0 flex-wrap justify-content-evenly">
          {/* quize card starts here */}
          {
            userAllQuestionSet.map((data) => {
              return (
                <div className="q-card-main-container m-3" style={{ width: '35rem' }} key={data._id}>
                  <div className="card font-size-150p text-white background-transparent width-100p">
                    <div className="card-body">
                      <div className="d-flex border-bottom-1">
                        <h5 className="card-title col-8 font-size-17px">
                          {
                            data.qName ? data.qName : 'Draft'
                          }
                        </h5>
                        <div className="tags-group col-4 d-flex justify-content-end">
                          {
                            data.isPublish ?
                              <span className="btn btn-sm btn-warning text-white fw-bold q-card-tag-text py-0" style={{ cursor: 'default' }}>Published</span>
                              :
                              <span className="btn btn-sm btn-info text-white fw-bold q-card-tag-text py-0" style={{ cursor: 'default' }}>Draft</span>
                          }
                        </div>
                      </div>
                      <hr className='teamText' />
                      <p className="card-text d-flex flex-column">
                        <span className="card-subtitle fs-4 text-white q-card-subtitle-text">
                          Quize code - {data.quizeCode}
                          <i class="ico-btn p-2 rounded ms-2 fa-solid fa-clone cursor-pointer" onClick={() => {
                            window.navigator.clipboard.writeText(data.quizeCode)
                            sendMess("info", "Copied to clipboard")
                          }}></i>
                        </span>
                        No of question - {data.questions.length} <br />
                        Total Marks - {countMarks(data)}
                      </p>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-danger btn-sm py-0 q-card-tag-text px-3" type="button" onClick={() => handleDelete(data._id)}>Delete</button>
                        <a className="btn btn-secondary btn-sm py-0 q-card-tag-text px-3 mx-0"
                          href='/question-set/preview/'
                          type="button" target="_blank" rel="noopener noreferrer" onClick={() => saveLocal(data.quizeCode)}>
                          Preview / Modify
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="/question/edit/add-question/"
                          className="btn btn-primary btn-sm py-0 q-card-tag-text px-3 mx-0" type="button"
                          onClick={() => saveLocal(data.quizeCode)}>
                          Add Question
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }

          {
            userAllQuestionSet.length === 0 &&
            <div className='py-5 my-5 d-flex align-items-center justify-content-center flex-column'>
              <span className='fs-3 ff-nunito'>It's seems like there is no question created by you</span>
              <div className="width-fit my-3">
                <button className='btn btn-custom btn-shadow' onClick={() => { handleChoice(3) }}>Let's create question set</button>
              </div>
            </div>
          }
          {/* quize card ends here */}
        </div>
      </div>
    </>
  )
}

export default Draft
