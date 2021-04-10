import React, { useEffect, useState } from 'react'
import { db } from '../../Fire';
import CourseCard from './CourseCard'


function ShowCourses() {
    const [data, setData] = useState([]);
    useEffect(async()=>{
        await db.collection("Courses").get().then((snap)=>{
            setData(
                snap.docs.map((e)=>
               {return {  
                    id :e.id,
                    data : e.data()
                }}
                )
                );
        })
    },[])
    return (
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
          key={course.id}/>
        })}
        </div>
    )
}

export default ShowCourses
