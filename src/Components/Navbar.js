import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/main.scss"

const Navbar = () => {

    const getDayName = (ele) => {
        if (ele === 1)
            return "Mon";
        else if (ele === 2)
            return "Tue";
        else if (ele === 3)
            return "Wed";
        else if (ele === 4)
            return "Thur";
        else if (ele === 5)
            return "Fri";
        else if (ele === 6)
            return "Sat";
        else if (ele === 7)
            return "Sun";
    }

    const getMonthName = (ele) => {
        if (ele === 0)
            return "Jan";
        else if (ele === 1)
            return "Feb";
        else if (ele === 2)
            return "Mar";
        else if (ele === 3)
            return "Apr";
        else if (ele === 4)
            return "May";
        else if (ele === 5)
            return "Jun";
        else if (ele === 6)
            return "Jul";
        else if (ele === 7)
            return "Aug";
        else if (ele === 8)
            return "Sep";
        else if (ele === 9)
            return "Oct";
        else if (ele === 10)
            return "Nov";
        else
            return "Dec";
    }

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-theam">
                <div className="container-fluid px-5">
                    <Link className="navbar-brand d-flex justify-content-center align-items-center" to="/">
                        <img src={require('./logo.png')} alt="" height="60px" />
                        <span className='theam-text mx-1' style={{ fontWeight: 800, fontSize: '2.5rem' }}>Quizzer</span>
                    </Link>

                    <div className='navbar-right-portion d-flex align-items-center'>
                        <div className='mx-3 theam-text date d-flex justify-content-center align-items-center'>
                            <p className='mb-0'>
                                {Math.abs(new Date(Date.now()).getHours() - 12)}:{Math.abs(new Date(Date.now()).getMinutes())}&nbsp;{(new Date(Date.now()).getHours() - 12) < 0 ? "AM" : "PM"}
                            </p>
                            <i className="fa-solid fa-circle mx-2" style={{ fontSize: '.5rem', lineHeight: '1rem' }}></i>
                            <p className='theam-text mb-0'>
                                {getDayName(Math.abs(new Date(Date.now()).getDay()))}, {getMonthName(Math.abs(new Date(Date.now()).getMonth()))} {Math.abs(new Date(Date.now()).getDate())}
                            </p>
                        </div>

                        <div className='mx-3 report-problem-btn custom-tooltip-btn' style={{ cursor: 'pointer' }}>
                            <Link to="/reportbug">
                                <i className="fa-solid fa-flag"></i>
                            </Link>
                            <span className='custom-tooltip'>Click to report a problem</span>
                        </div>

                        <div className='mx-3 d-flex justify-content-center align-items-center'>
                            <button className='btn btn-login-custom'>Login</button>
                            <p className='mb-0 login-mid-bar'>&nbsp;</p>
                            <button className='btn btn2-login-custom'>Sign Up</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
