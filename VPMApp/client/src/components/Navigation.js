import React from 'react';
import { Link } from 'react-router-dom'
import { Drawer, AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme.js'
import Sidebar from './Sidebar';

const drawerWidth = 200;

const Navigation = () => {
    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex'}}>
            <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1}}>
                        Visual Project Management
                    </Typography>
                    <Button component={Link} to="/" size="medium" variant="contained" sx={{ backgroundColor: "#689f38"}}>
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