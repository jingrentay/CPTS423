import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Skeleton, TextField, Typography, IconButton, Card, Grid, CardContent, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getProject, updateProject } from '../../features/projectSlice'
import { getDate } from '../../utils.js';

const ProjectEditPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // Add the task durations for the aggressive duration 
    let taskDurations = []

    const { project, loadingOne } = useSelector((store) => ({...store.projects}))
    const [updatedProject, setUpdatedProject] = useState(project);

    // For getting single project based on id 
    useEffect( () => {
        dispatch(getProject(id));
    }, [dispatch, id]);

    useEffect( () => {
        setUpdatedProject(project)
    }, [project]);

    useEffect( () => {
        setUpdatedProject({...updatedProject, predictedCompletion: getDate( new Date(), updatedProject?.projectDuration, updatedProject?.projectTimeUnits, true)})
    }, [updatedProject]);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(updatedProject)
        dispatch(updateProject(updatedProject))
        navigate('/projects')
    };

    const setTaskID = () => {
        return Math.floor(Math.random() * 20);
    } 

    const [deleteWarningOpen, setDeleteWarningOpen] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState({name: '', duration: 0})
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false)

    const [taskPopup, setTaskPopup] = useState({
        taskName: '', 
        taskDescription: '',
        taskID: 0,
        taskDuration: 0,
        taskStatus: '',
        complete: false,
    })

    const [newTask, setNewTask] = useState({
        taskID: project.tasks.length, 
        taskName: '', 
        taskDescription: '',
        taskDuration: 0,
        complete: false,
        taskStatus: '#56AB2B',  // green,
    });

    // Open and close the dialog for deleting a task
    const handleOpenDeleteDialog = (name, duration) => {
        setTaskToDelete({name: name, duration: duration})
        setDeleteWarningOpen(true);
    }
    const handleCloseDeleteDialog = () => {
        setDeleteWarningOpen(false);
        console.log(updatedProject.tasks)
        setTaskToDelete('')
    }

     //Open and close for showing info/description of a created task
    const handleOpenTaskEditDialog = (id) => {
        let task = updatedProject?.tasks.filter((task) => task.taskID === id)
        setTaskPopup({
            taskName: task[0].taskName,
            taskDescription: task[0].taskDescription,
            taskID: task[0].taskID,
            taskDuration: task[0].taskDuration,
            complete: task[0].complete,
            taskStatus: task[0].taskStatus,
        })
        setInfoDialogOpen(true);
    }

    const handleCloseTaskEditDialog = () => {
        setInfoDialogOpen(false);
    }

     // Open and close the dialog for creating a new task
     const handleOpenNewTaskDialog = () => {
        setDialogOpen(true);
    }
    const handleCloseNewTaskDialog = () => {
        setNewTask({ taskID: newTask.taskID + 1, taskName: '', taskDescription: '', taskDuration: 0, complete: false, taskStatus: '#56AB2B' })
        setDialogOpen(false);
    }

    const handleDeleteTask = () => {
        setUpdatedProject({...updatedProject, tasks: updatedProject.tasks.filter((task) => task.taskName !== taskToDelete.name), numTasks: updatedProject.numTasks - 1, projectDuration: updatedProject.projectDuration - taskToDelete.duration })
        handleCloseDeleteDialog()
    }

    const handleSaveTask = async() => {
        setUpdatedProject({...updatedProject, tasks: await editTaskList()})
        handleCloseTaskEditDialog()
    }

    const editTaskList = async() => {
        var taskList =  updatedProject.tasks.filter((task) => task.taskID !== taskPopup.taskID)
        taskList.push(taskPopup)
        return taskList
    }

    // Handle the saving of a new task in the project, update the aggressive duration and predicted completion in the UI
    const handleSaveNewTask = () => {
        // calculate aggressive duration and predicted completion 
        updatedProject?.tasks?.forEach(element => { taskDurations?.push(parseInt(element.taskDuration)) })
        const totalTaskDuration = Number(taskDurations?.reduce((a, b) => a + b, 0)) + Number(newTask.taskDuration)
        let predCompletion = getDate( new Date(), totalTaskDuration, updatedProject?.projectTimeUnits, true)

        // update project 
        setUpdatedProject({...updatedProject, predictedCompletion: predCompletion, tasks: [...updatedProject.tasks, {...newTask}], projectDuration: totalTaskDuration, numTasks: updatedProject.numTasks + 1})
        setNewTask({ taskID: newTask.taskID + 1, taskName: '', taskDescription: '', taskDuration: 0, complete: false, taskStatus: '#56AB2B' })
        handleCloseNewTaskDialog()
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
            <Container sx={{ width: 600, ml: 25, mt: 10 }}>
                <form autoComplete='off' noValidate>
                    <Typography variant='h5'> Edit Project </Typography>
                    <TextField sx={{ mt: 3 }} id='new-name' variant='filled' label='Project Name' fullWidth defaultValue={project.projectName} onChange={(e) => setUpdatedProject({...updatedProject,  projectName: e.target.value })}/>
                    <TextField sx={{ mt: 3 }} id='new-description' variant='filled' label='Project Description' fullWidth defaultValue={project.projDescription} onChange={(e) => setUpdatedProject({...updatedProject,  projDescription: e.target.value })}/>
                    <FormControl sx={{ width: 550, mt: 3 }}>
                        <InputLabel id="timeUnitsLabel">Task Units</InputLabel>
                        <Select required value={updatedProject.projectTimeUnits? updatedProject.projectTimeUnits : ''} labelId="timeUnitsLabel" label="Time Units" onChange={(e) => setUpdatedProject({ ...updatedProject, projectTimeUnits: e.target.value })}>
                            <MenuItem value={'Hours'}>Hours</MenuItem>
                            <MenuItem value={'Minutes'}>Minutes</MenuItem>
                            <MenuItem value={'Days'}>Days</MenuItem>
                            <MenuItem value={'Weeks'}>Weeks</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField sx={{ mt: 3 }} name='aggressive duration' variant='outlined' label='Aggressive Duration' fullWidth value={updatedProject.projectDuration} InputProps={{ readOnly: true }}/>
                    <TextField sx={{ mt: 3 }} id='new-predicted-completion' variant='filled' label='Predicted Completion' InputProps={{ readOnly: true }} fullWidth defaultValue={new Date(updatedProject.predictedCompletion)} />
                    <Box sx={{ display: 'flex', mt: 3, mb: 2 }}>
                        <Typography variant='h6'> Tasks </Typography>
                        <Button sx={{ ml: 2 }} size="small" variant="contained" color="success" startIcon={<AddCircleOutlineIcon/>} onClick={handleOpenNewTaskDialog}> 
                            New Task 
                        </Button>
                        <Dialog open={dialogOpen} onClose={handleCloseNewTaskDialog} >
                            <DialogTitle> Add Task </DialogTitle>
                            <DialogContent>
                                <TextField sx={{ mb: 2 }} name='task name' variant='filled' label='Task Name' fullWidth value={newTask.taskName} onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })} />
                                <TextField name='task description' variant='filled' multiline maxRows={4} label='Task Description' fullWidth value={newTask.taskDescription} onChange={(e) => setNewTask({ ...newTask, taskDescription: e.target.value })} />
                                <TextField sx={{ mt: 3 }} name='task aggressive duration' variant='outlined' label='Aggressive Duration' fullWidth value={newTask.taskDuration} onChange={(e) => setNewTask({ ...newTask, taskDuration: e.target.value })} />
                            </DialogContent>
                            <DialogActions>
                                <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button variant="contained" sx={{ mb: 2, width: 185, height: 40 }} onClick={() => { handleSaveNewTask() }} > Save </Button>
                                    <Button variant="outlined" sx={{ mb: 2, ml: 2, width: 185, height: 40  }} onClick={handleCloseNewTaskDialog} > Cancel </Button>
                                 </Container>
                            </DialogActions>
                        </Dialog>
                    </Box>
                    {updatedProject?.tasks?.map((task) => (
                        <Card key={task.taskName} sx={{ mb: 3, width: 550, height: 85, backgroundColor: '#C0C0C0' }}>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={9.5}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography variant='h6' sx={{ flexGrow: 1 }}> {task.taskName} </Typography>
                                        </Box>
                                        <Typography variant='subtitle1'> Task ID: {task.taskID} </Typography>
                                    </Grid>
                                    <Grid item xs={1.25}>
                                            <IconButton sx={{width:"50px"}} onClick={() => handleOpenDeleteDialog(task.taskName, task.taskDuration)} aria-label="delete"> 
                                                <DeleteIcon fontSize="large"/> 
                                            </IconButton>
                                    </Grid>
                                    <Grid item xs={1.25}>
                                        <IconButton sx={{width:"50px"}} onClick={() => handleOpenTaskEditDialog(task.taskID)}> 
                                            <InfoIcon fontSize='large' /> 
                                        </IconButton>
                                        <Dialog open={infoDialogOpen} onClose={handleCloseTaskEditDialog}>
                                        <DialogTitle>Edit Task</DialogTitle>
                                        <DialogContent>
                                            <TextField sx={{ mb: 2 }} name='task name' variant='filled' label='Task Name' fullWidth defaultValue={taskPopup.taskName} onChange={(e) => setTaskPopup({...taskPopup, taskName: e.target.value })}/>
                                            <TextField sx={{ mb: 2 }} name='task id' variant='filled' label='Task ID' fullWidth defaultValue={taskPopup.taskID} InputProps={{readOnly:true}} margin='dense'/>
                                            <TextField name='task description' variant='filled' multiline maxRows={4} label='Task Description' fullWidth defaultValue={taskPopup.taskDescription} onChange={(e) => setTaskPopup({...taskPopup,  taskDescription: e.target.value })}/>
                                            <TextField sx={{ mt: 3, mb: 3 }} name='task aggressive duration' variant='filled' label='Aggressive Duration' fullWidth defaultValue={taskPopup.taskDuration} InputLabelProps={{ shrink: true }} onChange={(e) => setTaskPopup({...taskPopup, taskDuration: e.target.value })} margin='dense'/>
                                            <Button variant="contained" sx={{ mb: 1, width: 100, height: 35 }} onClick={handleSaveTask} > Save </Button>
                                            <Button variant="outlined" sx={{ mb: 1, ml: 2, width: 100, height: 35 }} onClick={handleCloseTaskEditDialog} > Cancel </Button>
                                        </DialogContent>
                                        </Dialog> 
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                    <Dialog open={deleteWarningOpen} onClose={handleCloseDeleteDialog} >
                            <DialogTitle> Are you sure you want to delete this task? </DialogTitle>
                            <DialogActions>
                                <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button variant="contained" sx={{ mb: 1, width: 100, height: 35 }} onClick={handleDeleteTask} > Yes </Button>
                                    <Button variant="outlined" sx={{ mb: 1, ml: 2, width: 100, height: 35 }} onClick={handleCloseDeleteDialog} > No </Button>
                                 </Container>
                            </DialogActions>
                    </Dialog>
                    <Box sx={{ mt: 3, mb: 8 }}>
                        <Button type="submit" size="medium" variant="contained" onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button component={Link} to={`/projects/view/planning/${project.projectID}`} size="medium" variant="outlined" sx={{ ml: 2 }}>
                            Back to View 
                        </Button>
                    </Box>
                </form>
            </Container>
            </ThemeProvider>
        </>
            
    
    );
}

export default ProjectEditPage;