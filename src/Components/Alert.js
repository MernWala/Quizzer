import React from 'react'
import "../styles/alert.scss"

const Alert = (props) => {

    const capitilize = (e) => {
        return e.charAt(0).toUpperCase() + e.substr(1) + ' :';
    }

    return (
        <>
            {props.head && <div className={`alerMainContainer bg-${props.head}`}>
                <div className="alert-closer">
                    <div className="alert-header mx-1">
                        <span>{capitilize(props.head)}</span>
                    </div>
                    <div className="alert-body mx-1">
                        <span>{props.body}</span>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Alert
