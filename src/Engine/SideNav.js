import React, { useState, useContext } from 'react';
import "./style/main.scss"
import EngineContext from './context/EngineContext';

const SideNav = () => {

    const [isOpen, setIsOpen] = useState(true)
    const handleBarBtn = () => {
        if (isOpen) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    let eContext = useContext(EngineContext);
    const { handleChoice } = eContext

    return (
        <>
            <div className="sideNavContainer">
                <div className="sideNavCloser">
                    <div className="sideNav-bar-container">
                        <hr className='m-0' />
                        <div className="sideNav-bar-closer">
                            <div className="_btn mx-2" onClick={handleBarBtn}>
                                {
                                    isOpen ?
                                        <i className="fa-solid fa-bars-staggered text-white"></i>
                                        :
                                        <i className="fa-solid fa-xmark text-white"></i>
                                }
                            </div>
                        </div>
                        <hr className='m-0' />
                    </div>

                    <div className="sideNav-mainContent-container">
                        <div className="sideNav-mainContent-closer">
                            <ul>
                                <div className="listWrap" onClick={() => { handleChoice(1) }}>
                                    <li className={`listBtn ${isOpen ? 'listNoPadding' : ''}`}>
                                        <i className="fa-solid fa-house-chimney text-white"></i>
                                        <span className={`listText ${isOpen ? 'no-text' : ''}`}>
                                            Overview
                                        </span>
                                    </li>
                                </div>

                                <div className="listWrap" onClick={() => { handleChoice(2) }}>
                                    <li className={`listBtn ${isOpen ? 'listNoPadding' : ''}`}>
                                        <i className="fa-solid fa-file-signature text-white"></i>
                                        <span className={`listText ${isOpen ? 'no-text' : ''}`} >
                                            Draft
                                        </span>
                                    </li>
                                </div>

                                <div className="listWrap" onClick={() => { handleChoice(3) }}>
                                    <li className={`listBtn ${isOpen ? 'listNoPadding' : ''}`}>
                                        <i className="fa-solid fa-folder-plus text-white"></i>
                                        <span className={`listText ${isOpen ? 'no-text' : ''}`} >
                                            New Quize
                                        </span>
                                    </li>
                                </div>

                                <div className="listWrap" onClick={() => { handleChoice(4) }}>
                                    <li className={`listBtn ${isOpen ? 'listNoPadding' : ''}`}>
                                        <i className="fa-solid fa-diagram-predecessor text-white"></i>
                                        <span className={`listText ${isOpen ? 'no-text' : ''}`} >
                                            Conducted Quize
                                        </span>
                                    </li>
                                </div>

                                <div className="listWrap" onClick={() => { handleChoice(5) }}>
                                    <li className={`listBtn ${isOpen ? 'listNoPadding' : ''}`}>
                                        <i className="fa-solid fa-square-poll-vertical text-white"></i>
                                        <span className={`listText ${isOpen ? 'no-text' : ''}`} >
                                            Recorded Result
                                        </span>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>

                    <div className="listWrapOuter" onClick={() => { handleChoice(6) }}>
                        <li className={`listBtn ${isOpen ? 'listNoPadding' : ''}`}>
                            <i className="fa-solid fa-comments text-white"></i>
                            <span className={`listText ${isOpen ? 'no-text' : ''}`}>
                                FAQ
                            </span>
                        </li>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideNav
