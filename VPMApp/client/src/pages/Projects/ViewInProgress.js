import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Dialog, DialogActions, DialogTitle, DialogContent, Skeleton, Box, Button, Container, TextField, Typography, InputAdornment, IconButton, Grid, CardContent, Card } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getProject, completeTask } from '../../features/projectSlice'
import FeverChart from '../../components/FeverChart'

const ViewInProgressPage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { project, loadingOne } = useSelector((store) => ({...store.projects}))

    const [dialogOpen, setDialogOpen] = useState(false)

    // For getting single project based on id 
    useEffect( () => {
        dispatch(getProject(id));
    }, [dispatch, id, dialogOpen]);

    const [infoDialogOpen, setInfoDialogOpen] = useState(false);

    const [taskPopup, setTaskPopup] = useState({
        taskName: '', 
        taskDescription: '',
        taskID: 0,
        taskDuration: 0,
    })

    //Open and close for showing info/description of a created task
    const handleOpenTaskInfoDialog = (id) => {
        let task = project?.tasks.filter((task) => task.taskID === id)
        console.log(task)
        setTaskPopup({
            taskName: task[0].taskName,
            taskDescription: task[0].taskDescription,
            taskID: task[0].taskID,
            taskDuration: task[0].taskDuration,
        })
        setInfoDialogOpen(true);
    }

    const handleOpenCompletedTaskInfoDialog = (id) => {
        let task = project?.completedTasks.filter((task) => task.taskID === id)
        console.log(task)
        setTaskPopup({
            taskName: task[0].taskName,
            taskDescription: task[0].taskDescription,
            taskID: task[0].taskID,
            taskDuration: task[0].taskDuration,
        })
        setInfoDialogOpen(true);
    }

    const handleCloseTaskInfoDialog = () => {
        setInfoDialogOpen(false);
    }

    const handleCompleteTask = (task) => {
        // record the new date and get the start date
        var startDate = moment(project.projectStartDate)
        var currentDate = moment().utcOffset('+8:00')
        var timeDifference = currentDate.diff(startDate, project.projectTimeUnits.toLowerCase(), true)
        console.log('diff', timeDifference)

        // complete the task and update project with new data
        dispatch(completeTask({project, task, timeDifference}))
        handleOpenTaskDialog()

        if (project.completedTasks.length + 1 === project.numTasks) {
            navigate('/archive')
            alert('Project moved to archive.')
        }
    }

    // Open and close the dialog for completing a task
    const handleOpenTaskDialog = () => {
        setDialogOpen(true);
    }
    const handleCloseTaskDialog = () => {
        setDialogOpen(false);
    }

    if (loadingOne) {
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

    return(
        <>
            <ThemeProvider theme={theme}>
            <Navigation key='nav' />
            <Box sx={{ mt: 11, ml: 30, display: 'flex' }}>
                <Typography variant='h5' noWrap sx={{ flexGrow: 1 }}> Project Details </Typography> 
                    <Button sx={{ mr: 3 }} key='back-project-button' component={Link} to="/projects" size="medium" variant="contained" >
                        Back
                    </Button>
            </Box>
            <Container sx={{ width: 600, ml: 27, mb: 6 }}>
                {project.projectStage === 1 && 
                    <div key='chart-padding' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div key='chart-contain' style={{ position: 'relative', width: '40vw' }}>
                            <FeverChart 
                                plotData={project.chartData.map((point) => {
                                    if (point.y > 100) { 
                                        return {x: point.x, y: 100} 
                                    } 
                                    if (point.y < 0) { 
                                        return {x: point.x, y: 0} 
                                    } 
                                    return point 
                                })} labelData={project?.completedTasks.map((task) => task.taskName? task.taskName : "Null")}
                            />
                        </div>
                    </div>
                }
                <TextField sx={{ mt: 2 }} id="project-name" label="Name" variant="filled" defaultValue={project.projectName} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="project-id" label="ID" variant="filled" defaultValue={project.projectID} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="project-description" label="Description" variant="filled" defaultValue={project.projDescription} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="aggressive-duration" label="Aggressive Duration" variant="filled" defaultValue={project.projectDuration} InputLabelProps={{shrink: true}} InputProps={{ readOnly: true, endAdornment: (<InputAdornment sx={{ mr: 2, }} position='end'>{project.projectTimeUnits.toLowerCase()}</InputAdornment>) }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="predicted-completion" label="Predicted Completion" variant="filled" defaultValue={new Date(project.predictedCompletion)} InputLabelProps={{shrink: true}} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                {project.tasks.length !== 0 &&
                    <Typography variant='h6' sx={{ mt: 2, mb: 1 }}> Incomplete Tasks </Typography>
                }
                {project.projectStage === 1 && project.tasks.map((task) => (
                    <Card key={task.taskName} sx={{ mb: 3, width: 550, height: 85, backgroundColor: project.projectStatus? project.projectStatus : '#C0C0C0' }}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={9.5}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography variant='h6' sx={{ flexGrow: 1 }}> {task.taskName} </Typography>
                                     </Box>
                                    <Typography variant='subtitle1'> Task ID: {task.taskID} </Typography>
                                </Grid>
                                <Grid item xs={1.25}>
                                    <IconButton key='view-task-button' onClick={() => handleOpenTaskInfoDialog(task.taskID)}> 
                                        <InfoIcon fontSize='large' /> 
                                    </IconButton>
                                    <Dialog open={infoDialogOpen} onClose={handleCloseTaskInfoDialog}>
                                        <DialogTitle>Task Info</DialogTitle>
                                        <DialogContent>
                                            <TextField sx={{ mb: 2 }} name='task name' variant='filled' label='Task Name' fullWidth defaultValue={taskPopup.taskName} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField sx={{ mb: 2 }} name='task id' variant='filled' label='Task ID' fullWidth defaultValue={taskPopup.taskID} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField name='task description' variant='filled' multiline maxRows={4} label='Task Description' fullWidth value={taskPopup.taskDescription} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField sx={{ mt: 3 }} name='task aggressive duration' variant='filled' label='Aggressive Duration' fullWidth value={taskPopup.taskDuration} InputProps={{readOnly:true, endAdornment: (<InputAdornment sx={{ mr: 2, }} position='end'>{project.projectTimeUnits.toLowerCase()}</InputAdornment>)}} margin='dense'/>
                                        </DialogContent>
                                    </Dialog>
                                </Grid>
                                <Grid item xs={1.25}>
                                    <IconButton key='complete-task' onClick={() => { handleCompleteTask(task)}}> 
                                        <CheckIcon fontSize='large' /> 
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}   
                {project.completedTasks.length !== 0 &&
                    <Typography variant='h6' sx={{ mt: 2, mb: 1 }}> Complete Tasks </Typography>
                }
                {project.projectStage === 1 && project.completedTasks.map((task) => (
                    <Card key={task.taskName} sx={{ mb: 3, width: 550, height: 85, backgroundColor: task.taskStatus? task.taskStatus : '#C0C0C0' }}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={10.5}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography variant='h6' sx={{ flexGrow: 1 }}> {task.taskName} </Typography>
                                     </Box>
                                    <Typography variant='subtitle1'> Task ID: {task.taskID} </Typography>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <IconButton key='view-task-button' onClick={() => handleOpenCompletedTaskInfoDialog(task.taskID)}> 
                                        <InfoIcon fontSize='large' /> 
                                    </IconButton>
                                    <Dialog open={infoDialogOpen} onClose={handleCloseTaskInfoDialog}>
                                        <DialogTitle>Task Details</DialogTitle>
                                        <DialogContent>
                                            <TextField sx={{ mb: 2 }} name='task name' variant='filled' label='Task ID' fullWidth defaultValue={taskPopup.taskID} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField sx={{ mb: 2 }} name='task name' variant='filled' label='Task Name' fullWidth defaultValue={taskPopup.taskName} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField name='task description' variant='filled' multiline maxRows={4} label='Task Description' fullWidth value={taskPopup.taskDescription} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField sx={{ mt: 3 }} name='task aggressive duration' variant='filled' label='Aggressive Duration' fullWidth value={taskPopup.taskDuration} InputProps={{readOnly:true}} margin='dense'/>
                                        </DialogContent>
                                    </Dialog>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}   
                    <Dialog open={dialogOpen} onClose={handleCloseTaskDialog} >
                        <DialogTitle> Task marked as complete. </DialogTitle>
                        <DialogActions>
                            <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button variant="contained" sx={{ mb: 1, width: 100, height: 35 }} onClick={handleCloseTaskDialog} > Close </Button>
                            </Container>
                        </DialogActions>
                    </Dialog>   
            </Container>
            </ThemeProvider>
        </>
    );
}

export default ViewInProgressPage;