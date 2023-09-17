import React, { useContext, useState, useEffect } from 'react'
import UtilityContext from '../context/utility/UtilityContext';
import DataContext from '../context/userData/DataContext';
import { Link, useNavigate } from 'react-router-dom';

const CustomBtn = (props) => {
    return (
        <>
            <Link to={props.link} className='text-decoration-none btnGroup'>
                <button type="button" data-bs-toggle="modal" data-bs-target="#profileModal" className='px-0 bg-transparent border-0 py-3 text-theam fw-bold'>
                    <div className="actual-numbers">
                        {props.number}
                    </div>
                </button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#profileModal" className='px-0 bg-transparent border-0 text-theam fw-bold'>
                    <div className="btn-name">
                        {props.text}
                    </div>
                </button>
            </Link>
        </>
    )
}

const ProfileModal = () => {

    const utilContext = useContext(UtilityContext);
    const { setLogin, sendMess } = utilContext

    const dataContext = useContext(DataContext);
    const { userData } = dataContext

    const customStyleProfile = {
        alignItems: 'baseline',
        minHeight: 'fit-content',
        marginTop: '10rem',
        marginRight: '5rem',
        maxWidth: '45rem',
    }

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('quizer-auth-token');
        localStorage.removeItem('userProfileData');
        localStorage.removeItem('quizer-quize-code');
        localStorage.removeItem('quizer-modify-question-id');
        setLogin(false);
        setTimeout(() => {
            sendMess('warning', 'Loging out !')
            setTimeout(() => {
                navigate('/')
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }, 1000);
        }, 1000);
    }

    return (
        <>
            {/* Profile modal body */}
            <div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={customStyleProfile}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="profileModalLabel" style={{ cursor: 'default' }}>~ Welcome <em>{userData && (userData.fName + " " + userData.lName)}</em></h1>
                            <p className="mb-0 text-white profileTagText">{userData && userData.accountType}</p>
                        </div>

                        <div className="modal-body">
                            <div className="profileModal-closer">
                                <div className="profile-naviation-btn">
                                    {userData && userData.accountType === "Instructor" ?
                                        <>
                                            <CustomBtn number={1} text={"Home"} link={"/"} />
                                            <CustomBtn number={2} text={"Edit Profile"} link={"/profile/edit"} />
                                            <CustomBtn number={3} text={"Dashboard"} link={"/app/engin/instructor"} />
                                        </>
                                        :
                                        <>
                                            <CustomBtn number={1} text={"Home"} link={"/"} />
                                            <CustomBtn number={2} text={"Edit Profile"} link={"/profile/edit"} />
                                            {/* <CustomBtn number={3} text={"My Test Record"} link={""} />
                                            <CustomBtn number={4} text={"Help"} link={""} /> */}
                                        </>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer justify-content-center">
                            <button data-bs-dismiss="modal" aria-label="Close" onClick={handleLogout} className='btn btn-login-custom'>Logout</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export const ForgotPasswordModal = () => {

    const { accessType, isLogin } = useContext(UtilityContext)
    const { sendOTPAPI, userData, backendHost } = useContext(DataContext)

    const [data, setData] = useState({ email: "", match: false, password: "", password2: "" });
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (data.password === data.password2 && data.password.length !== 0 && data.password2.length !== 0) {
            setData({ ...data, match: true })
        } else {
            setData({ ...data, match: false })
        }

        if (isLogin === true) {
            userData && setData({ ...data, email: userData.email })
        }

    }, [data.password, data.password2, isLogin, userData])

    const handleResetPassword = async (e, form) => {
        e.preventDefault()

        await fetch(`${backendHost}/auth-register/account/forget-password/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                "email": data.email,
                "otp": data.otp,
                "account": accessType ? 'instructor' : 'student',
                "password": data.password
            })
        }).then(async (result) => {
            let data = await result.json()
            window.alert(data)
            window.location.reload()
        })
    }


    return (
        <>
            <div className="modal fade" id="forgotPasswordModal" tabIndex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true" style={{ fontSize: '160%', backdropFilter: 'blur(5px)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-theam">
                        <div className="modal-header">
                            <h1 className="modal-title fs-3 ms-1 text-white letter-spacing-1px" id="forgotPasswordModalLabel">Recover Account</h1>
                            <button type="button" className="btn-close me-1 opacity-100" data-bs-dismiss="modal" aria-label="Close" style={{ filter: 'invert(1)' }}></button>
                        </div>
                        <div className="modal-body px-5">
                            <form className='loginForm' onSubmit={(e) => handleResetPassword(e)} id='passwordResetForm'>
                                {/* get email id & send otp */}
                                <div className="d-flex align-items-end gap-4">
                                    <div className='input-group'>
                                        <label htmlFor="email" className={`z-1 input-group-label ${data.email && 'no-text'}`} >Your Email ID*</label>
                                        {data.email ? <div className="no-text-reverse">&nbsp;</div> : ''}
                                        <input type="email" id="email" name='email' onChange={handleOnChange} value={data.email} />
                                    </div>
                                    <div className='mb-2'>
                                        <button type="button" className='btn btn-login-custom' onClick={() => sendOTPAPI(data.email)}>Send OTP</button>
                                    </div>
                                </div>

                                {/* enter otp & verify it */}
                                <div className="d-flex align-items-end gap-4">
                                    <div className='input-group'>
                                        <label htmlFor="OTP" className={`z-1 input-group-label ${data.otp && 'no-text'} ${data.email.length === 0 && 'opacity-50'}`} >OTP*</label>
                                        {data.otp ? <div className="no-text-reverse">&nbsp;</div> : ''}
                                        <input type="number" id="OTP" name='otp' onChange={handleOnChange} className={`${data.email.length === 0 && 'opacity-50'} no-spinner`} disabled={data.email.length === 0} />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className={`z-1 input-group-label ${!data.otp && 'opacity-50'} ${data.password && 'no-text'}`} htmlFor="password" id="email_label_2">Enter Password*</label>
                                    {data.password ? <div className="no-text-reverse">&nbsp;</div> : ''}
                                    <input type="password" name="password" id="password" onChange={handleOnChange} disabled={!data.otp} className={`${!data.otp && 'opacity-50'}`} />
                                </div>

                                <div className="input-group">
                                    <label className={`z-1 input-group-label ${!data.otp && 'opacity-50'} ${data.password2 && 'no-text'}`} htmlFor="password2" id="email_label_2">Re-enter Password*</label>
                                    {data.password2 ? <div className="no-text-reverse">&nbsp;</div> : ''}
                                    <input type="password" name="password2" id="password2" onChange={handleOnChange} disabled={!data.otp} className={`${!data.otp && 'opacity-50'}`} />
                                </div>

                                <div className="option-btn-group mt-4 py-2 mb-3">
                                    <button type="submit" className='btn btn-custom' disabled={!data.match}>Recover Account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileModal
