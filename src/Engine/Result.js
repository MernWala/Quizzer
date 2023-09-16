import React, { useEffect, useState, useContext } from 'react'
import RecordDesine from './RecordDesine'
import DataContext from '../context/userData/DataContext'
import UtilityContext from '../context/utility/UtilityContext'

const Result = () => {

  const { sendMess } = useContext(UtilityContext)

  const handleResponseOff = async (quizeCode) => {
    let flag = window.confirm("Are you sure want to stop test. You can again start test by re-publish question set.")

    if (flag) {
      await fetch(`http://localhost:5001/genrate-question/off-response-qSet/${quizeCode}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('quizer-auth-token')
        }
      }).then(async (res) => {
        let data = await res.json()
        sendMess('info', data)
      })
    }
  }

  const { userData } = useContext(DataContext)

  const [currData, setCurrData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await fetch('http://localhost:5001/record/get-result/result', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('quizer-auth-token')
        }
      }).then(async (data) => {
        setIsLoading(false)
        let result = await data.json()
        setCurrData(result)
      })
    }

    fetchData()
  }, [userData])

  return (
    <>
      <div className="container my-3 fade-in">
        <div className="col col-8 header-2">
          <p>
            <span className="theamText">T</span>hese are <span className="theamText">R</span>ecorded result <span className="theamText">A</span>ccording to <span className="theamText">"Q</span>uiz code<span className="theamText">"</span>
          </p>
        </div>
        <hr className='theamText mb-1' />
        {isLoading ?
          <>
            <div className="container text-center my-5 py-5">
              <div class="spinner-border text-theam fs-4" role="status" style={{height: '4rem', width: '4rem'}} >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
          :
          currData && currData.map((ele) => {
            return <RecordDesine qCode={ele.main.qCode} tMark={ele.main.totalMarks} responseCollected={ele.main.responseCollected} responseOfFun={handleResponseOff} status={true} data={ele.table} key={ele.main.qCode} />
          })
        }
      </div>
    </>
  )
}

export default Result
