import React, { useEffect, useContext, useState } from 'react';
import DataContext from './DataContext'
import UtilityContext from '../utility/UtilityContext';

const DataState = (props) => {

    const [backendHost, setBackendHost] = useState('http://localhost:5000/quizer')

    const utilContext = useContext(UtilityContext);
    const { setLogin, sendMess } = utilContext;

    const [userData, setUserData] = useState();

    const defaultImg = "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg";

    const loadData_inst = async (token) => {
        try {
            const response = await fetch(`${backendHost}/api/getDetails/inst`, {
                method: 'POST',
                headers: {
                    'auth-token': token,
                }
            })
            const data = await response.json();
            localStorage.setItem('userProfileData', JSON.stringify(data))
            setLogin(true)
            return data
        } catch (error) {
            console.warn(`Can't get authentication token!`);
        }
    }

    const loadData_stu = async (token) => {
        try {
            const response = await fetch(`${backendHost}/api/getDetails/stu`, {
                method: 'POST',
                headers: {
                    'auth-token': token,
                }
            })
            const data = await response.json();
            localStorage.setItem('userProfileData', JSON.stringify(data))
            setLogin(true)
            return data
        } catch (error) {
            console.warn(`Can't get authentication token!`);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('quizer-auth-token')
        return async () => {
            if (token) {
                await loadData_inst(token).then(async (e) => {
                    if (e !== null) {
                        localStorage.setItem('userProfileData', JSON.stringify(e))
                        let data = localStorage.getItem('userProfileData');
                        data = await JSON.parse(data);
                        setUserData(data)
                        setLogin(true)
                    } else {
                        await loadData_stu(token).then(async (e) => {
                            if (e !== null) {
                                localStorage.setItem('userProfileData', JSON.stringify(e))
                                let data = localStorage.getItem('userProfileData');
                                data = await JSON.parse(data);
                                setUserData(data)
                                setLogin(true)
                            } else {
                                console.log('No authentication key found');
                            }
                        })
                    }
                })
            } else {
                return;
            }
        }
    }, [])

    const [qSetData, setQSetData] = useState()
    const fetchTestApi = async (code) => {
        try {
            const token = await localStorage.getItem('quizer-auth-token')

            let response = await fetch(`${backendHost}/quiz/join/${code}`, {
                method: 'GET',
                headers: {
                    'auth-token': token,
                }
            })

            let data = await response.json();
            setQSetData(data);
            return data

        } catch (error) {
            console.log(error);
        }
    }

    const generateCode = (id) => {
        if (id) {
            let temp = String(Math.floor(10000 + Math.random() * 10000))
            let code = temp.slice(0, 4) + id.slice(0, 4);
            return code;
        } else {
            return -1;
        }
    }

    const sendOTPAPI = async (emailId) => {
        sendMess('info', 'We are sending an otp to your mail id')
        await fetch(`${backendHost}/verify/mail/genrate/otp`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: emailId
            })
        }).then(async (e) => {
            let data = await e.json();
            sendMess('success', data.msg);
        })
    }

    const [mainImg, setMainImg] = useState(null)
    const getProfile = async () => {
        await fetch(`${backendHost}/auth-register/account/get-profile/${userData.accountType}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('quizer-auth-token')
            }
        }).then(async (data) => {
            setMainImg(await data.blob())
        })
    }

    return (
        <DataContext.Provider value={{ loadData_inst, loadData_stu, userData, defaultImg, generateCode, fetchTestApi, qSetData, sendOTPAPI, setUserData, backendHost, getProfile, mainImg, setMainImg }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState;