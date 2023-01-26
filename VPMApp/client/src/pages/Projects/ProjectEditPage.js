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
import { getProject } from '../../features/projectSlice'
import { updateProject } from '../../features/projectSlice'

const ProjectEditPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const setTaskID = () => {
        return Math.floor(Math.random() * 20);
    }

    // For getting single project based on id 
    useEffect( () => {
        dispatch(getProject(id));
    }, [dispatch, id]);

    const { project, loadingOne } = useSelector((store) => store.projects)

    const [updatedProject, setUpdatedProject] = useState(project);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(updatedProject)
        dispatch(updateProject(updatedProject))
        navigate('/projects')
    };

    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteWarningOpen, setDeleteWarningOpen] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState('')


    const handleSaveNewTask = () => {
        updatedProject.tasks.push(newTask)
        setNewTask({ taskID: setTaskID(), taskName: '', taskDescription: '', taskDuration: 0})
        console.log(updatedProject.tasks)
        handleCloseTaskDialog()
    }

    const handleOpenTaskDialog = () => {
        setDialogOpen(true);
    }

    const handleCloseTaskDialog = () => {
        setDialogOpen(false);
    }

    const handleCloseDeleteDialog = () => {
        setDeleteWarningOpen(false);
        setTaskToDelete('')
    }

    const handleDeleteTask = () => {
        updateProject({...updatedProject, tasks: project.tasks.filter((task) => task.taskName !== taskToDelete)})
        handleCloseDeleteDialog()
    }

    const handleOpenDeleteDialog = (name) => {
        setTaskToDelete(name)
        setDeleteWarningOpen(true);
    }    

    const handleOpenInfoDialog = () => {
        setDialogOpen(true);
    }

    const [newTask, setNewTask] = useState({
        taskID: setTaskID(), 
        taskName: '', 
        taskDescription: '',
        taskDuration: 0,
        complete: false,
    });

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
                        <Select value={updatedProject.projectTimeUnits} labelId="timeUnitsLabel" label="Time Units" onChange={(e) => setUpdatedProject({ ...updatedProject, projectTimeUnits: e.target.value })}>
                            <MenuItem value={'Hours'}>Hours</MenuItem>
                            <MenuItem value={'Minutes'}>Minutes</MenuItem>
                            <MenuItem value={'Days'}>Days</MenuItem>
                            <MenuItem value={'Weeks'}>Weeks</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField sx={{ mt: 3 }} name='aggressive duration' variant='outlined' label='Aggressive Duration' fullWidth value={project.projectDuration} InputProps={{ readOnly: true }}/>
                    
                    <TextField sx={{ mt: 3 }} id='new-predicted-completion' variant='filled' label='Predicted Completion' InputProps={{ readOnly: true }} fullWidth defaultValue={new Date(project.predictedCompletion)} />
                    
                    <Box sx={{ display: 'flex', mt: 3, mb: 2 }}>
                        <Typography variant='h6'> Tasks </Typography>
                        <Button sx={{ ml: 2 }} size="small" variant="contained" color="success" startIcon={<AddCircleOutlineIcon/>} onClick={handleOpenTaskDialog}> 
                            New Task 
                        </Button>
                        <Dialog open={dialogOpen} onClose={handleCloseTaskDialog} >
                            <DialogTitle> Add Task </DialogTitle>
                            <DialogContent>
                                <TextField sx={{ mb: 2 }} name='task name' variant='filled' label='Task Name' fullWidth value={newTask.taskName} onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })} />
                                <TextField name='task description' variant='filled' multiline maxRows={4} label='Task Description' fullWidth value={newTask.taskDescription} onChange={(e) => setNewTask({ ...newTask, taskDescription: e.target.value })} />
                                <TextField sx={{ mt: 3 }} name='task aggressive duration' variant='outlined' label='Aggressive Duration' fullWidth value={newTask.taskDuration} onChange={(e) => setNewTask({ ...newTask, taskDuration: e.target.value })} />
                            </DialogContent>
                            <DialogActions>
                                <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button variant="contained" sx={{ mb: 2, width: 185, height: 40 }} onClick={handleSaveNewTask} > Save </Button>
                                    <Button variant="outlined" sx={{ mb: 2, ml: 2, width: 185, height: 40  }} onClick={handleCloseTaskDialog} > Cancel </Button>
                                 </Container>
                            </DialogActions>
                        </Dialog>
                    </Box>
                    {project.tasks.map((task) => (
                            <Card key={task.taskName} sx={{ mt: 3, width: 550, height: 90, backgroundColor: '#E0E0E0' }}>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={9.5}>
                                            <Box sx={{ display: 'flex' }}>
                                                <Typography variant='h6' sx={{ flexGrow: 1 }}> {task.taskName} </Typography>
                                            </Box>
                                            <Typography variant='subtitle1'> Task ID: {task.taskID} </Typography>
                                        </Grid>
                                        <Grid item xs={1.25}>
                                            <IconButton sx={{width:"50px"}} onClick={() => handleOpenDeleteDialog(task.taskName)} aria-label="delete" > 
                                                <DeleteIcon fontSize="large"/> 
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={1.25}>
                                            <IconButton sx={{width:"50px"}} onClick={() => handleOpenInfoDialog(task.taskName)}> 
                                                <InfoIcon fontSize="large"/ > 
                                            </IconButton>
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