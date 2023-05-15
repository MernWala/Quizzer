import React, { useState } from 'react';
import UtilitContext from './UtilityContext'

const UtilityState = (props) => {

    const [accessType, setAccessType] = useState(true);

    const setAccess = (e) => {
        console.log(e);
        setAccessType(e)
    }

    return (
        <UtilitContext.Provider value={{ accessType, setAccess }}>
            {props.children}
        </UtilitContext.Provider>
    )
}

export default UtilityState;