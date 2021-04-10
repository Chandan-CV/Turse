import { YouTube } from '@material-ui/icons'
import getYouTubeID from 'get-youtube-id';
import React, { useEffect, useState } from 'react'

const YoutubeEmbed = ({ embedId }) => (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}?rel=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        
      />
    </div>
  );


function PlayVid({url}) {
    const [id,getID]= useState("");
    useEffect(()=>{
        getID(getYouTubeID(url))
    },[])
  
    return (
    <YoutubeEmbed embedId={id} />
    )
}

export default PlayVid
