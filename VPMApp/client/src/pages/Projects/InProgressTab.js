import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton, Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import MultiFeverChart from '../../components/MultiFeverChart'
import { getProgressProjects, deleteProject } from '../../features/projectSlice'

const InProgressTab = () => {

    const dispatch = useDispatch();

    const { projects, loadingAll, taskList } = useSelector((store) => store.projects)

    useEffect(() => {
        dispatch(getProgressProjects());
    }, [dispatch]);

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
        <>
        <ThemeProvider key='theme-provider' theme={theme} >
            <Navigation key='nav' />
            { projects.length === 0 &&
                <Typography sx={{ mt: 2 }} variant='h5'> You have no projects currently in progress. </Typography>
            }
            { projects.length > 0 && 
            <div key='chart-padding' style={{ paddingBottom: '10px', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div key='chart-contain' style={{ position: 'relative', width: '40vw' }}>
                    <MultiFeverChart 
                        plotData={projects?.map((project) => project.lastKnownCompletion? project.lastKnownCompletion : { x: 0, y: 0})} 
                        labelData={projects?.map((project) => project.projectName? project.projectName : "Null") }
                    />
                </div>
            </div>
            }
            <Box sx={{ flexGrow: 1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container spacing={1}>
                    <Grid container item spacing={6}>
                        <Grid item xs={1}/>
                        <Grid item xs={5}>
                            { projects.length > 0 && 
                                <Typography sx={{ mt: 2 }} variant='h5'> Projects </Typography>
                            }
                            {projects.map((project) => (
                                <Grid item>
                                <Card key={project.projectID} style={{display: 'flex', width: '100%'}} sx={{ mt: 2, height: 85, backgroundColor: project.projectStatus }}>
                                    <CardContent style={{display: 'flex', width: '100%'}}>
                                        <Grid container >
                                            <Grid item xs={9}>
                                                <Box sx={{ display: 'flex'}}>
                                                    <Typography variant='h6' sx={{ flexGrow: 1}}> {project.projectName} </Typography>
                                                </Box>
                                                <Typography> Project ID: {project.projectID} </Typography>
                                                </Grid>
                                            <Grid item xs={1.5}>
                                                <IconButton key='delete-project-button' onClick={() => handleDeleteProject(project._id)} > 
                                                    <DeleteIcon fontSize='large' /> 
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={1.5}>
                                                <IconButton key='view-project-button' component={Link} to={`/projects/view/progress/${project.projectID}`} > 
                                                    <InfoIcon fontSize='large' /> 
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={5}>
                            { taskList.length > 0 &&
                                <Typography sx={{ mt: 2 }} variant='h5'> Task Priority List </Typography>
                            }
                            {taskList.map((task) => (
                                <Grid item>
                                <Card key={task.taskID} style={{display: 'flex', width: '100%'}} sx={{ mt: 2, height: 85, backgroundColor: task.status }}>
                                    <CardContent style={{display: 'flex', width: '100%'}}>
                                        <Grid container >
                                            <Grid item xs={10}>
                                                <Box sx={{ display: 'flex'}}>
                                                    <Typography variant='h6' sx={{ flexGrow: 1}}> {task.taskName} </Typography>
                                                </Box>
                                                <Typography> Task ID: {task.taskID}, Project ID: {task.projectID} </Typography>
                                                </Grid>
                                            <Grid item xs={2}>
                                                <IconButton key='view-project-button' component={Link} to={`/projects/view/progress/${task.projectID}`} > 
                                                    <InfoIcon fontSize='large' /> 
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={1}/>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
        </>
    );
}

export default InProgressTab;