import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import FeverChart from '../../components/FeverChart'
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

    const [updateCurrentProject, updateProjectData] = useState({ projectID: id , projectName: '', projDescription: '', projectDateCreated:'', predictedCompletion:'',});
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
            <div key='chart-padding' style={{ paddingBottom: '10px', paddingTop: '10px', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
                <div key='chart-contain' style={{ position: 'absolute', width: '40vw', top:'150px', right:'50px' }}>
                    <FeverChart/>
                </div>
            </div>
            <Container sx={{ width: 700, ml: 25, mt: 10 }}>
                <form autoComplete='off' noValidate>
                    <Typography variant='h4'> Edit Project </Typography>
                    <TextField sx={{ mt: 3 }} id='new-name' variant='filled' label='New Project Name' fullWidth defaultValue={project[0].projectName} onChange={(e) => updateProjectData({...updateCurrentProject,  projectName: e.target.value })}/>
                    <TextField sx={{ mt: 3 }} id='new-description' variant='filled' label='New Project Description' fullWidth defaultValue={project[0].projDescription} onChange={(e) => updateProjectData({...updateCurrentProject,  projDescription: e.target.value })}/>
                    <Typography variant='h6' marginTop={3}> Edit time  </Typography>
                    <TextField sx={{ mt: 3 }} id='new-start-date' variant='filled' label='New Start Date' fullWidth defaultValue={project[0].projectDateCreated} onChange={(e) => updateProjectData({...updateCurrentProject,  projectDateCreated: e.target.value })}/>
                    <TextField sx={{ mt: 3 }} id='new-predicted-completion' variant='filled' label='New Date of Predict Completion' fullWidth defaultValue={project[0].predictedCompletion} onChange={(e) => updateProjectData({...updateCurrentProject,  predictedCompletion: e.target.value })}/>
                    
                    
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