import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Dialog, DialogContent, DialogTitle, Skeleton, Box, Button, Container, TextField, Typography, InputAdornment, IconButton, Grid, CardContent, Card } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getProject } from '../../features/projectSlice'
import FeverChart from '../../components/FeverChart'

const ViewArchiveProjectPage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const { project, loadingOne } = useSelector((store) => ({...store.projects}))

    // For getting single project based on id 
    useEffect( () => {
        dispatch(getProject(id));
    }, [dispatch, id]);

    // State for the info of tasks 
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);

    const [taskPopup, setTaskPopup] = useState({
        taskName: '', 
        taskDescription: '',
        taskID: 0,
        taskDuration: 0,
        taskCompletion: new Date(),
    })

    //Open and close for showing info/description of a created task
    const handleOpenTaskInfoDialog = (id) => {
        let task = project?.completedTasks.filter((task) => task.taskID === id)
        setTaskPopup({
            taskName: task[0].taskName,
            taskDescription: task[0].taskDescription,
            taskID: task[0].taskID,
            taskDuration: task[0].taskDuration,
            taskCompletion: task[0].taskCompletion,
            completedBy: task[0].completedBy,
        })
        setInfoDialogOpen(true);
    }

    const handleCloseTaskInfoDialog = () => {
        setInfoDialogOpen(false);
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
                { project.projectStage === 2 &&
                    <div>
                    <Button sx={{ mr: 3 }} key='back-project-button' component={Link} to="/archive" size="medium" variant="contained" >
                        Back
                    </Button>
                    </div>
                }
            </Box>
            <Container sx={{ width: 600, ml: 27, mb: 6 }}>
                {project.projectStage === 2 && 
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
                                })} 
                                labelData={project?.completedTasks.map((task) => task.taskName? task.taskName : "Null")}
                            />
                        </div>
                    </div>
                }
                <TextField sx={{ mt: 2 }} id="project-name" label="Name" variant="filled" defaultValue={project.projectName} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="project-id" label="ID" variant="filled" defaultValue={project.projectID} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="project-description" label="Description" variant="filled" defaultValue={project.projDescription} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="aggressive-duration" label="Aggressive Duration" variant="filled" defaultValue={project.projectDuration} InputLabelProps={{shrink: true}} InputProps={{ readOnly: true, endAdornment: (<InputAdornment sx={{ mr: 2, }} position='end'>{project.projectTimeUnits.toLowerCase()}</InputAdornment>) }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="date-created" label="Date Created" variant="filled" defaultValue={new Date(project.projectDateCreated)} InputLabelProps={{shrink: true}} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="start-date" label="Start Date" variant="filled" defaultValue={new Date(project.projectStartDate)} InputLabelProps={{shrink: true}} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="actual-completion" label="Date Completed" variant="filled" defaultValue={new Date(project.dateCompleted)} InputLabelProps={{shrink: true}} InputProps={{ readOnly: true }} fullWidth margin='dense' />                          
                {project.completedTasks.length !== 0 &&
                    <Typography variant='h6' sx={{ mt: 2, mb: 1 }}> Tasks </Typography>
                }
                {project.projectStage === 2 && project.completedTasks.map((task) => (
                    <Card key={task.taskID} sx={{ mb: 3, width: 550, height: 85, backgroundColor: task.taskStatus? task.taskStatus : '#C0C0C0' }}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={10.5}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography variant='h6' sx={{ flexGrow: 1 }}> {task.taskName} </Typography>
                                     </Box>
                                    <Typography variant='subtitle1'> Task ID: {task.taskID} </Typography>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <IconButton key='view-task-button'  onClick={() => handleOpenTaskInfoDialog(task.taskID)}> 
                                        <InfoIcon fontSize='large' /> 
                                    </IconButton>
                                    <Dialog open={infoDialogOpen} onClose={handleCloseTaskInfoDialog}>
                                        <DialogTitle>Task Details</DialogTitle>
                                        <DialogContent>
                                            <TextField sx={{ mb: 2 }} name='task name' variant='filled' label='Task Name' fullWidth defaultValue={taskPopup.taskName} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField sx={{ mb: 2 }} name='task id' variant='filled' label='Task ID' fullWidth defaultValue={taskPopup.taskID} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField sx={{ mb: 2 }} name='task description' variant='filled' multiline maxRows={4} label='Task Description' fullWidth value={taskPopup.taskDescription} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField sx={{ mb: 2 }} name='task aggressive duration' variant='filled' label='Aggressive Duration' fullWidth value={taskPopup.taskDuration} InputProps={{readOnly:true, endAdornment: (<InputAdornment sx={{ mr: 2, }} position='end'>{project.projectTimeUnits.toLowerCase()}</InputAdornment>)}} margin='dense'/>
                                            <TextField sx={{ mb: 2 }} name='task completed' variant='filled' label='Date Completed' fullWidth value={new Date(taskPopup.taskCompletion)} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField sx={{ mb: 2 }} name='completed-by' variant='filled' label='Completed By' fullWidth value={taskPopup.completedBy} InputProps={{readOnly:true}} margin='dense'/> 
                                        </DialogContent>
                                    </Dialog>
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

export default ViewArchiveProjectPage;