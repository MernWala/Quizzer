import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UtilityContext from '../context/utility/UtilityContext';
import DataContext from '../context/userData/DataContext';

const Auth = () => {
    let navigate = useNavigate();

    const utilContext = useContext(UtilityContext);
    const { accessType, setAccess, sendMess } = utilContext;

    useEffect(() => {
        if (accessType === true) {
            document.title = "Quizer - Instructor login"
        } else {
            document.title = "Quizer - Student login"
        }
    }, [accessType])

    const dataContext = useContext(DataContext);
    const { loadData_inst, loadData_stu } = dataContext;

    // Instructuctor handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5001/auth-login/inst`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": credential.email,
                "password": credential.password
            })
        });
        const json = await response.json()

        if (json.authTocken) {
            localStorage.setItem('quizer-auth-token', json.authTocken);
            await loadData_inst(json.authTocken);
            sendMess('success', 'Login Successfully')
            navigate("/app/engin/instructor");
            window.location.reload();
        } else {
            sendMess('warning', 'Invalid Email or Password')
            localStorage.removeItem('quizer-auth-token');
        }
    }

    // Instructor onChange function
    const [credential, setCredential] = useState({ email: "", password: "" });
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    // Student handel submit function
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5001/auth-login/stu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": stuCred.studentEmail,
                "password": stuCred.studentPassword
            })
        });
        const json = await response.json()

        if (json.authTocken) {
            localStorage.setItem('quizer-auth-token', json.authTocken);
            await loadData_stu(json.authTocken);
            sendMess('success', 'Login Successfully')
            navigate("/");
        } else {
            localStorage.removeItem('quizer-auth-token');
            sendMess('warning', 'Invalid Email or Password')
        }
    }

    // Student onChange function
    const [stuCred, setStuCred] = useState({ studentEmail: "", studentPassword: "", code: "" });
    const onChange2 = (e) => {
        setStuCred({ ...stuCred, [e.target.name]: e.target.value })
    }

    const [eyeBtn, setEyeBtn] = useState('fa-eye-slash')
    const handleEyeBtn = () => {
        if (eyeBtn === 'fa-eye') {
            setEyeBtn('fa-eye-slash');
            sendMess('info', 'Password eye is off')
        } else {
            setEyeBtn('fa-eye');
            sendMess('info', 'Password eye is on')
        }
    }

    return (
        <>
            <div className="container center-center">
                <div className="custom-row mt-5">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item width-50" role="presentation">
                            <button className={`nav-link text-white ${accessType === true ? "active" : ""} width-100`} id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button"
                                role="tab" aria-controls="home-tab-pane" aria-selected="true" onClick={() => setAccess(true)}>Instructor</button>
                        </li>
                        <li className="nav-item width-50" role="presentation">
                            <button className={`nav-link text-white ${accessType === false ? "active" : ""} width-100`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button"
                                role="tab" aria-controls="profile-tab-pane" aria-selected="false" onClick={() => setAccess(false)}>Student</button>
                        </li>
                    </ul>

                    <div className="tab-content px-5" id="loginTabContent">
                        <div className={`tab-pane fade text-white py-3 px-2 ${accessType === true ? "show active" : ""} `} id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                            <div className="form" id="instructor-form">
                                <form className='loginForm' onSubmit={handleSubmit}>
                                    <div className="input-group mx-3">
                                        <label htmlFor="email" className={`input-group-label ${credential.email && 'no-text'}`} >Instructor mail*</label>
                                        {credential.email ? <div className="no-text-reverse">&nbsp;</div> : ''}
                                        <input type="email" id="email" name='email' onChange={onChange} required />
                                    </div>
                                    <div className="input-group mx-3">
                                        <label htmlFor="password" className={`input-group-label ${credential.password && 'no-text'}`}>Your password*</label>
                                        {credential.password ? <div className="no-text-reverse">&nbsp;</div> : ''}
                                        <input type={eyeBtn === 'fa-eye-slash' ? 'password' : 'text'} name="password" id="password" onChange={onChange} required autoComplete='off' />
                                        <i className={`fa-regular ${eyeBtn} pass-eye-color`} onClick={handleEyeBtn}></i>
                                    </div>
                                    <div className="input-group mx-3">
                                        <input type="Submit" value="Login" readOnly />
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className={`tab-pane fade text-white py-3 px-2 ${accessType === false ? "show active" : ""}`} id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                            <div className="form" id="instructor-form">
                                <form className='loginForm' onSubmit={handleSubmit2}>
                                    <div className="input-group mx-3">
                                        <label className={`input-group-label ${stuCred.studentEmail && 'no-text'}`} htmlFor="studentEmail" id="email_label_2">Student mail*</label>
                                        {stuCred.studentEmail ? <div className="no-text-reverse">&nbsp;</div> : ''}
                                        <input type="email" name="studentEmail" id="studentEmail" onChange={onChange2} required />
                                    </div>
                                    <div className="input-group mx-3">
                                        <label className={`input-group-label ${stuCred.studentPassword && 'no-text'}`} htmlFor="studentPassword" id='pass_label_2'>Your password*</label>
                                        {stuCred.studentPassword ? <div className="no-text-reverse">&nbsp;</div> : ''}
                                        <input type={eyeBtn === 'fa-eye-slash' ? 'password' : 'text'} name="studentPassword" id="studentPassword" onChange={onChange2} required autoComplete='off' />
                                        <i className={`fa-regular ${eyeBtn} pass-eye-color`} onClick={handleEyeBtn}></i>
                                    </div>
                                    <div className="input-group mx-3">
                                        <input type="Submit" value="Login" readOnly />
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Auth
