import React, { useContext, useState } from 'react';
import './style/record.scss'
import UtilityContext from '../context/utility/UtilityContext'

const RecordDesine = (props) => {

    const utilCon = useContext(UtilityContext);
    const { sendMess } = utilCon;

    const handleCopyCode = (qCode) => {
        navigator.clipboard.writeText(qCode);
        sendMess('info', `Quize code (${qCode}) copied to clipboard`)
    }

    const [apper, setApper] = useState(false)
    const handleApperTable = () => {
        if (apper === true) {
            setApper(false);
        } else {
            setApper(true);
        }
    }

    return (
        <>
            <div className="container my-4 p-4 rounded record-card-main theam-box-modal">
                <div className="record-card-closer d-flex gap-5 flex-column">

                    <div className="row mx-2 flex-wrap">
                        <div className="quize-code-details_code col-10 px-0 d-flex flex-column gap-3">
                            <span className='fs-4'>
                                Quiz Code
                                <i className="fa-solid fa-arrow-right mx-3"></i>
                                <strong>
                                    {props.qCode}
                                </strong>
                                <i className="fa-solid fa-clone mx-3 cursor-pointer p-2 rounded ico-btn" onClick={() => handleCopyCode(props.qCode)}></i>
                            </span>

                            <span className='fs-4'>
                                {/* TODO from props.data -> calculate mark */}
                                Total Marks
                                <i className="fa-solid fa-arrow-right mx-3"></i>
                                <strong>{props.tMark}</strong>
                            </span>

                            <span className='fs-4'>
                                Response Collected
                                <i className="fa-solid fa-arrow-right mx-3"></i>
                                {2}
                            </span>
                        </div>
                        <div className="quize-code-details_mark col-2 px-0 d-flex gap-3 flex-column">
                            <button type="button" className='btn btn-danger py-0 fs-4' onClick={props.responseOfFun} disabled={!props.status}>
                                Turn off Response
                            </button>

                            <span className='my-1 status-btn'>
                                {
                                    props.status === true ?
                                        <span>Accepting Response</span>
                                        :
                                        <span>Response Closed</span>
                                }
                            </span>

                            <div className="d-flex align-items-center gap-3 border-theam-1px rounded cursor-pointer" onClick={handleApperTable}>
                                {
                                    apper ?
                                        <>
                                            <i className="fa-solid fa-minus ico-btn-squar"></i>
                                            <span className='fs-4'>Hide record</span>
                                        </>
                                        :
                                        <>
                                            <i className="fa-solid fa-plus ico-btn-squar"></i>
                                            <span className='fs-4'>Show record</span>
                                        </>
                                }
                            </div>
                        </div>
                    </div>

                    {apper &&
                        <div className="row mx-auto col-10 record-main-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>SNo.</th>
                                        <th>Attempted By</th>
                                        <th>Mail Id</th>
                                        <th>Scored Marks</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {/* props.data -> array.map((ele) => {}) */}
                                    <tr>
                                        <td>{1}</td>
                                        <td>
                                            {/* TODO props.data -> array of record -> userName */}
                                            Sample Name
                                        </td>
                                        <td>
                                            {/* TODO props.data -> array of record -> userEmail */}
                                            <a href={`mailto:${`sample@quizer.com`}`}>sample@quizer.com</a>
                                        </td>
                                        <td>
                                            {/* TODO props.data -> array of record -> countMark() -> userScoredMark */}
                                            100
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default RecordDesine
