import React, { useState } from 'react'
import { Container, Grid, Typography, Card, CardContent, TextField, Button, IconButton, InputAdornment, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { VisibilityOff, Visibility } from '@mui/icons-material'

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'

const SettingsPage = () => {

    const [accountInfo, setAccountInfo] = useState({
        name: 'Jane',
        email: 'jane@wsu.edu',
        password: '',
        phone: '80978632837',
        userID: 0,
        organization: 'Students',
    })

    const [dialogOpen, setDialogOpen] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const handleOpenPasswordDialog = () => {
        setDialogOpen(true);
    }
    const handleClosePasswordDialog = () => {
        setDialogOpen(false);
    }
    const handleShowPassword = () => setShowPassword((show) => !show)
    const handleChangePassword = () => {
        if (accountInfo.password === '') { setPasswordError(true); } else { setPasswordError(false); }
        // handleClosePasswordDialog()
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
            <Navigation/>
            <Container sx={{ mt: 10, ml: 25}}>
                <Typography variant="h5" sx={{ mb: 3 }} > Settings </Typography>
                <Grid container item spacing={4}>
                    <Grid item xs={5.5}>
                        <Card key='user details' style={{ backgroundColor: '#F0F0F0', maxWidth: '500px'}} >
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }} > User Details </Typography>
                                <TextField sx={{ mb: 2 }} defaultValue={accountInfo.name} name='name' variant='outlined' label='Name' InputProps={{ readOnly: true }} fullWidth />
                                <TextField sx={{ mb: 2 }} defaultValue={accountInfo.email} name='email' variant='outlined' label='Email' InputProps={{ readOnly: true }} fullWidth  />
                                <TextField sx={{ mb: 2 }} defaultValue={accountInfo.phone} name='phone' variant='outlined' label='Phone' InputProps={{ readOnly: true }} fullWidth  />
                                <Button onClick={handleOpenPasswordDialog} fullWidth size='large' variant='contained' color='success' sx={{ backgroundColor: "#689f38" }}>Change Password</Button>
                            </CardContent>
                         </Card>
                    </Grid>
                    <Grid item xs={5.5}>
                        <Card key='organization' style={{ backgroundColor: '#F0F0F0', maxWidth: '500px'}} >
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }} > Organization </Typography>
                                <TextField defaultValue={accountInfo.organization} name='org' variant='outlined' label='Organization' InputProps={{ readOnly: true }} fullWidth />
                            </CardContent>
                         </Card>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
                <Dialog open={dialogOpen} onClose={handleClosePasswordDialog}>
                    <DialogTitle>Change Password</DialogTitle>
                        <DialogContent>
                            <TextField 
                                error={passwordError}
                                name='current password' 
                                variant='outlined' 
                                label='Current Password' 
                                type={showPassword ? "text" : "password"}
                                sx={{ mt: 1, mb: 2, width: 300 }}
                                style={{ display: 'flex', justifyContent: 'center'}} 
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
                            <TextField 
                                error={passwordError}
                                name='new password' 
                                variant='outlined' 
                                label='New Password' 
                                type={showPassword ? "text" : "password"}
                                sx={{ mb: 3, width: 300 }}
                                style={{ display: 'flex', justifyContent: 'center'}} 
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
                            <Button onClick={handleChangePassword} fullWidth size='large' variant='contained' color='success' sx={{ backgroundColor: "#689f38" }}>Save</Button>
                        </DialogContent>
                </Dialog>
            </Container>
            </ThemeProvider>
        </div>
    );
}

export default SettingsPage;