import React from 'react'
import SideNav from './SideNav'
import ProfileModal from '../Components/ProfileModal'
import IEngineBody from "./IEngineBody";


const EngineHome = () => {
  return (
    <>
      <ProfileModal />
      <div className="d-flex">
        <SideNav />
        <IEngineBody />
      </div>
    </>
  )
}

export default EngineHome
