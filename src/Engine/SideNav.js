import React, { useContext, useState } from 'react'
import EngineContext from './context/EngineContext';
import "./style/sideNav.scss"

const SideNav2 = () => {

    const [isClose, setisClose] = useState(true)
    const handleBarBtn = () => {
        if (isClose) {
            setisClose(false);
        } else {
            setisClose(true);
        }
    }

    let eContext = useContext(EngineContext);
    const { handleChoice } = eContext

    return (
        <>
            <div className={`sideNavContainer`}>
                <div className="sideNavCloser">
                    <div className='d-flex flex-column height-100'>
                        <div className='mb-3'>
                            <hr className='m-0' />
                            <div className={`p-4 cursor-pointer`} onClick={handleBarBtn}>
                                {
                                    isClose ?
                                        <i className="fa-2x fa-solid fa-xmark text-white"></i>
                                        :
                                        <i className="fa-2x fa-solid fa-bars-staggered text-white"></i>
                                }
                            </div>
                            <hr className='m-0 theamText' />
                        </div>

                        <div className='d-flex text-white flex-column align-items-center justify-content-between height-100'>
                            <div>
                                <ul className='p-0 py-4'>

                                    <li className={`list-unstyled sideNav-list-item p-4`} onClick={() => handleChoice(1)}>
                                        <i className="fa-2x fa-solid fa-house-chimney"></i>
                                        <span className={`fs-4 ${!isClose ? 'sideNav-list-item-close' : 'sideNav-list-item-open ms-2'}`}>
                                            Overview
                                        </span>
                                    </li>

                                    <li className={`list-unstyled sideNav-list-item p-4`} onClick={() => handleChoice(2)}>
                                        <i className="fa-2x fa-solid fa-file-signature"></i>
                                        <span className={`fs-4 ${!isClose ? 'sideNav-list-item-close' : 'sideNav-list-item-open ms-2'}`}>
                                            Question Set
                                        </span>
                                    </li>

                                    <li className={`list-unstyled sideNav-list-item p-4`} onClick={() => handleChoice(3)}>
                                        <i className="fa-2x fa-solid fa-folder-plus"></i>
                                        <span className={`fs-4 ${!isClose ? 'sideNav-list-item-close' : 'sideNav-list-item-open ms-2'}`}>
                                            New Quize
                                        </span>
                                    </li>

                                    <li className={`list-unstyled sideNav-list-item p-4`} onClick={() => handleChoice(5)}>
                                        <i className="fa-2x fa-solid fa-square-poll-vertical"></i>
                                        <span className={`fs-4 ${!isClose ? 'sideNav-list-item-close' : 'sideNav-list-item-open ms-2'}`}>
                                            Recorded Result
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className='width-100'>
                                <ul className='p-0 mb-0'>
                                    <li className={`list-unstyled sideNav-list-item p-4 mb-0`} onClick={() => handleChoice(6)}>
                                        <i className="fa-2x fa-solid fa-comments"></i>
                                        <span className={`fs-4 ${!isClose ? 'sideNav-list-item-close' : 'sideNav-list-item-open ms-2'}`}>
                                            FAQ
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideNav2
