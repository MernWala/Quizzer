import React, { useState, useContext } from 'react';
import Jumbotron from './Jumbotron';
import "../styles/register.scss";
import UtilityContext from '../context/utility/UtilityContext';
import { useNavigate } from 'react-router-dom'
import DataContext from '../context/userData/DataContext';

function Register() {

    const utilContext = useContext(UtilityContext);
    const { sendMess, setAccess } = utilContext;

    const DS = useContext(DataContext)
    const { sendOTPAPI, backendHost } = DS

    const [userData, setUserData] = useState({
        fName: '',
        lName: '',
        email: '',
        OTP: '',
        pass1: '',
        pass2: '',
        accountType: '',
    })

    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const [declaration, setDeclaration] = useState(false);
    const handleDclaration = () => {
        if (declaration)
            setDeclaration(false);
        else
            setDeclaration(true);
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.pass1 === userData.pass2) {
            // passwordCheck
            const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if (!regularExpression.test(userData.pass1)) {
                sendMess('info', 'Password criteria not matched')
            } else {
                if (userData.accountType === "Instructor") {
                    await fetch(`${backendHost}/auth-register/inst`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            fName: userData.fName,
                            lName: userData.lName,
                            email: userData.email,
                            OTP: userData.OTP,
                            password: userData.pass1,
                            accountType: userData.accountType,
                        })
                    }).then(async (e) => {
                        let data = await e.json()
                        if (e.status === 201) {
                            sendMess('success', 'Your Acccount successfully created. You may login here.');
                            setAccess(true);
                            navigate("/app/acess-account/auth");
                        } else {
                            if (data.errors) {
                                console.log(data.errors);
                                sendMess('danger', data.errors[0].msg);
                            }
                        }
                    }).then(async () => {
                        await fetch(`${backendHost}/verify/mail/delete/otp`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: userData.email,
                            })
                        })
                    })
                } else {
                    await fetch(`${backendHost}/auth-register/stu`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            fName: userData.fName,
                            lName: userData.lName,
                            email: userData.email,
                            OTP: userData.OTP,
                            password: userData.pass1,
                            accountType: userData.accountType,
                            picture: '',
                        })
                    }).then((e) => {
                        if (e.status === 201) {
                            sendMess('success', 'Your Acccount successfully created. You may login here.');
                            setAccess(false);
                            navigate("/app/acess-account/auth");
                        } else {
                            sendMess('danger', 'This email is already registered');
                        }
                    }).then(async () => {
                        await fetch(`${backendHost}/verify/mail/delete/otp`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: userData.email,
                            })
                        })
                    })
                }
            }
        } else {
            sendMess('info', 'Password Not Matched')
            console.log('handle clicked called');
        }

    }

    return (
        <>
            <div className='d-flex align-items-center justify-content-center flex-column my-5'>
                <Jumbotron text="Registration" barMargin={10} />
                <div className="registration-container">
                    <form className='text-white' onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="input-group">
                                <div className="col col-3">
                                    <label htmlFor="fName">First Name*</label>
                                </div>
                                <div className="col col-9">
                                    <input type="text" name="fName" id="fName" onChange={onChange} placeholder='Enter first name' />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-group">
                                <div className="col col-3">
                                    <label htmlFor="lName">Last Name*</label>
                                </div>
                                <div className="col col-9">
                                    <input type="text" name="lName" id="lName" onChange={onChange} placeholder='Enter your title' />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-group width-100">
                                <div className="col col-3">
                                    <label htmlFor="email">Email Id*</label>
                                </div>
                                <div className="col col-9 d-flex align-items-center gap-3">
                                    <input type="email" name="email" id="email" onChange={onChange} placeholder='samplemail@domain.com' />
                                    <div className="submit-btn">
                                        <button type="button" className='custom-register-btn py-3' style={{ width: '10rem' }} onClick={() => sendOTPAPI(userData.email)}>Sent OTP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-group width-100">
                                <div className="col col-3">
                                    <label htmlFor="OTP">verification OTP*</label>
                                </div>
                                <div className="col col-9">
                                    <input type="number" name="OTP" onChange={onChange} placeholder='OTP - XXXX' disabled={!userData.email} className={!userData.email ? `opacity-50 no-spinner` : `no-spinner`} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-group">
                                <div className="col col-3">
                                    <label htmlFor="pass1">Create Password*</label>
                                </div>
                                <div className="col col-9">
                                    <input type="password" name="pass1" autoComplete='on' onChange={onChange} disabled={!userData.OTP} className={!userData.OTP ? `opacity-50` : ''} placeholder='Enter Password' />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-group">
                                <div className="col col-3">
                                    <label htmlFor="pass2">Re-Enter Password *</label>
                                </div>
                                <div className="col col-9">
                                    <input type="password" name="pass2" autoComplete='on' onChange={onChange} disabled={!userData.OTP} className={!userData.OTP ? `opacity-50` : ''} placeholder='Re - enter Password' />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-group">
                                <div className="col-3 col">
                                    <label htmlFor="">Account Type*</label>
                                </div>

                                <div className="col col-9">
                                    <div className="radio-group">
                                        <div className="radio-wrap">
                                            <input type="radio" name="accountType" id="accountType1" value="Instructor" onChange={onChange} disabled={!userData.OTP} className={!userData.OTP ? `opacity-50` : ''} />
                                            <label htmlFor="accountType1">Instructor</label>
                                        </div>
                                        <div className="radio-wrap">
                                            <input type="radio" name="accountType" id="accountType2" value="Student" onChange={onChange} disabled={!userData.OTP} className={!userData.OTP ? `opacity-50` : ''} />
                                            <label htmlFor="accountType2">Student</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 my-5 d-flex gap-2">
                            <input type="checkbox" name="declaration" id="declaration" onClick={handleDclaration} disabled={!userData.OTP} className={!userData.OTP ? `opacity-50` : ''} />
                            <label htmlFor="declaration" className='declaration-label'>I agree to share data with Quizzer</label>
                        </div>

                        <div className="row mx-3">
                            <div className="input-group submit-btn px-0">
                                <button disabled={!declaration} className={`${declaration ? '' : 'custom-disable-btn'} custom-register-btn`}>Register</button>
                            </div>
                        </div>
                    </form>

                    <div className="registration-description-box text-white">
                        <ul type='square'>
                            <li>Password length at least 8 digit</li>
                            <li>Must content a Uppercase letter</li>
                            <li>Must content a Lowercase letter</li>
                            <li>Must content a Special character</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Register
