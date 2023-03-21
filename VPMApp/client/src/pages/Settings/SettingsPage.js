import React, { useState, useEffect } from 'react'
import { Container, Grid, Typography, Card, MenuItem, CardContent, TextField, Button, IconButton, InputAdornment, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { createOrganization, changeOrganization } from '../../features/accountSlice'

const SettingsPage = () => {

    const dispatch = useDispatch()

    // eslint-disable-next-line
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    // eslint-disable-next-line
    const [orgList, setOrgList] = useState((JSON.parse(localStorage.getItem('profile'))).result.organizations)
    // eslint-disable-next-line
    const [changeOrgDisabled, setChangeOrgDisabled] = useState(orgList.length < 2)

    const [dialogOpen, setDialogOpen] = useState(false);
    const [orgDialogOpen, setOrgDialogOpen] = useState(false);
    const [newOrgDialogOpen, setNewOrgDialogOpen] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const [newOrganization, setNewOrganization] = useState({
        orgname: '',
        address: '', 
        phone: '',
        owner: '',
        members: [],
    })

    useEffect(() => {
        setNewOrganization(newOrganization => ({...newOrganization, owner: user.result._id, members: [{ user: user.result._id, name: user.result.name, role: 'Owner' }] }))
    }, [user]);

    const handleOpenOrgDialog = () => {
        setOrgDialogOpen(true);
    }
    const handleCloseOrgDialog = () => {
        setOrgDialogOpen(false);
    }

    const handleOpenPasswordDialog = () => {
        setDialogOpen(true);
    }
    const handleClosePasswordDialog = () => {
        setDialogOpen(false);
    }

    const handleOpenNewOrgDialog = () => {
        setNewOrgDialogOpen(true);
    }
    const handleCloseNewOrgDialog = () => {
        setNewOrganization({ orgname: '', address: '', phone: '', owner: '', members: [] })
        setNewOrgDialogOpen(false);
    }

    const handleShowPassword = () => setShowPassword((show) => !show)

    const handleChangePassword = () => {
        setPasswordError(true);
        // TODO: handleClosePasswordDialog()
    }

    const handleSaveOrg = () => {
        // Create a new organization
        dispatch(createOrganization({newOrg: newOrganization, accountID: user.result._id}))
        handleCloseNewOrgDialog()
    }

    const handleChangeOrg = () => {
        localStorage.setItem('profile', JSON.stringify(user))
        setUser(JSON.parse(localStorage.getItem('profile')))
        dispatch(changeOrganization({email: user.result.email, orgname: user.result.currOrganization}))
        handleCloseOrgDialog()
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
                                <TextField sx={{ mb: 2 }} defaultValue={user?.result.name} name='name' variant='outlined' label='Name' InputProps={{ readOnly: true }} fullWidth />
                                <TextField sx={{ mb: 2 }} defaultValue={user?.result.email} name='email' variant='outlined' label='Email' InputProps={{ readOnly: true }} fullWidth  />
                                <TextField sx={{ mb: 2 }} defaultValue={user?.result.phone} name='phone' variant='outlined' label='Phone' InputProps={{ readOnly: true }} fullWidth  />
                                <Button onClick={handleOpenPasswordDialog} fullWidth size='large' variant='contained' color='success' sx={{ backgroundColor: "#689f38" }}>Change Password</Button>
                            </CardContent>
                         </Card>
                    </Grid>
                    <Grid item xs={5.5}>
                        <Card key='organization' style={{ backgroundColor: '#F0F0F0', maxWidth: '500px'}} >
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2 }} > Current Organization </Typography>
                                <TextField value={user.result.currOrganization} sx={{ mb: 1 }} name='org' variant='outlined' InputProps={{ readOnly: true }} fullWidth />
                                <Button component={Link} to={`/settings/organization/${user.result.currOrganization}`} fullWidth size='large' variant='contained' color='success' sx={{ backgroundColor: "#689f38", mt: 2 }}>View Organization</Button>
                                <Button onClick={handleOpenOrgDialog} fullWidth size='large' variant='contained' color='success' disabled={changeOrgDisabled} sx={{ backgroundColor: "#689f38", mt: 2 }}>Change Organization</Button>
                                <Button onClick={handleOpenNewOrgDialog} fullWidth size='large' variant='contained' color='success' sx={{ backgroundColor: "#689f38", mt: 2 }}>Create New Organization</Button>
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
                <Dialog open={orgDialogOpen} onClose={handleCloseOrgDialog} PaperProps={{ sx: { width: "30%", height: "240px", minWidth: '300px' } }}>
                    <DialogTitle>Change Organization</DialogTitle>
                        <DialogContent>
                            <TextField fullWidth margin='dense' select sx={{ mt: 1 }} value={user?.result.currOrganization} label="Organization" onChange={(e) => setUser({...user, result: {...user.result, currOrganization: e.target.value}})}>
                                {orgList.map((org) => (
                                    <MenuItem key={org} value={org} >{org}</MenuItem>
                                ))}
                            </TextField>
                            <Button onClick={handleChangeOrg} fullWidth margin='dense' size='large' variant='contained' color='success' sx={{ backgroundColor: "#689f38", mt: 2 }}>Save</Button>
                        </DialogContent>
                </Dialog>
                <Dialog open={newOrgDialogOpen} onClose={handleCloseNewOrgDialog} PaperProps={{ sx: { width: "30%", height: "375px", minWidth: '300px' } }}>
                    <DialogTitle>Create New Organization</DialogTitle>
                        <DialogContent>
                            <TextField defaultValue={newOrganization.orgname} sx={{ mb: 2, mt: 1 }} name='orgname' variant='outlined' label='Name' fullWidth onChange={(e) => setNewOrganization({ ...newOrganization, orgname: e.target.value })}/>
                            <TextField defaultValue={newOrganization.address} sx={{ mb: 2 }} name='address' variant='outlined' label='Address' fullWidth onChange={(e) => setNewOrganization({ ...newOrganization, address: e.target.value })}/>
                            <TextField defaultValue={newOrganization.phonenumber} sx={{ mb: 2 }} name='phonenum' variant='outlined' label='Phone Number' fullWidth onChange={(e) => setNewOrganization({ ...newOrganization, phonenumber: e.target.value })} />
                            <Button onClick={handleSaveOrg} fullWidth size='large' variant='contained' color='success' sx={{ backgroundColor: "#689f38" }}>Save New Organization</Button>
                        </DialogContent>
                </Dialog>
            </Container>
            </ThemeProvider>
        </div>
    );
}

export default SettingsPage;