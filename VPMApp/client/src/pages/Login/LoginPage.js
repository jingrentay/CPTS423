import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import profile from "../Login/assets/profile.jpeg";
import email from "../Login/assets/email.jpg";
import pass from "../Login/assets/password.png";
import "../Login/LoginPage.css";

function LoginPage() {
    return (
        
            <div className='main'>
            <div className="sub-main">
            <div>
            <div className="imgs">
                <div className='container-image'>
                <img src={profile} alt="profile" className="profile"/>
                </div>
                </div>
        
                <div>
                <h1>Login Page</h1>
                <div>
                <img src={email} alt="email" className="email"/>
                <input type="text" placeholder="user name" className="name"/>
                </div>
                <div className="second-input">
                <img src={pass} alt="pass" className="email"/>
                <input type="password" placeholder="user name" className="name"/>
                </div>
                <div className="login-button">
                <Button component={Link} to="/projects" size="medium" variant="contained" >
                Login
               </Button>
               </div>
               
               <p className="link">
                <a href="/">Forgot password ?</a> Or<a href="/">  Sign Up</a>
              </p>
            
            </div>
            </div>
            </div>
            </div>
    );
}

export default LoginPage;