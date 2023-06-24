import React, { useContext } from 'react'
import EngineContext from './context/EngineContext'
import Overview from './Overview';
import Draft from "./Draft"
import NewQuize from "./NewQuize";
import ConductedQuize from "./ConductedQuize";
import Faq from "./Faq";
import Result from "./Result";
import "./style/main.scss"

const IEngineBody = () => {

    const eContext = useContext(EngineContext);
    const { choice } = eContext;

    const callingFunction = () => {
        switch (choice) {
            case 1:
                return <Overview />

            case 2:
                return <Draft />

            case 3:
                return <NewQuize />

            case 4:
                return <ConductedQuize />

            case 5:
                return <Result />

            case 6:
                return <Faq />

            default:
                break;
        }
    }

    return (
        <>
            <div id="backgroundAnimation">
                {/* introduce at end of project */}
            </div>

            <div className='container text-white bg-custom'>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100%', width: '100%' }}>
                    <div className="text-white d-flex justify-content-center height-100 width-100">
                        {
                            callingFunction()
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default IEngineBody
