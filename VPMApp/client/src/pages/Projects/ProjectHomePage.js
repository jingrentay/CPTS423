import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector } from 'react-redux'

import theme from '../../theme.js'
import FeverChart from '../../components/FeverChart'
import Navigation from '../../components/Navigation'

const ProjectHomePage = () => {

    const projects = useSelector((state) => state.projects)
    console.log(projects)

    return (
        <>
        <ThemeProvider key='theme-provider' theme={theme}>
            <Navigation key='nav' />
            <Button key='new-project-button' component={Link} to="/projects/create" size="medium" variant="contained" sx={{ ml: 28, mt: 10 }}>
                New Project
            </Button>
            <div key='chart-padding' style={{ paddingLeft: '200px', paddingTop: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div key='chart-contain' style={{ position: 'relative', height: '20vh', width: '40vw' }}>
                    <FeverChart/>
                </div>
            </div>
            

        </ThemeProvider>
        </>
    );
}

export default ProjectHomePage;