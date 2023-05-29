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

    return (
        <UtilitContext.Provider value={{ accessType, setAccess, isLogin, setLogin, alert, sendMess }}>
            {props.children}
        </UtilitContext.Provider>
    )
}

export default UtilityState;