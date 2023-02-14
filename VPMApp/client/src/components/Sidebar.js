import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Box sx={{ overflow: 'auto' }}>
            <List>
                <ListItem key="Projects">
                    <ListItemButton component={Link} to="/projects">
                        <ListItemIcon sx={{ color: 'white' }}> <FolderIcon/> </ListItemIcon>
                        <ListItemText sx={{ color: 'white' }}> Projects </ListItemText>
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
