import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import QuestionDesine from '../Engine/QuestionDesine';
import "../styles/fonts.scss"
import DataContext from '../context/userData/DataContext';
import StudentContext from '../Engine/context/StudentContext';
import UtilityContext from '../context/utility/UtilityContext';

const Test = () => {

    const dContext = useContext(DataContext);
    const { fetchTestApi, qSetData } = dContext

    useEffect(() => {
        document.title = `Quizer || Code - ${param.qCode}`
        fetchTestApi(param.qCode);
    }, [])

    const param = useParams();

    const [digiSign, setDigiSign] = useState("");
    const handleonChange = (e) => {
        setDigiSign({ ...digiSign, [e.target.name]: e.target.value });
    }

    let stuContext = useContext(StudentContext);
    let { handleSubmitRecord } = stuContext;

    let utilCon = useContext(UtilityContext);
    let { sendMess } = utilCon
    let navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();

        // qSetId, qCode, token
        let qSetId = qSetData && qSetData.quizeSet._id;
        let qCode = param.qCode;
        let token = await localStorage.getItem('quizer-auth-token');

        await handleSubmitRecord(qSetId, qCode, token).then(() => {
            setTimeout(() => {
                sendMess('info', 'We are redirecting to home page');
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            }, 2500);
        })
    }

    return (
        <div>
            <div className="container py-5">

                <div className="col col-12 d-flex flex-wrap align-items-center">
                    <div className="col col-8 header-2">
                        <p className='text-white d-flex align-items-center'>
                            <span className="theamText">Q</span>uiz&nbsp;<span className="theamText">N</span>ame -
                            <span className='ms-3'>
                                <span className="theamText">"</span>
                                {
                                    qSetData && qSetData.quizeSet.qName
                                }
                                <span className="theamText">"</span>
                            </span>
                        </p>
                    </div>

                    <div className="col col-4 text-white user-select-none">
                        <div className='ml-auto d-flex' style={{ width: 'fit-content' }}>
                            <span className="text-white fs-3">
                                Time Remaining -&nbsp;
                            </span>
                            <p className='text-white fs-3'>
                                {
                                    "Timer"
                                }
                            </p>
                        </div>
                    </div>

                    <hr className='theamText mb-4 mt-0' width="100%" />

                    <div className="row mx-0 col-12">
                        {
                            qSetData && <QuestionDesine data={qSetData.quizeSet.questions} qSet_Id={qSetData.quizeSet._id} edit={false} qCode={param.qCode} />
                        }
                    </div>

                    <div className="row mx-0 mb-5">
                        <p className='text-white fs-4 ff-nunito mb-2 fw-lighter'>I hearby declarare that i response all question with my full knowledge and not attempting any vulnarable activity. If i founded any permeable activity test organizer can take action on me and he can also punish me as he want.</p>
                        <p className="text-white fs-4 ff-nunito mb-4">Remember! After submit you won't be able to change your answer.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex align-items-center gap-4">
                                <div className="col-3">
                                    <input type="text" name="digitalSign" className='custom-input-2' placeholder='Your digital signature' style={{ boxShadow: 'none' }} onChange={handleonChange} />
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-primary fs-5" type='submit' style={{ padding: '.6rem 1.5rem' }} disabled={!digiSign.digitalSign} >Submit Response</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test
