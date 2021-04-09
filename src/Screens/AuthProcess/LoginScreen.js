import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./LoginScreen.css";
import { auth, signInWithGoogle } from "../../Fire";
import { useHistory } from "react-router";
function LoginScreen() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const login = () => {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
       alert(err.message)
      });
  };
  return (
    <div>
    <form>
    <div className="LoginMain">
    <div className="LoginCard">
    <div className="header">
    <p className="font">Welcome Back</p>
    </div>
    <div className="input">
    <TextField
    variant="outlined"
    label="email"
    type="email"
    value={email}
    onChange={(val) => {
      setEmail(val.target.value);
    }}
    />
    </div>
    
    <div className="input">
    <TextField
    variant="outlined"
    label="password"
    type="password"
    value={pass}
    onChange={(val) => {
      setPass(val.target.value);
    }}
    />
    </div>
    <p 
    style={{color:"blue",alignSelf:"center", marginTop:10,cursor:"pointer"}}
    onClick={()=>{history.push("/recovery")}}
    >forgot password?</p>
    
    <div className="button">
    <Button
    type="submit"
    variant="outlined"
    onClick={() => {
      login();
    }}
    >
    Login
    </Button>
    </div>
    <p style={{ alignSelf: "center", marginTop: 20, fontSize: 16 }}>OR</p>
    <div
    className="googleLogin"
    onClick={() => {
      signInWithGoogle(history);
    }}
    >
    <Button variant="outlined">Continue with google</Button>
    </div>
    <div className="signUp">
    <p>Don't have an account?</p>
    
    <p
    onClick={() => {
      history.push("/signup");
    }}
    className="signUpText"
    >
    Sign up
    </p>
    </div>
    </div>
    </div>
    </form>
    </div>
  );
}

export default LoginScreen;
