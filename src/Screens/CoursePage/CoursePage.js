import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import PlayVid from '../../components/PlayVid';
import { db } from '../../Fire';
import Navbar from '../../components/navbar/Navbar'
import "../CoursePage/CoursePage.css"
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import DescriptionIcon from '@material-ui/icons/Description';
import Disqus from 'disqus-react';

function CoursePage() {
    const id= useLocation().state;
    const [data, setData] = useState(null);
    const [state, setState]= useState(null);
    useEffect(
        async()=>{
            await db.collection("Courses").doc(id.id).get().then((response)=>{
                 setData(response.data())
                 setState(response.data().content[0])
                })
    },[])

    return (
        <div>
            <Navbar/>
            <div style={{display:'flex'}}>
            
            {state?.type=="youtube"?<PlayVid  url={state.url} width={950} height={400} />:null}
            {state?.type=="custom"?<iframe src={state.url }  width={950} height={400} />:null}
            <div className='rhs'>
            <p>Course Content</p>
            {data && state? data.content.map((element)=>{
              return (<div className={state.index===element.index?"SelectedState":"CC"} onClick={()=>{setState(element)}}>
                <p>{element.index +1}. </p>
                <p>{element.name}</p>
                {element.type==="youtube"?<PlayCircleFilledIcon/>:<DescriptionIcon/> }

              </div>
              )
            }) :null}
            </div>
            </div>
            {data?
                <div style={{marginTop:300}}>
                <Disqus.DiscussionEmbed
                shortname="Ularn"
                config={ 
                    {url: "http://localhost:3000/coursepage",
                    identifier: id.id,
                    title: data.name
                }
            }
            />
            </div>
            : null}


        </div>
    )
}

export default CoursePage
