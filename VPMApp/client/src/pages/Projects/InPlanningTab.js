import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton, Button, Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from 'react-redux'


import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getProjects } from '../../features/projectSlice'
import { deleteProject } from '../../features/projectSlice'

const InPlanningTab = () => {
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
            <Button key='new-project-button' component={Link} to="/projects/create" size="medium" variant="contained">
                New Project
            </Button>
                {projects.map((project) => (
                    <Card key={project.projectName} sx={{ mt: 3, width: 700, height: 85, backgroundColor: color }}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={10}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography variant='h6' sx={{ flexGrow: 1 }}> {project.projectName} </Typography>
                                    </Box>
                                    <Typography> Project ID: {project.projectID} </Typography>
                                    </Grid>
                                <Grid item xs={2}>
                                <Box sx={{ display: 'flex'}}>
                                    <IconButton key='view-project-button' component={Link} to={`/projects/view/${project.projectID}`}> 
                                        <InfoIcon fontSize='large' /> 
                                    </IconButton>
                                </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
        </ThemeProvider>
        </>
    );
}

export default InPlanningTab;