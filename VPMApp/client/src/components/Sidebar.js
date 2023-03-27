import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Sidebar = () => {
    return (
        <Box sx={{ overflow: 'auto' }}>
            <List>
                <ListItem key="InPlanning">
                    <ListItemButton component={Link} to="/projects/planning">
                        <ListItemIcon sx={{ color: 'white' }}> <CalendarMonthIcon/> </ListItemIcon>
                        <ListItemText sx={{ color: 'white' }}> In Planning </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem key="InProgress">
                    <ListItemButton component={Link} to="/projects/progress">
                        <ListItemIcon sx={{ color: 'white' }}> <FolderIcon/> </ListItemIcon>
                        <ListItemText sx={{ color: 'white' }}> In Progress </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem key="Archive">
                    <ListItemButton component={Link} to="/archive">
                        <ListItemIcon sx={{ color: 'white' }}> <InventoryIcon/> </ListItemIcon>
                        <ListItemText sx={{ color: 'white' }}> Archive </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem key="Settings">
                    <ListItemButton component={Link} to="/settings">
                        <ListItemIcon sx={{ color: 'white' }}> <SettingsIcon /> </ListItemIcon>
                        <ListItemText sx={{ color: 'white' }}> Settings </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
  };
  
  export default Sidebar;
