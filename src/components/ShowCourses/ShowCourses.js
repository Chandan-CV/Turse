import SearchBar from 'material-ui-search-bar';
import React, { useEffect, useState } from 'react'
import { db } from '../../Fire';
import CourseCard from './CourseCard'


function ShowCourses() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm]= useState("");
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

    const handleSearch = async()=>{
        if(searchTerm.length>0){

            await db.collection("Courses").where("tags","array-contains",searchTerm).get().then((snap)=>{
                setData(
                    snap.docs.map((e)=>
                    {return {  
                        id :e.id,
                        data : e.data()
                    }}
                    )
                    );
                })
            }else{
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
            }
        }
            
    return (
        <div>
        <div style={{padding:40}}>
        <SearchBar
        placeholder="Search for courses"
        value={searchTerm}
        onChange={(e)=>{setSearchTerm(e)}}
        onRequestSearch={()=>{handleSearch()}}
        />
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
            key={course.id}/>
        })}
        </div>
        </div>
        )
    }
    
    export default ShowCourses
    