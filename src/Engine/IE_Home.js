import React, { useContext, useEffect, useState } from 'react'
import ProfileModal from '../Components/ProfileModal'
import IEngineBody from "./IEngineBody";
import PublishQuizeModal from './PublishQuizeModal';
import SideNav from './SideNav';
import DataContext from '../context/userData/DataContext';


const EngineHome = () => {

  const { userData } = useContext(DataContext)

  const [notAuthentic, setNotAuthentic] = useState(false)
  useEffect(() => {
    if (userData && userData.accountType === 'Instructor') {
      setNotAuthentic(true)
    }
  }, [userData])


  return (
    <>
      {notAuthentic ?
        <>
          <ProfileModal />
          <div className="d-flex">
            <SideNav />
            <IEngineBody />
          </div>
          <PublishQuizeModal />
        </>
        :
        <>
          <div className="container my-5 py-5 text-center">
            <span className="fs-1 fw-bold text-white">You are not allowed here</span>
          </div>
        </>
      }
    </>
  )
}

export default EngineHome
