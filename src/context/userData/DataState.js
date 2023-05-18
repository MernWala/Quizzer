import React, { useEffect } from 'react';
import DataContext from './DataContext'

const DataState = (props) => {

    const loadData_inst = async (token) => {
        try {
            const response = await fetch(`http://localhost:5001/api/getDetails/inst`, {
                method: 'POST',
                headers: {
                    'auth-token': token,
                }
            })
            const data = await response.json();
            // console.log(data);      // remove in beta release
            localStorage.setItem('userProfileData', JSON.stringify(data))
            return data
        } catch (error) {
            console.warn(`Can't get authentication token!`);
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
            console.log(data);      // remove in beta release
            localStorage.setItem('userProfileData', JSON.stringify(data))
            return data
        } catch (error) {
            console.warn(`Can't get authentication token!`);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('quizer-auth-token')
        const data = localStorage.getItem('userProfileData')
        return async () => {
            if (token && !(JSON.parse(data).error)) {
                await loadData_inst(token).then(async (e) => {
                    if (e !== null) {
                        localStorage.setItem('userProfileData', JSON.stringify(e))
                    } else {
                        await loadData_stu(token).then((e) => {
                            if (e !== null) {
                                localStorage.setItem('userProfileData', JSON.stringify(e))

                            } else {
                                console.log('No authentication key found');
                            }
                        })
                    }
                })
            } else {
                return;
            }
        }
    }, [])

    return (
        <DataContext.Provider value={{ loadData_inst, loadData_stu }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState;