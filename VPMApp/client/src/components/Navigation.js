import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Drawer, AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person';

import theme from '../theme.js'
import Sidebar from './Sidebar';
import { logout } from '../features/accountSlice'

const drawerWidth = 210;

const Navigation = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // eslint-disable-next-line
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const handleLogOut = () => {
        dispatch(logout())
        alert('You are now logged out.')
        navigate('/')
        setUser(null)
    }

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex'}}>
            <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1}}>
                        Visual Project Management
                    </Typography>
                    {user &&
                        <Chip icon={<PersonIcon />} color='primary' label={user.result.name} sx={{ backgroundColor: '#009999', mr: 3 }} />
                    }
                    <Button onClick={handleLogOut} size="small" variant="contained" color='success' sx={{ backgroundColor: "#689f38"}}>
                        Log Out
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"color="secondary"
                sx={{ backgroundColor: "#2a4b60", width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }}}
            >
                <Toolbar/>
                <Sidebar/>
            </Drawer>
        </Box> 
        </ThemeProvider>
    );
  };
  
  export default Navigation;