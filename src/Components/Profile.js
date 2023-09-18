import React, { useContext, useEffect, useState } from 'react'
import '../styles/profile.scss';
import DataContext from '../context/userData/DataContext';

const Profile = () => {
    const datacontext = useContext(DataContext)
    const { userData, defaultImg, backendHost, getProfile, mainImg } = datacontext;

    useEffect(() => {
        if (userData.picture.length < 40) {
            getProfile();
        }
    }, [userData.picture, userData.accountType, backendHost])


    return (
        <>
            <div className="__profileMain" data-bs-toggle="modal" data-bs-target="#profileModal">
                <div className="profileCloser">
                    {
                        mainImg ?
                            <img src={URL.createObjectURL(mainImg)} alt="" />
                            :
                            <img src={userData.picture ? userData.picture : defaultImg} alt="" />
                    }
                </div>
            </div>
        </>
    )
}

export default Profile
