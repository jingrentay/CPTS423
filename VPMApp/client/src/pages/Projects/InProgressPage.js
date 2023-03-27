import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputAdornment, Breadcrumbs, Chip, Skeleton, Grid, Card, CardContent, Typography, IconButton, Box, TextField, Dialog, DialogTitle, DialogContent, Divider } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import MultiFeverChart from '../../components/MultiFeverChart'
import { getProgressProjects, deleteProject } from '../../features/projectSlice'

const InProgressPage = () => {

    const dispatch = useDispatch();

    const { projects, loadingAll, taskList } = useSelector((store) => ({...store.projects}))
    // eslint-disable-next-line
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem('profile')).result)

    useEffect(() => {
        dispatch(getProgressProjects(account.currOrganization));
    }, [dispatch, account]);

    const handleDeleteProject = (id) => {
        dispatch(deleteProject(id))
    }

    const [infoDialogOpen, setInfoDialogOpen] = useState(false);

    const [taskPopup, setTaskPopup] = useState({
        taskName: '', 
        taskDescription: '',
        taskID: 0,
        taskDuration: 0,
        projectTimeUnits: '',
    })

    const handleOpenTaskInfoDialog = (id, projID) => {
        let task = taskList?.filter((task) => task.taskID === id && task.projectID === projID)
        let project = projects?.filter((proj) => proj.projectID === projID)
        setTaskPopup({
            taskName: task[0].taskName,
            taskDescription: task[0].taskDescription,
            taskID: task[0].taskID,
            taskDuration: task[0].taskDuration,
            projectID: task[0].projectID,
            projectTimeUnits: project[0].projectTimeUnits,
        })
        setInfoDialogOpen(true);
    }

    const handleCloseTaskInfoDialog = () => {
        setInfoDialogOpen(false);
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
            <Box sx={{ mt: 11, ml: 30 }}>
                    <Box sx={{ display: 'flex', mb: 5 }}>
                        <Breadcrumbs sx={{ flexGrow: 1 }} separator={<NavigateNextIcon fontSize="medium" />}>
                            <Typography fontSize='25px' underline='hover' color='secondary'> Projects </Typography>
                            <Typography fontSize='25px' color='secondary' noWrap sx={{ flexGrow: 1 }}> In Progress </Typography> 
                            <Chip label={'Organization: ' + account.currOrganization} />
                        </Breadcrumbs>
                    </Box>
                { projects.length === 0 &&
                    <Typography sx={{ mt: 2 }} variant='h6'> You have no projects currently in progress. </Typography>
                }
                { projects.length > 0 && 
                <div key='chart-padding' style={{ paddingBottom: '10px', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div key='chart-contain' style={{ position: 'relative', width: '40vw' }}>
                        <MultiFeverChart 
                            plotData={projects?.map((project) => {
                                if (project.lastKnownCompletion) {
                                    if (project.lastKnownCompletion.y > 100) {
                                        return {x: project.lastKnownCompletion.x, y: 100}
                                    }
                                    if (project.lastKnownCompletion.y < 0) {
                                        return {x: project.lastKnownCompletion.x, y: 0}
                                    }
                                    return project.lastKnownCompletion
                                }
                                return { x: 0, y: 0}
                            })} 
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
                                    <Grid key={project._id} item>
                                    <Card key={project._id} style={{display: 'flex', width: '100%', maxWidth: 500}} sx={{ mt: 2, height: 85, backgroundColor: project.projectStatus }}>
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
                            <Grid item xs={0.5}>
                                { projects.length > 0 && 
                                    <Divider orientation='vertical' sx={{mt:4}}/>
                                }
                            </Grid>
                            <Grid item xs={5}>
                                { taskList.length > 0 &&
                                    <Typography sx={{ mt: 2 }} variant='h5'> Task Priority List </Typography>
                                }
                                {taskList.map((task) => (
                                    <Grid key={task.taskID} item>
                                    <Card key={task.taskID} style={{display: 'flex', width: '100%', maxWidth: 500}} sx={{ mt: 2, height: 85, backgroundColor: task.status }}>
                                        <CardContent style={{display: 'flex', width: '100%'}}>
                                            <Grid container >
                                                <Grid item xs={10}>
                                                    <Box sx={{ display: 'flex'}}>
                                                        <Typography variant='h6' sx={{ flexGrow: 1}}> {task.taskName} </Typography>
                                                    </Box>
                                                    <Typography> Project ID: {task.projectID}, Task ID: {task.taskID} </Typography>
                                                    </Grid>
                                                <Grid item xs={2}>
                                                    <IconButton key='view-project-button' onClick={() => handleOpenTaskInfoDialog(task.taskID, task.projectID)} > 
                                                        <InfoIcon fontSize='large' /> 
                                                    </IconButton>
                                                    <Dialog open={infoDialogOpen} onClose={handleCloseTaskInfoDialog}>
                                                        <DialogTitle>Task Details</DialogTitle>
                                                        <DialogContent>
                                                            <TextField sx={{ mb: 2 }} name='task name' variant='filled' label='Task Name' fullWidth defaultValue={taskPopup.taskName} InputProps={{readOnly:true}} margin='dense'/>
                                                            <TextField sx={{ mb: 2 }} name='project name' variant='filled' label='Project ID' fullWidth defaultValue={taskPopup.projectID} InputProps={{readOnly:true}} margin='dense'/>
                                                            <TextField sx={{ mb: 2 }} name='task name' variant='filled' label='Task ID' fullWidth defaultValue={taskPopup.taskID} InputProps={{readOnly:true}} margin='dense'/>
                                                            <TextField name='task description' variant='filled' multiline maxRows={4} label='Task Description' fullWidth value={taskPopup.taskDescription} InputProps={{ readOnly: true }} margin='dense'/>
                                                            <TextField sx={{ mt: 3 }} name='task aggressive duration' variant='filled' label='Aggressive Duration' fullWidth value={taskPopup.taskDuration} InputProps={{ readOnly: true, endAdornment: (<InputAdornment sx={{ mr: 2, }} position='end'>{taskPopup.projectTimeUnits.toLowerCase()}</InputAdornment>)}} margin='dense'/>
                                                        </DialogContent>
                                                    </Dialog>
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
            </Box>
        </ThemeProvider>
        </>
    );
}

export default InProgressPage;