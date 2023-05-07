import React, { useState } from 'react';
import DataContext from './DataContext'

const ModeState = (props) => {

    const [theam, setTheam] = useState('dark');

    const toggleTheam = () => {
        if (theam === 'dark') {
            document.body.style.backgroundColor = '#fff';
            document.body.style.color = 'var(--bs-dark)';
            setTheam('light');
        } else {
            document.body.style.backgroundColor = 'var(--bs-dark)';
            document.body.style.color = '#fff';
            setTheam('dark');
        }
    }

    return (
        <DataContext.Provider value={{ theam, toggleTheam }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default ModeState;