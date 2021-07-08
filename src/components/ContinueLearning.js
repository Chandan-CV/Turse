import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../App'
import { db } from '../Fire';
import CourseCard from './ShowCourses/CourseCard';

function ContinueLearning() {
 const user = useContext(Context)
 const[userData, SetUserData]= useState(null);
 const[course,setCourse]= useState(null);

 useEffect(async()=>{
    if(user){
await db.collection("Users").doc(user.uid).get().then((response)=>{
    SetUserData(response.data())
    return response.data()
}).then( async(data)=>{
    if(data.continue){
        await db.collection("Courses").doc(data.continue.id).get().then((snap)=>{
            setCourse({
                id:snap.id,
                data:snap.data(),
            }
            )
        })
    }
    })
    }
 },[user])
 


    if(course?.data){

        return (
            <div>
            
            <p style={{fontSize:25, fontWeight:700}}>Continue Learning</p>
            <CourseCard 
            thumbnail={course.data.thumbnail} 
            id={course.id} 
            title={course.data.name} 
            creator={course.data.createdBy} 
            state={userData.continue.state} 
            edit={false} />
   
            </div>
            )
        }
        else{
            return null;
        }
}

export default ContinueLearning
         