import React, { useState } from 'react'
import EngineContext from "./EngineContext";

const EngineState = (props) => {

    const [choice, setChoice] = useState(3)
    const handleChoice = (e) => {
        setChoice(e)
    }

    return (
        <EngineContext.Provider value={{ choice, handleChoice }}>
            {props.children}
        </EngineContext.Provider>
    )
}

export default EngineState
