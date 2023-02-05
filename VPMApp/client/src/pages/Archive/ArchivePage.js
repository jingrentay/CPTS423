import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton, Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getArchivedProjects, deleteProject } from '../../features/projectSlice'

const ArchivePage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArchivedProjects());
    }, [dispatch]);

    const { projects, loadingAll } = useSelector((store) => store.projects)

    const handleDeleteProject = (id) => {
        dispatch(deleteProject(id))
    }

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

    return (
        <div>
            <Navigation/>
            {projects.length === 0 &&
                <Typography variant="h6" sx={{ mt: 11, ml: 28 }}> You have no archived projects. </Typography>
            }
            {projects.length > 0 && 
                 <Typography variant="h5" sx={{ mt: 11, ml: 29 }}> Archived Projects </Typography>
            }
            {projects.map((project) => (
                    <Card key={project.projectName} sx={{ml: 28, mt: 3, width: 550, height: 85, backgroundColor: project.projectStatus? project.projectStatus : '#A0A0A0' }} >
                        <CardContent>
                            <Grid container>
                                <Grid item xs={9.5}>
                                    <Box sx={{ display: 'flex'}}>
                                        <Typography variant='h6' sx={{ flexGrow: 1}}> {project.projectName} </Typography>
                                    </Box>
                                    <Typography> Project ID: {project.projectID} </Typography>
                                    </Grid>
                                <Grid item xs={1.25}>
                                    <IconButton key='delete-project-button' onClick={() => handleDeleteProject(project._id)} > 
                                        <DeleteIcon fontSize='large' /> 
                                    </IconButton>
                                 </Grid>
                                <Grid item xs={1.25}>
                                    <IconButton key='view-project-button' component={Link} to={`/projects/view/archive/${project.projectID}`} > 
                                        <InfoIcon fontSize='large' /> 
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
        </div>
    );
}

export default ArchivePage;