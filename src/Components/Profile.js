import React, { useContext, useEffect } from 'react'
import DataContext from '../context/userData/DataContext';

const Profile = () => {

    const dataContext = useContext(DataContext);
    const { loadData_inst, loadData_stu } = dataContext;

    useEffect(() => {
        const token = localStorage.getItem('quizer-auth-token')
        return async () => {
            await loadData_inst(token).then(async (e) => {
                if(e !== null){
                    console.log(e);
                }else{
                    await loadData_stu(token).then((e) => {
                        if(e !== null){
                            console.log(e);
                        }else{
                            console.log('No authentication key found');
                        }
                    })
                }
            })
        }
    }, [])


    return (
        <>
            <div className="__profileMain">
                <div className="profileCloser">
                    <img src="" alt="" />
                </div>
            </div>
        </>
    )
}

export default Profile
