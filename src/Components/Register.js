import React, { useState, useContext } from 'react';
import Jumbotron from './Jumbotron';
import "../styles/register.scss";
import UtilityContext from '../context/utility/UtilityContext';
import { useNavigate } from 'react-router-dom'

function Register() {

    const utilContext = useContext(UtilityContext);
    const { sendMess, setAccess } = utilContext;

    const [userData, setUserData] = useState({
        fName: '',
        lName: '',
        email: '',
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
                    await fetch(`http://localhost:5001/auth-register/inst`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            fName: userData.fName,
                            lName: userData.lName,
                            email: userData.email,
                            password: userData.pass1,
                            accountType: userData.accountType,
                        })
                    }).then((e) => {
                        if (e.status === 201) {
                            sendMess('success', 'Your Acccount successfully created. You may login here.');
                            setAccess(true);
                            navigate("/app/acess-account/auth");
                        } else {
                            sendMess('danger', 'This email is already registered');
                        }
                    })
                } else {
                    await fetch(`http://localhost:5001/auth-register/stu`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            fName: userData.fName,
                            lName: userData.lName,
                            email: userData.email,
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
                                <label htmlFor="fName">First Name</label>
                                <input type="text" name="fName" id="fName" onChange={onChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group">
                                <label htmlFor="lName">Last Name</label>
                                <input type="text" name="lName" id="lName" onChange={onChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-group width-100">
                                <label htmlFor="email">Email Id</label>
                                <input type="email" name="email" id="email" onChange={onChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-group">
                                <label htmlFor="pass1">Create Password</label>
                                <input type="password" name="pass1" autoComplete='on' onChange={onChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group">
                                <label htmlFor="pass2">Re-Enter Password </label>
                                <input type="password" name="pass2" autoComplete='on' onChange={onChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-group">
                                <label htmlFor="">Account Type</label>
                                <div className="radio-group">
                                    <div className="radio-wrap">
                                        <input type="radio" name="accountType" value="Instructor" onChange={onChange} />
                                        <label htmlFor="accountType">Instructor</label>
                                    </div>
                                    <div className="radio-wrap">
                                        <input type="radio" name="accountType" value="Student" onChange={onChange} />
                                        <label htmlFor="accountType">Student</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 my-5">
                            <input type="checkbox" name="declaration" id="declaration" className='mx-2' onClick={handleDclaration} />
                            <label htmlFor="declaration" className='declaration-label'>I agree to share data with Quizzer</label>
                        </div>

                        <div className="row mx-3">
                            <div className="input-group submit-btn">
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
