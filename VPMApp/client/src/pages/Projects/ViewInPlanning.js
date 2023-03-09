import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Skeleton, Box, Button, Container, TextField, Typography, InputAdornment, IconButton, Grid, CardContent, Card, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getProject, updateProject, createProject } from '../../features/projectSlice'
import { getDate } from '../../utils.js'

const ViewInPlanningPage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // For getting single project based on id 
    useEffect( () => {
        dispatch(getProject(id));
    }, [dispatch, id]);

    // State for current "in planning" project viewed
    const { project, loadingOne } = useSelector((store) => ({...store.projects}))

    // Display the correct predicted completion 
    let predCompletion = getDate( new Date(), project?.projectDuration, project?.projectTimeUnits, true)

    // State for the info of tasks 
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

    const handleCloseTaskInfoDialog = () => {
        setInfoDialogOpen(false);
    }
    
    // Handle the start of a project when user clicks button 
    const handleStartProject = () => {
        const editedProject = {
            ...project, 
            projectStage: 1, 
            projectStartDate: new Date(),
            predictedCompletion: getDate( new Date(), project?.projectDuration, project?.projectTimeUnits, true) 
        }
        dispatch(updateProject(editedProject))
        navigate('/projects');
    }

    // Render UI
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

    const handleDuplicateProject = () => {
        const reqData = {
            projectID: project?.projectID + 100, 
            projectName: project?.projectName + " (Duplicate)", 
            projDescription: project?.projectDescription, 
            projectDuration: project?.projectDuration,
            projectTimeUnits: project?.projectTimeUnits,
            predictedCompletion: project?.predictedCompletion,
            projectStage: project?.projectStage,   // in planning
            tasks: project?.tasks, 
            chartData: project?.chartData,
            lastKnownCompletion: project?.lastKnownCompletion,
            completedTasks: project?.completedTasks,
            numTasks: project?.numTasks, 
            projectStatus: project?.projectStatus,  // green
            projectDateCreated: project?.projectDateCreated
        }
        dispatch(createProject(reqData))
        navigate('/projects');
    }

    return(
        <>
            <ThemeProvider theme={theme}>
            <Navigation key='nav' />
            <Box sx={{ mt: 11, ml: 30, display: 'flex' }}>
                <Typography variant='h5' noWrap sx={{ flexGrow: 1 }}> Project Details </Typography> 
                <Button onClick={() => handleDuplicateProject()} size="medium" variant="contained" sx={{ backgroundColor: '#fca72f', mr: 2 }}> 
                    Duplicate 
                </Button>
                <Button onClick={() => handleStartProject()} size="medium" variant="contained" sx={{ backgroundColor: "#689f38", mr: 2 }}> 
                    Start 
                </Button>
                <Button sx={{ mr: 2 }} key='edit-project-button' component={Link} to={`/projects/edit/${project.projectID}`} size="medium" variant="contained" >
                    Edit
                </Button>
                <Button sx={{ mr: 3 }} key='back-project-button' component={Link} to="/projects" size="medium" variant="contained" >
                    Back
                </Button>  
            </Box>
            <Container sx={{ width: 600, ml: 27, mb: 6 }}>
                <TextField sx={{ mt: 2 }} id="project-name" label="Name" variant="filled" defaultValue={project.projectName} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="project-id" label="ID" variant="filled" defaultValue={project.projectID} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="project-description" label="Description" variant="filled" defaultValue={project.projDescription} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="aggressive-duration" label="Aggressive Duration" variant="filled" defaultValue={project.projectDuration} InputProps={{ readOnly: true, endAdornment: (<InputAdornment sx={{ mr: 2, }} position='end'>{project.projectTimeUnits.toLowerCase()}</InputAdornment>) }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="predicted-completion" label="Predicted Completion" variant="filled" defaultValue={new Date(predCompletion)} InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} fullWidth margin='dense' />
                {project.tasks.length !== 0 &&
                    <Typography variant='h6' sx={{ mt: 2, mb: 1 }}> Tasks </Typography>
                } 
                {project.projectStage === 0 && project.tasks.map((task) => (
                    <Card key={task.taskID} sx={{ mb: 3, width: 550, height: 85, backgroundColor: '#C0C0C0' }}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={10.75}>
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
                                        <DialogTitle>Task Details</DialogTitle>
                                        <DialogContent>
                                            <TextField sx={{ mb: 2 }} name='task name' variant='filled' label='Task Name' fullWidth defaultValue={taskPopup.taskName} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField sx={{ mb: 2 }} name='task id' variant='filled' label='Task ID' fullWidth defaultValue={taskPopup.taskID} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField name='task description' variant='filled' multiline maxRows={4} label='Task Description' fullWidth value={taskPopup.taskDescription} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField sx={{ mt: 3 }} name='task aggressive duration' variant='filled' label='Aggressive Duration' fullWidth value={taskPopup.taskDuration} InputProps={{readOnly:true, endAdornment: (<InputAdornment sx={{ mr: 2, }} position='end'>{project.projectTimeUnits.toLowerCase()}</InputAdornment>)}} margin='dense'/>
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

export default ViewInPlanningPage;