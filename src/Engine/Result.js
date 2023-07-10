import React from 'react'
import RecordDesine from './RecordDesine'

const Result = () => {

  const handleResponseOff = () => { 
    window.alert('working')
  }

  return (
    <>
      <div className="container my-3 fade-in">
        <div className="col col-8 header-2">
          <p>
            <span className="theamText">T</span>hese are <span className="theamText">R</span>ecorded result <span className="theamText">A</span>ccording to <span className="theamText">"Q</span>uiz code<span className="theamText">"</span>
          </p>
        </div>
        <hr className='theamText mb-1' />

        <RecordDesine qCode={123456} tMark={90} responseOfFun={handleResponseOff} status={true} data={{}} />  {/* send backend data -> props.data */}

      </div>
    </>
  )
}

export default Result
