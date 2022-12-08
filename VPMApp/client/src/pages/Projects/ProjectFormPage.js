import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Button, Container, Dialog, DialogContent, DialogTitle, DialogActions, FormControl, InputLabel, MenuItem, Select, TextField, Typography, IconButton, Grid, Card, CardContent } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ThemeProvider } from '@mui/material/styles'
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { createProject } from '../../features/projectSlice'

const ProjectFormPage = () => {
    
    const setProjectID = () => {
        return 0
    } 

    const setTaskID = () => {
        return 0
    } 

    const [dialogOpen, setDialogOpen] = useState(false)
    const [deleteWarningOpen, setDeleteWarningOpen] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState('')

    const [newProject, setNewProject] = useState({ 
        projectID: setProjectID(), 
        projectName: '', 
        projDescription: '', 
        projectDuration: 0,
        projectTimeUnits: '',
        predictedCompletion: new Date(),
        projectStage: 0,   // in planning
        tasks: [], 
        chartData: [ { x: 0, y: 0 } ]
    });

    const [newTask, setNewTask] = useState({
        taskID: setTaskID(), 
        taskName: '', 
        taskDescription: '',
        taskDuration: 0,
        complete: false,
    });
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createProject(newProject))
        navigate('/projects');
    };

    const handleOpenTaskDialog = () => {
        setDialogOpen(true);
    }

    const handleCloseTaskDialog = () => {
        setDialogOpen(false);
    }

    const handleOpenDeleteDialog = (name) => {
        setTaskToDelete(name)
        setDeleteWarningOpen(true);
    }

    const handleCloseDeleteDialog = () => {
        setDeleteWarningOpen(false);
        setTaskToDelete('')
    }

    const handleSaveNewTask = () => {
        newProject.tasks.push(newTask)
        setNewTask({ taskID: setTaskID(), taskName: '', taskDescription: '', taskDuration: 0})
        console.log(newProject.tasks)
        handleCloseTaskDialog()
    }

    const handleDeleteTask = () => {
        setNewProject({...newProject, tasks: newProject.tasks.filter((task) => task.taskName !== taskToDelete)})
        handleCloseDeleteDialog()
    }

    return (
        <>
            <ThemeProvider theme={theme}>
            <Navigation/>
            <Container sx={{ width: 700, ml: 25, mt: 10 }}>
                <Box component="form" autoComplete='off' noValidate>
                    <Typography variant='h5'> Create a Project </Typography>
                    <TextField sx={{ mt: 3 }} name='project name' variant='filled' label='Project Name' fullWidth value={newProject.projectName} onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}/>
                    <TextField sx={{ mt: 3 }} name='project description' multiline maxRows={4} variant='filled' label='Project Description' fullWidth value={newProject.projDescription} onChange={(e) => setNewProject({ ...newProject, projDescription: e.target.value })}/>
                    <FormControl sx={{ width: 652, mt: 3 }}>
                        <InputLabel id="timeUnitsLabel">Task Units</InputLabel>
                        <Select value={newProject.projectTimeUnits} labelId="timeUnitsLabel" label="Time Units" onChange={(e) => setNewProject({ ...newProject, projectTimeUnits: e.target.value })}>
                            <MenuItem value={'Hours'}>Hours</MenuItem>
                            <MenuItem value={'Minutes'}>Minutes</MenuItem>
                            <MenuItem value={'Days'}>Days</MenuItem>
                            <MenuItem value={'Weeks'}>Weeks</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField sx={{ mt: 3 }} name='aggressive duration' variant='outlined' label='Aggressive Duration' fullWidth value={newProject.projectDuration} InputProps={{ readOnly: true }} />
                    <TextField sx={{ mt: 3 }} name='predicted completion' variant='outlined' label='Predicted Completion' fullWidth value={newProject.predictedCompletion} InputProps={{ readOnly: true }} />
                    <Box sx={{ display: 'flex', mt: 3 }}>
                        <Typography variant='h6'> Add Tasks </Typography>
                        <Button sx={{ ml: 2, width: 130, height: 35 }} size="small" variant="contained" color="success" startIcon={<AddCircleOutlineIcon />} onClick={handleOpenTaskDialog}> 
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
                    {newProject.tasks.map((task) => (
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
                                            <IconButton sx={{width:"50px"}} > 
                                                <InfoIcon fontSize="large"/> 
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
                        <Button size="medium" variant="contained" onClick={handleSubmit} sx={{ width: 180, height: 40 }}>
                            Create Project
                        </Button>
                        <Button component={Link} to="/projects" size="medium" variant="outlined" sx={{ ml: 2, width: 190, height: 40 }}>
                            Back to Projects
                        </Button>
                    </Box>
                </Box>
            </Container>
            </ThemeProvider>
        </>
    );
}

export default ProjectFormPage;