import React, { useContext } from 'react'
import EngineContext from './context/EngineContext'
import SubComOverview from './SubComOverview';
import Draft from "./Draft"
import NewQuize from "./NewQuize";
import ConductedQuize from "./ConductedQuize";
import Faq from "./Faq";
import Result from "./Result";

const IEngineBody = () => {

    const eContext = useContext(EngineContext);
    const { choice } = eContext;

    const callingFunction = () => {
        switch (choice) {
            case 1:
                return <SubComOverview />

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
        <div className='container text-white'>
            <div className="d-flex align-items-center justify-content-center">
                <div className="text-white">
                    <div className="text-white">
                        {
                            callingFunction()
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default IEngineBody
