import React, { useContext } from 'react'
import UtilityContext from '../context/utility/UtilityContext';

const ProfileModal = () => {

    const utilContext = useContext(UtilityContext);
    const { setLogin, sendMess } = utilContext
    
    const customStyleProfile = {
        alignItems: 'baseline',
        minHeight: 'fit-content',
        marginTop: '10rem',
        marginRight: '5rem'
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

    return (
        <>
            {/* Profile modal body */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={customStyleProfile}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">~ Welcome </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            ...
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
