import React from 'react'
import ProfileModal from '../Components/ProfileModal'
import IEngineBody from "./IEngineBody";
import PublishQuizeModal from './PublishQuizeModal';
import SideNav from './SideNav';


const EngineHome = () => {
  
  return (
    <>
      <ProfileModal />
      <div className="d-flex">
        <SideNav />
        <IEngineBody />
      </div>
      <PublishQuizeModal />
    </>
  )
}

export default EngineHome
