import React from 'react'
import Announcements from '../components/Announcements';
import ContinueLearning from '../components/ContinueLearning';
import Navbar from "../components/navbar/Navbar";
import PlayVid from '../components/PlayVid';
function HomeScreen() {
    return (
        <div>
            <Navbar/>
            <Announcements/>
            <PlayVid url="https://youtu.be/rokGy0huYEA"/>
            <ContinueLearning/>
        </div>
    )
}

export default HomeScreen
