import React, { useContext } from 'react'
import SideNav from './SideNav'
import ProfileModal from '../Components/ProfileModal'
import IEngineBody from "./IEngineBody";
import { Link } from 'react-router-dom';
import EngineContext from './context/EngineContext';


const EngineHome = () => {

  const eContext = useContext(EngineContext);
  const { handleChoice, handlePublishQuize } = eContext;

  const handleClick = () => {
    handleChoice(2);
  }

  return (
    <>
      <ProfileModal />
      <div className="d-flex">
        <SideNav />
        <IEngineBody />
      </div>

      {/* <!-- Confirmation for publishing Question set --> */}
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
                <li className='mb-3'>
                  You may edit Question <a href="/" target="_blank" rel="noopener noreferrer">here.</a>
                </li>
                <li className='mb-3'>
                  Remember, to start quiz you need to visite draft option in sidebar or you can directly visit via this <Link data-bs-dismiss="modal" onClick={handleClick} >link.</Link>
                </li>
              </ul>
              <p className='mb-0 greeting-font'>Thank you for using Quizzer</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-sm btn-warning px-3 py-0 fw-bold mx-4" data-bs-dismiss="modal" onClick={() => {handlePublishQuize(localStorage.getItem('quizer-quize-code'))} }>Publish</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EngineHome
