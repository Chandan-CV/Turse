import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { storage } from '../Fire';

function Announcements() {
    const [images,setImages]= useState([]);
    useEffect(()=>{
        const fetchImages = async () => {
            let result = await storage.ref("/Announcements").listAll();
            let urlPromises = result.items.map((imageRef) =>
            imageRef.getDownloadURL()
            );
            
            return Promise.all(urlPromises);
        };
        
        const loadImages = async () => {
            const urls = await fetchImages();
            setImages(urls);
        };
        loadImages();
    },[])
        
    return (
        <div>
        <Carousel showArrows={true} showThumbs={false} >
            {images.map((url)=>{
                return <div
                style={{ maxHeight: "400px", objectFit:"contain", backgroundColor:"lightgrey"}}
                >
                <img 
                style={{objectFit:"contain", maxHeight:"400px"}}
                src={url} />
                </div>
            })}
            </Carousel>
        </div>
    )
}

export default Announcements
