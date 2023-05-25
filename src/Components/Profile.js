import React, { useContext, useEffect, useState } from 'react'
import '../styles/profile.scss';
import DataContext from '../context/userData/DataContext';

const Profile = () => {
    const datacontext = useContext(DataContext)
    const { userData, defaultImg } = datacontext;

    const [pic, setPic] = useState()

    useEffect(() => {    
      return () => {
        if(userData && userData.picture){
            setPic(userData.picture);
        }else{
            setPic(defaultImg);
        }
      }
    }, [])
    

    return (
        <>
            <div className="__profileMain" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div className="profileCloser">
                    <img src={pic} alt="" />
                </div>
            </div>
        </>
    )
}

export default Profile
