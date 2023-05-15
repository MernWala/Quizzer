import React, { useState } from 'react';
import DataContext from './DataContext'

const DataState = (props) => {

    const [userData, setUserData] = useState({
        fName: "",
        lName: "",
        email: "",
        verified: ""
    });

    const loadData_inst = async (token) => {
        try {
            const response = await fetch(`http://localhost:5001/api/getDetails/inst`, {
                method: 'POST',
                headers: {
                    'auth-token': token,
                }
            })
            const data = await response.json();
            return data
        } catch (error) {
            console.warn(`Can't get authentication token!`)
        }
    }

    const loadData_stu = async (token) => {
        try {
            const response = await fetch(`http://localhost:5001/api/getDetails/stu`, {
                method: 'POST',
                headers: {
                    'auth-token': token,
                }
            })
            const data = await response.json();
            return data
        } catch (error) {
            console.warn(`Can't get authentication token!`)
        }
    }

    const resetData = () => {
        setUserData({
            fName: "",
            lName: "",
            email: "",
            verified: ""
        })
    }

    return (
        <DataContext.Provider value={{ userData, loadData_inst, loadData_stu, resetData }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState;