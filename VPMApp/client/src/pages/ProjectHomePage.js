import React from 'react'
import { Button, Toolbar, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import FeverChart from '../components/FeverChart'
import { Container } from '@mui/system'

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
            <div class="chart-container" style={{position: 'relative', height: '20vh', width: '40vw'}}>
                <Container> 
                    <FeverChart/>
                </Container>
            </div>
        </div>
    );
}

export default ProjectHomePage;