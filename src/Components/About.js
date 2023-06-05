import React from 'react'
import Jumbotron from './Jumbotron'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <>
            <div className="container text-white">
                <div className="row mx-1 mt-5 about-us-body-text pt-5 mb-5">
                    <Jumbotron barMargin={0} text="About Us" />
                </div>
                <div className="row mx-1 mt-2 fs-4 about-us-body-text">
                    <p>
                        The web app Quizer is one of the quiz conducting app developed by Shivam Kashyap. This purpose of this app is to conduct or give quize in very easy manner. The UI of quizzer is design very precisely such that an instructor or a student can take test very easyly via few steps.
                    </p>
                    <p>
                        If you want to conduct test, the process is very easy which is given below :
                        <ul type="square" className='ms-4'>
                            <li>
                                First you have create a instructor account. For this step you need to <span className="process-steps">click login btn on navbar</span> after that you need to click on <span className="process-steps">register here</span>. Or you may directly go via clicking <Link to="/app/new-user">here</Link>.
                            </li>
                        </ul>
                    </p>
                    <p>
                        If you want to bear quiz you must have a student profile. You need to register your student profile <Link to="/app/new-user">here</Link>.
                        <ul type="square" className='ms-4'>
                            <li>
                                You need to enter unique <span className="process-steps">Quiz Code</span>. If you don't have contact your Instructor ASAP for quize code or test link.
                            </li>
                        </ul>
                    </p>
                    <p>
                        If you face any problem please contact us. You can navigate via <Link to="/reportbug">this link.</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default About
