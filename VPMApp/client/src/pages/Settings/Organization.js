import React, { useState, useEffect } from 'react'
import { Container, Box, Typography, Button, Skeleton, TextField, Dialog, DialogTitle, DialogContent, MenuItem, Breadcrumbs, Card, CardContent, Grid, IconButton } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EditIcon from '@mui/icons-material/Edit';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getOrganization, editRole } from '../../features/accountSlice'

const ViewOrganizationPage = () => {

    const { name } = useParams()
    const dispatch = useDispatch()

    const { organization, loading } = useSelector((store) => ({...store.account}))

    const [roleDialogOpen, setRoleDialogOpen] = useState(false);
    const [roleData, setRoleData] = useState({
        id: 0,
        role: '',
    })

    // Get the organization
    useEffect( () => {
        dispatch(getOrganization(name));
    }, [dispatch, name]);

    const handleOpenRoleDialog = (role, id) => {
        setRoleData({...roleData, id: id, role: role})
        setRoleDialogOpen(true);
    }
    const handleCloseRoleDialog = () => {
        setRoleDialogOpen(false);
    }

    const handleChangeRole = () => {
        dispatch(editRole({id: roleData.id, newrole: roleData.role, orgname: name}))
        setRoleData({ id: 0, role: ''})
        handleCloseRoleDialog()
    }

    const roles = ['Owner', 'Administrator', 'Project Manager', 'Worker']

    if (loading) {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Navigation key='nav' />
                    <Box sx={{ width: 600, ml: 28, mt: 10 }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
                </ThemeProvider>
            </>
        )
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
            <Navigation/>
            <Box sx={{ mt: 11, ml: 30, display: 'flex' }}>
                <Breadcrumbs sx={{ flexGrow: 1 }} separator={<NavigateNextIcon fontSize="medium" />}>
                    <Typography variant='h5' underline='hover' color='black' component={Link} to="/settings"> Settings </Typography>
                    <Typography variant='h5' color='black' noWrap sx={{ flexGrow: 1 }}> Organization Details </Typography> 
                </Breadcrumbs>
                <Button sx={{ mr: 3 }} key='back-project-button' component={Link} to="/settings" size="medium" variant="contained" >
                    Back
                </Button>  
            </Box>
            <Container sx={{ width: 500, ml: 27, mb: 6 }}>
                <TextField label='Name' value={organization?.orgname} sx={{ mb: 2, mt: 3 }} name='org' variant='outlined' InputProps={{ readOnly: true }} fullWidth />                  
                <TextField label='Phone Number' value={organization?.phone} sx={{ mb: 2, mt: 1 }} name='address' variant='outlined' InputProps={{ readOnly: true }} fullWidth />                  
                <TextField label='Address' value={organization?.address} sx={{ mb: 2, mt: 1 }} name='phone' variant='outlined' InputProps={{ readOnly: true }} fullWidth />                  
                <Typography variant="h6" sx={{ mt: 1, mb: 2 }} > Members </Typography>
                {organization?.members.length === 0 && 
                    <Typography variant="h6" sx={{ mb: 2 }} >There are no members in this organization. </Typography> 
                }
                {organization?.members.length > 0 && 
                    organization?.members.map((user) => (
                        <Card key={user.userID} sx={{ mb: 3, width: 450, height: 85, backgroundColor: '#E0E0E0' }}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={10}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant='h6' sx={{ flexGrow: 1 }}> {user.name} </Typography>
                                        </Box>
                                        <Typography> Role: {user.role} </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton onClick={() => handleOpenRoleDialog(user.role, user.userID)}> 
                                            <EditIcon fontSize='large' /> 
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        <Dialog open={roleDialogOpen} onClose={handleCloseRoleDialog} PaperProps={{ sx: { width: "30%", height: "240px", minWidth: '300px' } }}>
                            <DialogTitle>Edit Role</DialogTitle>
                            <DialogContent>
                                <TextField fullWidth margin='dense' select sx={{ mt: 1 }} value={roleData.role} label="Role" onChange={(e) => { setRoleData({...roleData, role: e.target.value }) }}>
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role} >{role}</MenuItem>
                                    ))}
                                </TextField>
                                <Button onClick={handleChangeRole} fullWidth margin='dense' size='large' variant='contained' color='success' sx={{ backgroundColor: "#689f38", mt: 2 }}>Save</Button>
                            </DialogContent>
                        </Dialog>
                        </Card>
                ))}
            </Container>
            </ThemeProvider>
        </div>
    );
}

export default ViewOrganizationPage;