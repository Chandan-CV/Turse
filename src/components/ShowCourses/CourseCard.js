import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import "../ShowCourses/CourseCard.css"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Card } from '@material-ui/core';
import { db } from '../../Fire';
import { Context } from '../../App';
function CourseCard({thumbnail,title,creator, id, state,edit,course}) {
    const user = useContext(Context);
    const history = useHistory();
    const handleDelete=async()=>{
      await  db.collection("Courses").doc(id).delete().then(()=>{alert("document deleted")});
    } 
    const handleEdit=async()=>{
        await  db.collection("Courses").doc(id).delete().then(async()=>{
            await db.collection("Users").doc(user.uid).update(
                {
                    saved: course
                }
            ).then(()=>{
                window.location.reload();
            })

        });
      } 

    return (
        <div>
        <Card className="outerDiv" 
        onClick={()=>{if(state){
            history.push(`/coursepage/${id}`, {id,state})}
            else{ 
                history.push(`/coursepage/${id}`, {id})}
                
            }
            
        }
        >
        <img
        src={thumbnail}
        style={{width:150}}
        />
        <p className="title">{title}</p>
        <p>created by {creator}</p>
        
        </Card>
        {edit?
            <div style={{display:"flex", justifyContent:"space-evenly"}}>
            <div onClick={()=>{handleDelete()}}><DeleteIcon style={{cursor:"pointer"}}/></div>
           <div onClick={()=>{handleEdit()}}> <EditIcon style={{cursor:"pointer"}}/></div>
            </div>:null
        }
        
        </div>
        )
    }
    
    export default CourseCard
    