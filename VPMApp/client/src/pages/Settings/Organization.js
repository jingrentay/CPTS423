import React, { useState, useEffect } from 'react'
import { Container, Box, Typography, Button, Skeleton, TextField} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getOrganization } from '../../features/accountSlice'

const ViewOrganizationPage = () => {

    const { name } = useParams()
    const dispatch = useDispatch()

    // Get the organization
    useEffect( () => {
        dispatch(getOrganization(name));
    }, [dispatch, name]);

    const { organization, loading } = useSelector((store) => ({...store.account}))

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
                <Typography variant='h5' noWrap sx={{ flexGrow: 1 }}> Organization Details </Typography> 
                <Button sx={{ mr: 3 }} key='back-project-button' component={Link} to="/settings" size="medium" variant="contained" >
                    Back
                </Button>  
            </Box>
            <Container sx={{ width: 500, ml: 27, mb: 6 }}>
                <TextField label='Name' value={organization.orgname} sx={{ mb: 2, mt: 3 }} name='org' variant='outlined' InputProps={{ readOnly: true }} fullWidth />                  
                <TextField label='Phone Number' value={organization.phone} sx={{ mb: 2, mt: 1 }} name='address' variant='outlined' InputProps={{ readOnly: true }} fullWidth />                  
                <TextField label='Address' value={organization.address} sx={{ mb: 2, mt: 1 }} name='phone' variant='outlined' InputProps={{ readOnly: true }} fullWidth />                  
            </Container>
            </ThemeProvider>
        </div>
    );
}

export default ViewOrganizationPage;