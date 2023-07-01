import React, { useState, useContext, useEffect } from 'react'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom';
import UtilityContext from '../context/utility/UtilityContext';
import EngineContext from '../Engine/context/EngineContext';
import DataContext from '../context/userData/DataContext';

const Home = () => {

  useEffect(() => {
    document.title = "Quizzer || Home";
  }, [])

  const utilContext = useContext(UtilityContext);
  const { setAccess, sendMess } = utilContext

  const [joiningCode, setJoiningCode] = useState("");
  const handleOnChange = (e) => {
    setJoiningCode({ ...joiningCode, [e.target.name]: e.target.value });
  }

  const eContext = useContext(EngineContext);
  const { handleChoice } = eContext;

  const navigate = useNavigate();

  const handleLinkClick = async () => {
    let token = await localStorage.getItem('quizer-auth-token');

    try {
      await fetch(`http://localhost:5001/api/getDetails/inst`, {
        method: 'POST',
        headers: {
          'auth-token': token,
        }
      }).then(async (res) => {
        const data = await res.json();
        if (data !== null) {
          if (token) {
            handleChoice(3);
            navigate("/app/engin/instructor");
          } else {
            setAccess(true);
            navigate('/app/acess-account/auth');
          }
        } else {
          sendMess('warning', `You should have instructor profile for conducting quiz`);
        }
      })
    } catch (error) {
      console.warn(`Can't get authentication token!`);
    }
  }

  const dContext = useContext(DataContext);
  const { fetchTestApi, qSetData } = dContext;

  const handleJoin = async (e) => {
    e.preventDefault();
    let data = await fetchTestApi(joiningCode.testCodeLink);

    if (data.status !== "Can't attempt after submit") {
      if (joiningCode.testCodeLink.length === 8) {
        if (qSetData && qSetData.error) {
          sendMess('warning', `No quiz found with quize code ${joiningCode.testCodeLink}`);
        } else {
          navigate(`/joining-code/${joiningCode.testCodeLink}`)
        }
      } else {
        sendMess('warning', "Not a valid quize code !")
      }
    } else {
      sendMess('danger', `It seems like you have submited your response`);

      setTimeout(() => {
        sendMess('warning', `You may contact to your guide.`);
        setTimeout(() => {
          sendMess('info', `We have just provided you a ID in your clipboard. Your ID is: ${data.id}`);
          navigator.clipboard.writeText(data.id);
          setTimeout(() => {
            document.getElementById('joining-form').reset()
          }, 3000);
        }, 3000);
      }, 3000);
    }
  }

  return (
    <>
      <ProfileModal />
      <div className="text-white d-flex my-4 mx-5 justify-content-evenly">
        <div className="homeLeft">
          <div className="left-closer">
            <div className="homeHeader mb-5">
              <span>Premium quizzing app <br />Now free for everyone.</span>
              <p className='my-4'>There is no cramming for a test of character.<br />It always comes as a pop quiz</p>
            </div>

            <div className='d-flex align-items-center'>
              <div className='btn-group'>
                <button className="custom-btn no-text-decor px-3 btn-2m" onClick={handleLinkClick}>
                  <i className="fas fa-question me-2 text-white"></i>
                  New Quize
                </button>
                <form className='d-flex align-items-center' onSubmit={() => handleJoin()} id='joining-form'>
                  <div className="input-group">
                    <label htmlFor="testCodeLink"></label>
                    <input type="text" name='testCodeLink' id='testCodeLink' className='home-link-input mx-4'
                      placeholder='Enter a code or link' onChange={handleOnChange} />
                  </div>
                  {
                    joiningCode.testCodeLink &&
                    <div className="join-btn-home">
                      <button type='submit' onClick={handleJoin}>Join</button>
                    </div>
                  }
                </form>
              </div>
            </div>

            <hr className='my-5' />

            <div className="homeLoginDescription">
              <a href="/about-us" className='description-link' target='_blank' rel="noopener noreferrer">Learn More</a> <span>about Quizzer</span>
            </div>

          </div>
        </div>

        <div className="homeRight">
          <div className="right-closer">
            <div className="quize-animate-show"></div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Home
