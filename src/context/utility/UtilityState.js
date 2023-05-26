import React, { useState } from 'react';
import UtilitContext from './UtilityContext'

const UtilityState = (props) => {

    const [accessType, setAccessType] = useState(true);

    const setAccess = (e) => {
        setAccessType(e)
    }

    const [isLogin, setIsLogin] = useState(false);
    const setLogin = (e) => {
        setIsLogin(e);
    }

    const [alert, setAlert] = useState({ head: '', body: '' });
    const sendMess = (h, m) => {
        setAlert({ head: h, body: m });
        setTimeout(() => {
            setAlert({ head: '', body: '' });
        }, 7000);
    }

    const genrateCode = () => {
        let date = new Date(Date.now());
        return date.getFullYear() + date.getUTCMilliseconds() + '2023';
    }

    return (
        <UtilitContext.Provider value={{ accessType, setAccess, isLogin, setLogin, alert, sendMess, genrateCode }}>
            {props.children}
        </UtilitContext.Provider>
    )
}

export default UtilityState;