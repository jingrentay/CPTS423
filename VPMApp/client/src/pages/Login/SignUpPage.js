import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles'
import { Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

import theme from '../../theme.js';

const SignUpPage = () => {

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const [accountInfo, setAccountInfo] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        userID: 0,
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword((show) => !show)

    const handleSignUp = () => {
        console.log(accountInfo)
        // TODO: dispatch user info to accounts
        navigate('/');
    }

    return (
        <div style={{ backgroundColor: '#cbd9db'}}>
        <ThemeProvider key='theme-provider' theme={theme}>
            <Box
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
                sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 400,  height: '75vh', minHeight: 525, maxHeight: 525 } 
            }}>
                <Paper elevation={3} >
                    <Typography variant='h4' sx={{ mt: 4, mb: 3 }} style={{ color: '#036e8f', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >Sign Up</Typography>
                    <Box sx={{ ml: 2, mr: 2, height: '75vh' }}

                    >   
                        <TextField defaultValue={accountInfo.name} name='name' variant='outlined' label='Name' style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'center'}} onChange={(e) => setAccountInfo({ ...accountInfo, name: e.target.value })}/>
                        <TextField defaultValue={accountInfo.email} name='email' variant='outlined' label='Email' style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'center'}} onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}/>
                        <TextField 
                            defaultValue={accountInfo.password} 
                            name='password' variant='outlined' 
                            label='Password' 
                            style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'center'}} 
                            onChange={(e) => setAccountInfo({ ...accountInfo, password: e.target.value })}
                            InputProps={{
                                endAdornment: (<InputAdornment position='end'> 
                                    <IconButton
                                        edge='end'
                                        onClick={handleShowPassword}
                                    >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>} 
                                    </IconButton>
                                </InputAdornment>)
                            }}
                        /> 
                        <TextField defaultValue={accountInfo.phone} name='phone-number' variant='outlined' label='Phone Number' style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'center'}} onChange={(e) => setAccountInfo({ ...accountInfo, phone: e.target.value })}/>   
                        <Button onClick={handleSignUp} color='success' variant="contained" fullWidth size='large' sx={{ mt: 1 }}  > Sign Up </Button>
                        <Button component={Link} to="/" variant="contained" fullWidth size='large' sx={{ mt: 2 }}  > Back to Login </Button>
                    </Box>            
                </Paper>
            </Box>
        </ThemeProvider>
        </div>
    )
};

export default SignUpPage;