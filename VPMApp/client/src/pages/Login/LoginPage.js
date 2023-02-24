import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Button, TextField, InputAdornment, IconButton } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';

import profile from "../Login/assets/profile.jpeg";
import theme from '../../theme.js';
import "../Login/LoginPage.css";

function LoginPage() {

    const navigate = useNavigate()

    const [accountInfo, setAccountInfo] = useState({ email: '', password: ''})
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword((show) => !show)

    const handleLogin = () => {
        navigate('/projects')
    }

    return (
        <ThemeProvider key='theme-provider' theme={theme}>
        <div className='main'>
            <div className="sub-main">
                <div style={{ width: '60%', maxWidth: '300px' }}>
                    <div className="imgs">
                        <div className='container-image'>
                        <img src={profile} alt="profile" className="profile"/>
                        </div>
                    </div>
                    <div>
                        <h1>Log In</h1>
                        <div>
                            <TextField defaultValue={accountInfo.email} variant='outlined' label='Email' 
                                style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'center'}} 
                                onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start"> <MailOutlineIcon/> </InputAdornment>)
                                }}
                            />
                        </div>
                        <div className="second-input">
                            <TextField 
                                defaultValue={accountInfo.password} 
                                style={{ display: 'flex', justifyContent: 'center'}} 
                                variant='outlined' 
                                label='Password' 
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setAccountInfo({ ...accountInfo, password: e.target.value })}
                                InputProps={{
                                    endAdornment: (<InputAdornment position='end'> 
                                        <IconButton
                                            edge='end'
                                            onClick={handleShowPassword}
                                        >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>} 
                                        </IconButton>
                                    </InputAdornment>),
                                    startAdornment: (<InputAdornment position="start"> <LockIcon/> </InputAdornment>)
                                }}
                            /> 
                        </div>
                        <div className="login-button">
                            <Button onClick={handleLogin} color='primary' size="medium" variant="contained">
                                Log in
                            </Button>
                        </div>
                        <p className="link">
                            <a href="/signup"> Don't have an account? Sign up </a> 
                            <br />
                            <a href="/"> Forgot password? </a> 
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </ThemeProvider>
    );
}

export default LoginPage;