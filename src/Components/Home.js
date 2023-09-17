import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UtilityContext from '../context/utility/UtilityContext';
import EngineContext from '../Engine/context/EngineContext';
import DataContext from '../context/userData/DataContext';

const Home = () => {

  useEffect(() => {
    document.title = "Quizzer - Home";
  }, [])

  const utilContext = useContext(UtilityContext);
  const { setAccess, sendMess } = utilContext

  const dContext = useContext(DataContext);
  const { fetchTestApi, backendHost } = dContext;

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
      await fetch(`${backendHost}/api/getDetails/inst`, {
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

  const handleJoin = async (e) => {
    e.preventDefault();
    let data = await fetchTestApi(joiningCode.testCodeLink);

    if (joiningCode.testCodeLink.length !== 8) {
      sendMess('info', 'Not a valid quiz code');
    } else {
      if (data.error) {
        sendMess('warning', data.error);
      } else {
        if (data.status === `Can't attempt after submit`) {
          sendMess('warning', `${data.status}, ID: ${data.id}. Contact your guide if needed`)
        } else {
          if (data.quizeSet.isPublish === false) {
            sendMess('info', `It seems like your guide is not activate quize yet`)
          } else {
            navigate(`/joining-code/${joiningCode.testCodeLink}`)
          }
        }
      }
    }
  }

  return (
    <>
      <div className="text-white d-flex my-4 mx-5 justify-content-evenly">
        <div className="homeLeft">
          <div className="left-closer">
            <div className="homeHeader mb-5">
              <span>Premium quizzing app <br />Now free for everyone.</span>
              <p className='my-4'>There is no cramming for a test of character.<br />It always comes as a pop quiz</p>
            </div>

            <div className='d-flex align-items-center'>
              <div className='btn-group'>
                <button className="custom-btn no-text-decor px-3 btn-2m my-2" onClick={handleLinkClick}>
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
              <Link to="/about-us" className='description-link'>Learn More</Link> <span>about Quizzer</span>
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
