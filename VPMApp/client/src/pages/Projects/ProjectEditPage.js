import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getProject } from '../../features/projectSlice'
import { updateProject } from '../../features/projectSlice'

const ProjectEditPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    console.log(id)


    // For getting single project based on id 
    useEffect( () => {
        dispatch(getProject(id));
    }, [dispatch, id]);

    const [updatedProject, setUpdatedProject] = useState({ 
        projectID: id, 
        projectName: '', 
        projDescription: '',
        projectTimeUnits: '',
    });

    const { project } = useSelector((store) => store.projects)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(updatedProject)
        dispatch(updateProject(updatedProject))
    };
    return(
        <>
            <ThemeProvider theme={theme}>
            <Navigation key='nav' />
            <Container sx={{ width: 700, ml: 25, mt: 10 }}>
                <form autoComplete='off' noValidate>
                    <Typography variant='h5'> Edit Project </Typography>
                    <TextField sx={{ mt: 3 }} id='new-name' variant='filled' label='Project Name' fullWidth defaultValue={project.projectName} onChange={(e) => setUpdatedProject({...updatedProject,  projectName: e.target.value })}/>
                    <TextField sx={{ mt: 3 }} id='new-description' variant='filled' label='Project Description' fullWidth defaultValue={project.projDescription} onChange={(e) => setUpdatedProject({...updatedProject,  projDescription: e.target.value })}/>
                    <FormControl sx={{ width: 652, mt: 3 }}>
                        <InputLabel id="timeUnitsLabel">Task Units</InputLabel>
                        <Select value={updatedProject.projectTimeUnits} labelId="timeUnitsLabel" label="Time Units" onChange={(e) => setUpdatedProject({ ...updatedProject, projectTimeUnits: e.target.value })}>
                            <MenuItem value={'Hours'}>Hours</MenuItem>
                            <MenuItem value={'Minutes'}>Minutes</MenuItem>
                            <MenuItem value={'Days'}>Days</MenuItem>
                            <MenuItem value={'Weeks'}>Weeks</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField sx={{ mt: 3 }} name='aggressive duration' variant='outlined' label='Aggressive Duration' fullWidth value={project.projectDuration} InputProps={{ readOnly: true }}/>
                    
                    <TextField sx={{ mt: 3 }} id='new-predicted-completion' variant='filled' label='Predicted Completion' InputProps={{ readOnly: true }} fullWidth defaultValue={project.predictedCompletion} />
                    
                    <Box sx={{ display: 'flex', mt: 3 }}>
                        <Typography variant='h6'> Tasks </Typography>
                        <Button sx={{ ml: 2 }} size="small" variant="contained" color="success" startIcon={<AddCircleOutlineIcon/>}> 
                            New Task 
                        </Button>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Button type="submit" size="medium" variant="contained" onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button component={Link} to={`/projects/view/${project.projectID}`} size="medium" variant="outlined" sx={{ ml: 2 }}>
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