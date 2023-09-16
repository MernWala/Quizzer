import React, { useContext } from 'react'
import '../styles/profile.scss';
import DataContext from '../context/userData/DataContext';

const Profile = () => {
    const datacontext = useContext(DataContext)
    const { userData } = datacontext;    

    return (
        <>
            <div className="__profileMain" data-bs-toggle="modal" data-bs-target="#profileModal">
                <div className="profileCloser">
                    <img src={userData && userData.picture} alt="" />
                </div>
            </div>
        </>
    )
}

export default Profile
