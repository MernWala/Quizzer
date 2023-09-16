import React, { useContext, useState, useEffect } from 'react'
import DataContext from '../context/userData/DataContext'
import UtilityContent from '../context/utility/UtilityContext'

const EditProfile = () => {

    const { userData, setUserData } = useContext(DataContext)
    const { sendMess } = useContext(UtilityContent)

    const [currData, setCurrData] = useState({})
    useEffect(() => {
        if (userData) {
            setCurrData({
                fName: userData.fName,
                lName: userData.lName,
                picture: userData.picture,
                email: userData.email,
                accountType: userData.accountType,
                isChanged: false
            })
        }

    }, [userData])

    const handleOnChange = (e) => {
        setCurrData({ ...currData, [e.target.name]: e.target.value, isChanged: true })
    }

    const handleSubmitDetails = async (e) => {
        e.preventDefault()

        try {

            await fetch(`http://localhost:5001/auth-register/account/update-details`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('quizer-auth-token')
                },
                body: JSON.stringify({
                    "fName": currData.fName,
                    "lName": currData.lName,
                    "email": currData.email,
                    "accountType": currData.accountType
                })
            }).then(async (data) => {
                let result = await data.json()
                sendMess('info', result)
            }).then(() => {
                setUserData({...userData, fName: currData.fName, lName: currData.lName})
            })

        } catch (error) {

        }
    }

    return (
        <>
            <div className="container fade-in my-5 d-flex justify-content-center d-flex flex-column">
                <div className="col col-8 header-2 text-white mb-3">
                    <p>
                        <span className="theamText">Y</span>ou may <span className="theamText">U</span>pdate your <span className="theamText">P</span>rofile here
                        <i className="ms-2 fa-solid fa-face-smile"></i>
                    </p>
                </div>

                <div className="profile_modal question-form-main d-flex justify-content-start align-items-start p-0 mx-5">
                    <div className='p-5 border-end border-color-theam'>
                        <form>
                            <div className="px-0 image-container">
                                <img src={userData && userData.picture} alt="" className='p-0' />
                            </div>

                            {/* <div className="input-group-file">
                                <div className='d-flex justify-content-between'>
                                    <div className="col-3">
                                        <label htmlFor="profileSelect" className='btn btn-custom btn-shadow mt-3' style={{ filter: 'hue-rotate(161deg) brightness(2) contrast(5)' }}>
                                            <i className="fa-solid fa-cloud-arrow-up text-white"></i>
                                        </label>
                                    </div>
                                    <div className="col-8">
                                        <button type="submit" className='btn btn-custom btn-shadow mt-3 letter-spacing-1px fw-bold' style={{ filter: 'hue-rotate(161deg) brightness(2) contrast(5)' }}>
                                            Update Profile
                                        </button>
                                    </div>
                                </div>
                                <input type="file" name="" id="profileSelect" className='d-none' accept='image/png, image/jpg, image/jpeg' />
                            </div> */}
                        </form>
                    </div>

                    <div className='py-5 w-100'>
                        <div className='mb-4 float-start px-5'>
                            <span className='text-white'>
                                <p className="mb-0 text-white profileTagText">
                                    {userData && userData.accountType}
                                </p>
                            </span>
                        </div>

                        <form className='px-5 w-100 d-flex flex-column gap-3' onSubmit={handleSubmitDetails}>
                            <div className="input-group gap-4">
                                <input type="text" name="fName" className='my-0 py-3 fs-4 letter-spacing-1px' placeholder='Your first name here' style={{ width: '49%' }} defaultValue={userData && userData.fName} onChange={handleOnChange} />
                                <input type="text" name="lName" className='my-0 py-3 fs-4 letter-spacing-1px' placeholder='Your last name here' style={{ width: '49%' }} defaultValue={userData && userData.lName} onChange={handleOnChange} />
                            </div>
                            <div className="input-group">
                                <input type="email" name="email" className='my-0 col-12 py-3 fs-4 letter-spacing-1px' placeholder='Your email id here' defaultValue={userData && userData.email} disabled={true} />
                            </div>
                            <div className='gap-4 d-flex'>
                                <div className="col-3">
                                    <button type="button" className='btn btn-custom btn-shadow fw-bold letter-spacing-1px' data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">Change Password</button>
                                </div>
                                <div className={`col-3 ${!currData.isChanged && 'opacity-50'}`}>
                                    <button type="submit" className='btn btn-custom btn-shadow letter-spacing-1px py-2 fw-bold' style={{ filter: 'hue-rotate(161deg) brightness(2) contrast(5)' }} disabled={!currData.isChanged} >Update Details</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container">
                <p className="fs-3 text-white">
                    <span className='border-bottom'>Note</span> <small>You can only update your name, profile & password</small>
                </p>
            </div>
        </>
    )
}

export default EditProfile
