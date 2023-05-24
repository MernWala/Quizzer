import React from 'react'
import Jumbotron from './Jumbotron'
import "../styles/register.scss"

function Register() {
    return (
        <div className='d-flex align-items-center justify-content-center flex-column my-5'>
            <Jumbotron text="Registration" barMargin={10} />
            {/* 
                accountType
             */}

            <div className="registration-container">
                <form className='text-white'>
                    <div className="row">
                        <div className="input-group">
                            <label htmlFor="fName">First Name</label>
                            <input type="text" name="fName" id="fName" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-group">
                            <label htmlFor="lName">Last Name</label>
                            <input type="text" name="lName" id="lName" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group width-100">
                            <label htmlFor="email">Email Id</label>
                            <input type="email" name="email" id="email" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label htmlFor="pass1">Create Password</label>
                            <input type="password" name="pass1" autoComplete='on' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-group">
                            <label htmlFor="pass2">Re-Enter Password </label>
                            <input type="password" name="pass2" autoComplete='on' />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label htmlFor="">Account Type</label>

                            <div className="radio-group">
                                <div className="radio-wrap">
                                    <input type="radio" name="accountType" value="Instructor" />
                                    <label htmlFor="accountType">Instructor</label>
                                </div>
                                <div className="radio-wrap">
                                    <input type="radio" name="accountType" value="Student" />
                                    <label htmlFor="accountType">Student</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 my-5">
                        <input type="checkbox" name="declaration" id="declaration" className='mx-2' />
                        <label htmlFor="declaration" className='declaration-label'>I agree to share data with Quizzer</label>
                    </div>

                    <div className="row mx-3">
                        <div className="input-group submit-btn">
                            <button>Register</button>
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
    )
}

export default Register
