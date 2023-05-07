import React from 'react'
import randomStory from '../storyset/random.svg';
import { Link } from 'react-router-dom';

const AccountAcess = () => {
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
                                    <span className='acc-acess-text-box-1 f-size-3' style={{ lineHeight: '1.2' }}>You should select a<br />Accout Type <i class="fa-regular fa-light fa-face-smile"></i></span>
                                </div>

                                <div className="btn-group my-5">
                                    <button className="custom-btn">Instructor</button>
                                    <button className="custom-btn2 mx-3">Student</button>
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
