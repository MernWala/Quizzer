import React, { useState, useContext } from 'react'
import DataContext from '../context/userData/DataContext'
import UtilityContext from '../context/utility/UtilityContext'
import QuestionForm from './QuestionForm'
import EngineContext from './context/EngineContext'

const NewQuize = () => {

  const eContext = useContext(EngineContext);
  const { create, handleCreteState } = eContext;

  const dataContext = useContext(DataContext);
  const { generateCode, userData } = dataContext;

  const utilContext = useContext(UtilityContext);
  const { sendMess } = utilContext;

  const handleCreateBtn = async () => {
    document.getElementById('createPreRequest').style.animation = 'linear fade-out .5s';
    setTimeout(() => {
      handleCreteState(true);
    }, 500);

    // Now it time to apiCall
    let code = userData && generateCode(userData._id);
    localStorage.setItem('quizer-quize-code', code)
    let user = userData && userData._id.toString();
    try {
      await fetch(`http://localhost:5001/genrate-question/generate/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "quizeCode": code,
          "totalStudentAllowed": "15",
          "questions": [],
          "isPublish": false
        })
      }).then((e) => {
        if (e.status === 201) {
          sendMess('info', 'Question set created');
        } else {
          sendMess('danger', 'Somthing went wrong with server. Try again later!');
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
  

  return (
    <>
      {!create &&
        <div className={`d-flex align-items-center justify-content-center flex-column mb-5 mt-3 ${!create && 'fade-in'}`} id="createPreRequest">
          <div id="someInstruction" className="row">
            <div>
              <p>Please read Instructions</p>
              <span>Carefully</span>
            </div>
            <div className="instruction">
              <ul>
                <li>
                  <i className="fa-solid fa-arrow-right-long mx-3"></i>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet illo aperiam expedita perferendis
                </li>
                <li>
                  <i className="fa-solid fa-arrow-right-long mx-3"></i>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet illo aperiam expedita perferendis
                </li>
                <li>
                  <i className="fa-solid fa-arrow-right-long mx-3"></i>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet illo aperiam expedita perferendis
                </li>
                <li>
                  <i className="fa-solid fa-arrow-right-long mx-3"></i>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet illo aperiam expedita perferendis
                </li>
                <li>
                  <i className="fa-solid fa-arrow-right-long mx-3"></i>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet illo aperiam expedita perferendis
                </li>
              </ul>
            </div>
          </div>

          <div className="newQuizeContainer">
            <div className="newQuizeContainer-closer">
              <button className="btn btn-custom btn-shadow" onClick={handleCreateBtn}>
                Create new Question set
              </button>
            </div>
          </div>
        </div>
      }

      {create &&
        <QuestionForm />
      }
    </>
  )
}

export default NewQuize
