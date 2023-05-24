import React, { useState, useContext } from 'react'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/userData/DataContext';
import UtilityContext from '../context/utility/UtilityContext';

const Home = () => {

  const dataContext = useContext(DataContext)
  const { isLogin } = dataContext;

  const utilContext = useContext(UtilityContext);
  const { setAccess } = utilContext

  const [joiningCode, setJoiningCode] = useState("");
  const handleOnChange = (e) => {
    setJoiningCode({ ...joiningCode, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  const handleLinkClick = () => {
    if (isLogin) {
      navigate("/app/engine-v1/instructor");
    } else {
      setAccess(true);
      navigate('/app/acess-account/auth');
    }
  }

  const handleJoin = () => {
    if(joiningCode.testCodeLink.length > 10){
      navigate(joiningCode);
    }else{
      navigate(`/joining-code-${joiningCode.testCodeLink}`)
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
                <button className="custom-btn no-text-decor px-3 btn-2m" onClick={handleLinkClick}>New Quize</button>
                <form className='d-flex'>
                  <div className="input-group">
                    <label htmlFor="testCodeLink"></label>
                    <input type="text" name='testCodeLink' id='testCodeLink' className='home-link-input mx-4' placeholder='Enter a code or link' onChange={handleOnChange} />
                  </div>
                </form>
              </div>

              {
                joiningCode.testCodeLink &&
                <div className="join-btn-home">
                  <button onClick={handleJoin}>Join</button>
                </div>
              }
            </div>

            <hr className='my-5'/>

            <div className="homeLoginDescription">
              <a href="/" className='description-link' target='_blank' rel="noopener noreferrer">Learn More</a> <span>about Quizzer</span>
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
