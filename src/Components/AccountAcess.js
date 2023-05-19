import React, { useContext } from 'react'
import randomStory from '../storyset/random.svg';
import { Link, useNavigate } from 'react-router-dom';
import UtilityContext from '../context/utility/UtilityContext';

const AccountAcess = () => {

    const navigate = useNavigate();
    
    const utilContext = useContext(UtilityContext);
    const handleClick = (e) => {
        utilContext.setAccess(e);
        navigate("/app/acess-account/auth");
    }

    return (
        <>
            <div className='top-right-random-desine-custom'>
                <img src={randomStory} alt='side desine' />
            </div>

            <div className='container'>
                <div className='row'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className="acc-acess-text-box-left col-5">
                            <div className="p-2">
                                <div className="text-box">
                                    <span className='acc-acess-text-box-1' style={{ lineHeight: '1' }}>
                                        H<span>i</span>,
                                    </span>
                                    <br />
                                    <span className='acc-acess-text-box-1 f-size-3' style={{ lineHeight: '1.2' }}>You should select a<br />Accout Type <i className="fa-regular fa-light fa-face-smile"></i></span>
                                </div>

                                <div className="btn-group my-5">
                                    <button onClick={() => handleClick(true)} className="custom-btn no-text-decor px-3">Instructor</button>
                                    <button onClick={() => handleClick(false)} className="custom-btn2 mx-3 no-text-decor px-3">Student</button>
                                </div>

                                <div className='suggestion-text'>
                                    <p className='mb-0'>If you looking for conduct test you need a Instructor profile</p>
                                    <p className='mb-0'>Student profile helps you in attempt test</p>
                                    <p className="mb-0">Don't have accout register <Link to="/app/signup">here</Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="right col-6">
                            <div className='accountAccess-card-img-body'></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountAcess
