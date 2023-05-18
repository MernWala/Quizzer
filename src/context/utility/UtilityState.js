import React, { useState } from 'react';
import UtilitContext from './UtilityContext'

const UtilityState = (props) => {

    const [accessType, setAccessType] = useState(true);

    const setAccess = (e) => {
        console.log(e);
        setAccessType(e)
    }

    const [isLogin, setIsLogin] = useState(false);
    const setLogin = (e) => {
        setIsLogin(e);
    }

    return (
        <UtilitContext.Provider value={{ accessType, setAccess, isLogin, setLogin }}>
            {props.children}
        </UtilitContext.Provider>
    )
}

export default UtilityState;