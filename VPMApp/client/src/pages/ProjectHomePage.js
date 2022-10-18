import React from 'react'
import { Button, Toolbar, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import FeverChart from '../components/FeverChart'

const ProjectHomePage = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Virtual Project Management
                    </Typography>
                    <Button component={Link} to="/" size="medium" variant="contained">
                        Log Out
                    </Button>
                </Toolbar>
            </Box>
            <div style={{ paddingTop: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div class="chart-container" style={{ position: 'relative', height: '20vh', width: '40vw' }}>
                    <FeverChart/>
                </div>
            </div>
        </div>
    );
}

export default ProjectHomePage;