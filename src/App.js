import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginScreen from './Screens/AuthProcess/LoginScreen';
import SignUpScreen from './Screens/AuthProcess/SignUpScreen';
import { Button } from '@material-ui/core';
import { auth } from './Fire';

function App() {
  return (
  <Router>
      <Switch>
      <Route path="/login">
      <LoginScreen/>
      </Route> 
      <Route path="/signup">
      <SignUpScreen/>
      </Route>
          <Route path="/">
              <h1>this is the home screen</h1>
              <Button variant="outlined" onClick={()=>{auth.signOut()}} > logout </Button>
          </Route>
      </Switch>
  </Router>
  );
}

export default App;
