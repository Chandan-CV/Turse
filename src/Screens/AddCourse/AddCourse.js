import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Context } from '../../App'

function AddCourse() {
    const history = useHistory();
    const user = useContext(Context)
    useEffect(()=>{
        if(!user){
         history.push("/")
        }
    },[user])
    return (
        <div>
            <h1> glad to see you contributing</h1>
        </div>
    )
}

export default AddCourse
