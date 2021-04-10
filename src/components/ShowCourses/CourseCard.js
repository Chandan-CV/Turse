import React from 'react'
import { useHistory } from 'react-router'
import "../ShowCourses/CourseCard.css"
function CourseCard({thumbnail,title,creator, id}) {
    const history = useHistory();
    return (
        <div className="outerDiv" 
        onClick={()=>{history.push("/coursepage", {id})}}
        >
            <img
            src={thumbnail}
            style={{width:350, height:250}}
            />
            <p className="title">{title}</p>
            <p>created by {creator}</p>
        </div>
    )
}

export default CourseCard
