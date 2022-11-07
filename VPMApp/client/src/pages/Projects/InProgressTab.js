import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton, Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from 'react-redux'

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import FeverChart from '../../components/FeverChart'
import { getProjects } from '../../features/projectSlice'

const InProgressTab = () => {
    const dispatch = useDispatch();

    

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const { projects, loadingAll } = useSelector((store) => store.projects)

    if (loadingAll) {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Navigation key='nav' />
                    <Box sx={{ width: 600 }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
                </ThemeProvider>
            </>
        )
    }

    let color = '#A0A0A0'

    return (
        <>
        <ThemeProvider key='theme-provider' theme={theme}>
            <Navigation key='nav' />
            <div key='chart-padding' style={{ paddingBottom: '10px', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div key='chart-contain' style={{ position: 'relative', width: '40vw' }}>
                    <FeverChart/>
                </div>
            </div>
                {projects.map((project) => (
                    <Card key={project.projectName} sx={{ml: 28, mt: 3, width: 700, height: 85, backgroundColor: color }}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={11}>
                                    <Box sx={{ display: 'flex'}}>
                                        <Typography variant='h6' sx={{ flexGrow: 1}}> {project.projectName} </Typography>
                                    </Box>
                                    <Typography> Project ID: {project.projectID} </Typography>
                                    </Grid>
                                <Grid item xs={1}>
                                <IconButton key='view-project-button' component={Link} to={`/projects/view/${project.projectID}`} > 
                                    <InfoIcon fontSize='large' /> 
                                </IconButton>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
        </ThemeProvider>
        </>
    );
}

export default InProgressTab;