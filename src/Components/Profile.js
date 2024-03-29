import React, { useContext, useEffect, useState } from 'react'
import '../styles/profile.scss';
import DataContext from '../context/userData/DataContext';

const Profile = () => {
    const datacontext = useContext(DataContext)
    const { userData, defaultImg, getProfile, mainImg } = datacontext;

    useEffect(() => {
        if (userData && userData.picture.length < 30) {
            getProfile();
        }
    }, [])

    return (
        <>
            <div className="__profileMain" data-bs-toggle="modal" data-bs-target="#profileModal">
                <div className="profileCloser">
                    {mainImg && <img src={URL.createObjectURL(mainImg)} alt="" />}
                    {!mainImg && <img src={defaultImg} alt="" />}
                </div>
            </div>
        </>
    )
}

export default Profile
