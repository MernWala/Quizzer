import React, { useState, useContext, useEffect } from 'react'
import '../styles/customCard.scss'
import reportSvg from '../storyset/report.gif'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom'
import UtilityContext from '../context/utility/UtilityContext'
import DataContext from '../context/userData/DataContext'

const Reportbug = () => {

    const navigate = useNavigate();
    const utilContext = useContext(UtilityContext);
    const { sendMess } = utilContext;

    const dataContext = useContext(DataContext);
    const { isLogin } = dataContext;

    const [data, setData] = useState({
        fName: '',
        lName: '',
        email: '',
        accountType: '',
        report: '',
    });

    useEffect(() => {
        document.title = "Quizer - Feedback"
    }, [])


    const setAuxilaryData = (e) => {
        let userData = localStorage.getItem('userProfileData');
        let token = localStorage.getItem('quizer-auth-token')
        if (token && !(JSON.parse(userData).error)) {
            userData = JSON.parse(userData);
            setData({
                fName: userData.fName,
                lName: userData.lName,
                email: userData.email,
                accountType: userData.accountType,
                report: e.target.value
            })
        }
    }

    const handleOnChange = (e) => {
        setAuxilaryData(e);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            sendMess('warning', "It's seems like you have not login yet");
            return;
        }

        await fetch(`http://localhost:5001/api/report-bug/default`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fName: data.fName,
                lName: data.lName,
                email: data.email,
                accountType: data.accountType,
                report: data.report,
            })
        }).then(async (e) => {
            const data = await e.json()
            if (e.status === 201) {
                sendMess('success', 'Report sucessfully')

                setTimeout(() => {
                    sendMess('info', 'We redirecting you to home page')
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                }, 4000);
            } else {
                sendMess('danger', data.error[0].msg)
            }
        })
    }

    return (
        <>
            <ProfileModal />
            <div className='container special-container height-80vh'>
                <div className='row d-flex flex-wrap justify-content-evenly' style={{ width: '100%' }} >
                    <div className="col-5 center-center flex-column">
                        <img src={reportSvg} alt="" height="75%" />
                        <span className='report-img-desc mt-5'>Small Correction give a better Improvement</span>
                    </div>

                    <div className="col-6 d-flex mx-5 d-flex align-items-center">
                        <div className="custom-card p-4 flex-column">
                            <div className="custom-card-header my-5">
                                <span className='text-white'>Hey! is there any</span>
                                <span className='text-white'>Problem</span>
                            </div>

                            <div className="report-desc my-3">
                                <span className='report-des-text'>We really want to help you with</span>
                                <span className='report-des-text'>Improved features of Us.</span>
                            </div>

                            <div className='report-form'>
                                <form className='text-white' onSubmit={handleSubmit}>
                                    <textarea name="report" id="reportTextBox" cols="30" rows="7" placeholder='Please Describe problem shortly' onChange={handleOnChange} spellCheck="true" />
                                    <button className='btn btn-custom m-2' type='submit'>Report</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reportbug
