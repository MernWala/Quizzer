import React, { useEffect, useState, useContext } from 'react'
import '../styles/profile.scss';
import DataContext from '../context/userData/DataContext';

const Profile = () => {

    const datacontext = useContext(DataContext)
    const { defaultImg } = datacontext;

    const [imgSource, setImgSource] = useState();

    useEffect(() => {
        let data = localStorage.getItem('userProfileData');
        let token = localStorage.getItem('quizer-auth-token')
        return async () => {
            if(token && !(JSON.parse(data).error)){
                data = JSON.parse(data);
                if (data.picture) {
                    setImgSource(data.picture)
                } else {
                    setImgSource(defaultImg);
                }
            }else{
                return;
            }
        }
    }, [])

    return (
        <>
            <div className="__profileMain" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div className="profileCloser">
                    <img src={imgSource} alt="" />
                </div>
            </div>
        </>
    )
}

export default Profile
