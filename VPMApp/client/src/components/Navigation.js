import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Drawer, AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person';

import theme from '../theme.js'
import Sidebar from './Sidebar';
import { Person } from '@mui/icons-material';

const drawerWidth = 200;

const Navigation = () => {

    const navigate = useNavigate()

    const handleLogOut = () => {
        navigate('/')
        alert('You are now logged out.')
    }

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex'}}>
            <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1}}>
                        Visual Project Management
                    </Typography>
                    <Chip icon={<PersonIcon />} color='primary' label="User" sx={{ backgroundColor: '#009999', mr: 3, width: 100}} />
                    <Button onClick={handleLogOut} size="small" variant="contained" sx={{ backgroundColor: "#689f38"}}>
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