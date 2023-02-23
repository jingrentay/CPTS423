import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles'
import { Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import theme from '../../theme.js';
import { createAccount } from '../../features/accountSlice'

const SignUpPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [accountInfo, setAccountInfo] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        userID: 0,
        organization: '',
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword((show) => !show)

    const [nameError, setNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [orgError, setOrgError] = useState(false)
    const [inputError, setInputError] = useState(false)

    const handleTestInput = async() => {
        // make sure the fields are all full, display error msg if not
        if (accountInfo.name === '') { setNameError(true); setInputError(true); return true;
        } else { setNameError(false); setInputError(false); }
        if (accountInfo.email === '') { setEmailError(true);  setInputError(true); return true;
        } else { setEmailError(false); setInputError(false); }
        if (accountInfo.password === '') { setPasswordError(true);  setInputError(true); return true;
        } else { setPasswordError(false); setInputError(false); }
        if (accountInfo.phone === '') { setPhoneError(true);  setInputError(true); return true;
        } else { setPhoneError(false); setInputError(false); }
        if (accountInfo.organization === '') { setOrgError(true);  setInputError(true); return true;
        } else { setOrgError(false); setInputError(false); }

        return false;
    }

    const handleSignUp = async() => {
        handleTestInput().then((error) => { 
            console.log(error, accountInfo); 
            if (!error) {
                dispatch(createAccount(accountInfo))
                navigate('/'); 
            }
        })
    }

    return (
        <div style={{ backgroundColor: '#cbd9db'}}>
        <ThemeProvider key='theme-provider' theme={theme}>
            <Box
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
                sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 400,  height: '75vh', minHeight: 600, maxHeight:600 } 
            }}>
                <Paper elevation={3} >
                    <Typography variant='h4' sx={{ mt: 4, mb: 3 }} style={{ color: '#036e8f', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >Sign Up</Typography>
                    <Box sx={{ ml: 2, mr: 2, height: '75vh' }}

                    >   
                        <TextField error={nameError} defaultValue={accountInfo.name} name='name' variant='outlined' label='Name *' style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'center'}} onChange={(e) => setAccountInfo({ ...accountInfo, name: e.target.value })}/>
                        <TextField error={emailError} defaultValue={accountInfo.email} name='email' variant='outlined' label='Email *' style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'center'}} onChange={(e) => setAccountInfo({ ...accountInfo, email: e.target.value })}/>
                        <TextField 
                            error={passwordError}
                            defaultValue={accountInfo.password} 
                            name='password' variant='outlined' 
                            label='Password *' 
                            type={showPassword ? "text" : "password"}
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
                        <TextField error={phoneError} defaultValue={accountInfo.phone} name='phone-number' variant='outlined' label='Phone Number *' style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'center'}} onChange={(e) => setAccountInfo({ ...accountInfo, phone: e.target.value })}/>   
                        <TextField error={orgError} defaultValue={accountInfo.organization} name='org' variant='outlined' label='Organization' style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'center'}} onChange={(e) => setAccountInfo({ ...accountInfo, organization: e.target.value })}/>
                        { inputError &&
                            <Typography variant='body2' color='#DF4338'> Required field(s) missing. </Typography>
                        }
                        <Button onClick={async() => { await handleSignUp()}} color='success' variant="contained" fullWidth size='large' sx={{ mt: 1 }}  > Sign Up </Button>
                        <Button component={Link} to="/" variant="contained" fullWidth size='large' sx={{ mt: 2 }}  > Back to Login </Button>
                    </Box>            
                </Paper>
            </Box>
        </ThemeProvider>
        </div>
    )
};

export default SignUpPage;