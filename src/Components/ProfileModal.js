import React, { useContext } from 'react'
import UtilityContext from '../context/utility/UtilityContext';
import DataContext from '../context/userData/DataContext';

const ProfileModal = () => {

    const utilContext = useContext(UtilityContext);
    const { setLogin, sendMess, accessType } = utilContext

    const customStyleProfile = {
        alignItems: 'baseline',
        minHeight: 'fit-content',
        marginTop: '10rem',
        marginRight: '5rem',
        maxWidth: '45rem',
    }

    const handleLogout = () => {
        localStorage.removeItem('quizer-auth-token');
        localStorage.removeItem('userProfileData');
        setLogin(false);
        setTimeout(() => {
            sendMess('warning', 'Loging out !')
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }, 1000);
    }

    const dataContext = useContext(DataContext);
    const { userData } = dataContext

    return (
        <>
            {/* Profile modal body */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={customStyleProfile}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel" style={{cursor: 'default'}}>~ Welcome <em>{!userData ? '' : (userData.fName + " " + userData.lName)}</em></h1>
                            <p className="mb-0 text-white profileTagText">{userData && userData.accessType === 'Student' ? 'Student' : 'Instructor'}</p>
                        </div>

                        <div className="modal-body">
                            <div className="profileModal-closer">
                                <div className="studentUpdate-info">
                                    {/* blank space should be there of any student update */}
                                </div>
                                <div className="profile-naviation-btn">
                                    <div className="btnGroup">
                                        <div className="actual-numbers">
                                            {/* for now define no as static */}
                                            4
                                        </div>
                                        <div className="btn-name">
                                            Attempted Quize
                                        </div>
                                    </div>

                                    <div className="btnGroup">
                                        <div className="actual-numbers">
                                            {/* for now define no as static */}
                                            2
                                        </div>
                                        <div className="btn-name">
                                            Accomplishment
                                        </div>
                                    </div>

                                    <div className="btnGroup">
                                        <div className="actual-numbers">
                                            {/* for now define no as static */}
                                            20
                                        </div>
                                        <div className="btn-name">
                                            Saved Question
                                        </div>
                                    </div>

                                    <div className="btnGroup">
                                        <div className="actual-numbers">
                                            {/* for now define no as static */}
                                            10
                                        </div>
                                        <div className="btn-name">
                                            Personal Vault
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer justify-content-center">
                            <button data-bs-dismiss="modal" aria-label="Close" onClick={handleLogout} className='btn btn-login-custom'>Logout</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileModal
