import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../App';
import Navbar from '../components/navbar/Navbar'
import CourseCard from '../components/ShowCourses/CourseCard';
import { db } from '../Fire';

function MyCourses() {
    const user = useContext(Context);
    const [data, setData]= useState([]);
    useEffect(async()=>{
    if (user){
            await db.collection("Courses").where("userID","==",user.uid).get().then((response)=>{
                setData(
                    response.docs.map((e)=>
                    {return {  
                        id :e.id,
                        data : e.data()
                    }}
                    )
                    );
            })
    }
    },[user])
    return (
        <div>
        <Navbar/>
        <div style={{display:"flex", justifyContent:"center"}}>
        <h1>your courses</h1>
        </div>
        <div
        style={{
            display:"flex",
            flexDirection:"row",
            flexWrap:"wrap",
            
        }}
        >
        
        {data.map((course)=>{
            return <CourseCard thumbnail={course.data.thumbnail} 
            title={course.data.name} 
            creator={course.data.createdBy} 
            id={course.id} 
            key={course.id}
            edit={true}
            course={course.data}
            />

        })}
        </div>

        
        </div>
    )
}

export default MyCourses
