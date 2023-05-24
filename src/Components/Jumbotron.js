import React, { useState } from 'react'
import "../styles/jumbo.scss"

function Jumbotron(props) {

    const customStyleObject = {
        marginLeft: `${props.barMargin}rem`
    }

    return (
        <div className="header mb-4">
            <span className='header-faded-text'>{props.text}</span>
            <span className="header-text">{props.text}</span>
            <p style={customStyleObject}></p>
        </div>
    )
}

export default Jumbotron;
