import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton, Grid, Chip, Breadcrumbs, Card, CardContent, Typography, IconButton, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getArchivedProjects, deleteProject } from '../../features/projectSlice'

const ArchivePage = () => {

    const dispatch = useDispatch();

    const { projects, loadingAll } = useSelector((store) => ({...store.projects}))
    // eslint-disable-next-line
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem('profile')).result)

    useEffect(() => {
        dispatch(getArchivedProjects(account.currOrganization));
    }, [dispatch, account]);

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
            <ThemeProvider theme={theme}>
                <Navigation/>
                <Box sx={{ mt: 11, ml: 30 }}>
                    <Box sx={{ display: 'flex', mb: 4 }}>
                        <Breadcrumbs sx={{ flexGrow: 1 }} separator={<NavigateNextIcon fontSize="medium" />}>
                            <Typography fontSize='25px' underline='hover' color='secondary'> Projects </Typography>
                            <Typography fontSize='25px' color='secondary' noWrap sx={{ flexGrow: 1 }}> Archive </Typography> 
                            <Chip label={'Organization: ' + account.currOrganization} />
                        </Breadcrumbs>
                    </Box>
                    {projects.length === 0 &&
                        <Typography variant="h6" > You have no archived projects. </Typography>
                    }
                    {projects.map((project) => (
                            <Card key={project.projectName} sx={{mb: 2, width: 550, height: 85, backgroundColor: project.projectStatus? project.projectStatus : '#A0A0A0' }} >
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={9.5}>
                                            <Box sx={{ display: 'flex'}}>
                                                <Typography variant='h6' color={(project.projectStatus === '#404040')? 'white' : '#303030'} sx={{ flexGrow: 1 }}> {project.projectName} </Typography>
                                            </Box>
                                            <Typography color={(project.projectStatus === '#404040')? 'white' : '#303030'} > Project ID: {project.projectID} </Typography>
                                            </Grid>
                                        <Grid item xs={1.25}>
                                            <IconButton key='delete-project-button' onClick={() => handleDeleteProject(project._id)} > 
                                                <DeleteIcon sx={{ color: (project.projectStatus === '#404040')? 'white' : '#303030' }} fontSize='large' /> 
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={1.25}>
                                            <IconButton key='view-project-button' component={Link} to={`/projects/view/archive/${project.projectID}`} > 
                                                <InfoIcon sx={{ color: (project.projectStatus === '#404040')? 'white' : '#303030' }} fontSize='large' /> 
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))}
                </Box>
            </ThemeProvider>
        </div>
    );
}

export default ArchivePage;