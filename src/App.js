import './App.css';
import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginScreen from './Screens/AuthProcess/LoginScreen';
import SignUpScreen from './Screens/AuthProcess/SignUpScreen';
import { auth } from './Fire';
import HomeScreen from './Screens/HomeScreen';
import React,{ useState } from 'react';
import AddCourse from './Screens/AddCourse/AddCourse'

export const Context = React.createContext();

function App() {
  const [user, setUser] = useState(null);
auth.onAuthStateChanged((user) => {
  if (user) {
    setUser(user)
  }
});
  return (
    <Context.Provider value={user}>
    <Router>
    <Switch>
    <Route path="/addCourse">
    {user?<AddCourse/>:<LoginScreen/>}
    </Route> 
    
    <Route path="/login">
    <LoginScreen/>
    </Route> 
    <Route path="/signup">
    <SignUpScreen/>
    </Route>
    <Route path="/">
    <HomeScreen/> 
    </Route>
    </Switch>
    </Router>
    </Context.Provider>
    );
}

export default App;
