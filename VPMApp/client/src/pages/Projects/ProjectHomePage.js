import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton, Button, Grid, Card, CardContent, Container, Typography, IconButton, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from 'react-redux'

import theme from '../../theme.js'
import FeverChart from '../../components/FeverChart'
import Navigation from '../../components/Navigation'
import { getProjects } from '../../features/projectSlice'

const ProjectHomePage = () => {

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
                    <Box sx={{ width: 600, ml: 28, mt: 10 }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
                </ThemeProvider>
            </>
        )
    }

    return (
        <>
        <ThemeProvider key='theme-provider' theme={theme}>
            <Navigation key='nav' />
            <Button key='new-project-button' component={Link} to="/projects/create" size="medium" variant="contained" sx={{ ml: 28, mt: 10 }}>
                New Project
            </Button>
            <Container> 
            <div key='chart-padding' style={{ paddingLeft: '200px', paddingTop: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div key='chart-contain' style={{ position: 'relative', width: '40vw' }}>
                    <FeverChart/>
                </div>
            </div>
            <Typography style={{ paddingLeft: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} variant='h4' sx={{ mt: 3 }}> Projects </Typography>
            {projects.map((project) => (
                <Card key={project.projectName} sx={{ ml: 41, mt: 3, width: 700, height: 85, backgroundColor: '#A0A0A0' }}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <Box sx={{ display: 'flex'}}>
                                    <Typography variant='h6' sx={{ flexGrow: 1}}> {project.projectName} </Typography>
                                </Box>
                                <Typography> Project ID: {project.projectID} </Typography>
                                </Grid>
                            <Grid item xs={1}>
                            <IconButton key='view-project-button' component={Link} to={`/projects/view/${project.projectID}`} > <InfoIcon fontSize='large' /> </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
            </Container>
        </ThemeProvider>
        </>
    );
}

export default ProjectHomePage;