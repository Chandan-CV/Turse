import { YouTube } from '@material-ui/icons'
import getYouTubeID from 'get-youtube-id';
import React, { useEffect, useState } from 'react'

const YoutubeEmbed = ({ embedId, width, height }) => (
    <div className="video-responsive" style={{width:"100%"}}>
      <iframe
      id="player"
        width={width}
        height={height}
        style={{height:height, width:width}}
        src={`https://www.youtube.com/embed/${embedId}?rel=0`}
        frameBorder="0"
        allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        
      />
    </div>
  );


function PlayVid({url, width, height}) {
    const [id,getID]= useState("");
    useEffect(()=>{
        getID(getYouTubeID(url))
    },[url])
  
    return (
    <YoutubeEmbed embedId={id} width={width} height={height} />
    )
}

export default PlayVid
