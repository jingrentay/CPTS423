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

    const [updateCurrentProject, updateProjectData] = useState({ projectID: id , projectName: '', projDescription: ''});
    const { project} = useSelector((store) => store.projects)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(updateCurrentProject)
        dispatch(updateProject(updateCurrentProject))
    };

    return(
        <>
            <ThemeProvider theme={theme}>
            <Navigation key='nav' />
            <Container sx={{ width: 700, ml: 25, mt: 10 }}>
                <form autoComplete='off' noValidate>
                    <Typography variant='h5'> Edit Project </Typography>
                    <TextField sx={{ mt: 3 }} id='project name' variant='filled' label='New Project Name' fullWidth defaultValue={project[0].projectName} onChange={(e) => updateProjectData({...updateCurrentProject,  projectName: e.target.value })}/>
                    <TextField sx={{ mt: 3 }} id='project description' variant='filled' label='New Project Description' fullWidth defaultValue={project[0].projDescription} onChange={(e) => updateProjectData({...updateCurrentProject,  projDescription: e.target.value })}/>
                    <Typography variant='h6' marginTop={3}> Edit time  </Typography>
                    
                    <Box sx={{ display: 'flex', mt: 3 }}>
                        <Typography variant='h6'> Add Tasks </Typography>
                        <Button sx={{ ml: 2 }} size="small" variant="contained" color="success" startIcon={<AddCircleOutlineIcon/>}> 
                            New Task 
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', mt: 3 }}>
                        <Typography variant='h6'> Remove Tasks </Typography>
                        <Button sx={{ ml: 2 }} size="small" variant="contained" color="success" startIcon={<AddCircleOutlineIcon/>}> 
                            Remove Task 
                        </Button>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Button type="submit" size="medium" variant="contained" onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button component={Link} to={`/projects/view/${project[0].projectID}`} size="medium" variant="contained" sx={{ ml: 2 }}>
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