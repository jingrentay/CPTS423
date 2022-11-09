import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ThemeProvider } from '@mui/material/styles'
import {Form } from 'react-bootstrap';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { createProject } from '../../features/projectSlice'
import { TimeScale } from 'chart.js';

const ProjectFormPage = () => {
    
    const setProjectID = () => {
        return 0
    } 

    const [newProject, setNewProject] = useState({ projectID: setProjectID(), projectName: '', projDescription: '', projDuration: '' });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createProject(newProject))
    };

    // need fields for
    //      - project name
    //      - project description
    //      - duration units (hours, minutes, days, weeks)
    // 
    //      - aggressive duration 
    //      - predicted completion 
    //      - add tasks 


    return (
        <>
            <ThemeProvider theme={theme}>
            <Navigation/>
            <Container sx={{ width: 700, ml: 25, mt: 10 }}>
                <Form autoComplete='off' noValidate>
                    <Typography variant='h5'> Create a Project </Typography>
                    <TextField sx={{ mt: 3 }} name='project name' variant='filled' label='Project Name' fullWidth value={newProject.projectName} onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}/>
                    <TextField sx={{ mt: 3 }}name='project description' variant='filled' label='Project Description' fullWidth value={newProject.projDescription} onChange={(e) => setNewProject({ ...newProject, projDescription: e.target.value })}/>
                    
                    <Typography variant='h6'> aggressive duration </Typography>
                    <Form.Control
                        type="date"
                        placeholder='aggressive time'
                        value={newProject.projDuration} onChange={(e) => setNewProject({ ...newProject, projDuration: e.target.value })}
                
                     />
                     <Typography variant='h6'> predicted completion </Typography>
                    <Form.Control
                        sx={{ width: 652, mt: 3 }}
                        type="date"
                        placeholder='aggressive time'
                
                     />
                   <FormControl sx={{ width: 652, mt: 3 }}>
                        <InputLabel id="timeUnitsLabel">Task Units</InputLabel>
                        <Select labelId="timeUnitsLabel" label="Time Units">
                            <MenuItem value=''><em>None</em></MenuItem>
                            <MenuItem value='Hours'>Hours</MenuItem>
                            <MenuItem value='Minutes'>Minutes</MenuItem>
                            <MenuItem value='Days'>Days</MenuItem>
                            <MenuItem value='Weeks'>Weeks</MenuItem>
                        </Select>
                    </FormControl>
                    
          
                    <Box sx={{ display: 'flex', mt: 3 }}>
                        <Typography variant='h6'> Add Tasks </Typography>
                        <Button sx={{ ml: 2 }} size="small" variant="contained" color="success" startIcon={<AddCircleOutlineIcon/>}> 
                            New Task 
                        </Button>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Button size="medium" variant="contained" onClick={handleSubmit}>
                            Create Project
                        </Button>
                        <Button component={Link} to="/projects" size="medium" variant="contained" sx={{ ml: 2 }}>
                            Back to Projects
                        </Button>
                    </Box>
                </Form>
            </Container>
            </ThemeProvider>
        </>
    );
}

export default ProjectFormPage;