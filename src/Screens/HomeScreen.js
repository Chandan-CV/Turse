import React from 'react'
import Announcements from '../components/Announcements';
import ContinueLearning from '../components/ContinueLearning';
import Navbar from "../components/navbar/Navbar";
import PlayVid from '../components/PlayVid';
import ShowCourses from '../components/ShowCourses/ShowCourses';
import logo from "../assets/logo.svg"
function HomeScreen() {
    return (
        <div>
            <Navbar/>
            <Announcements/>
           <ShowCourses/>
        </div>
    )
}

export default HomeScreen
