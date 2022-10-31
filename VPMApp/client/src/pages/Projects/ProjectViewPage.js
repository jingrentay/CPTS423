import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ThemeProvider } from '@mui/material/styles'




import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { createProject } from '../../actions/projectActions'

const ProjectViewPage = () => {

    const [projectData, setProjectData] = useState({ projectName: '', projDescription: '', });
    const dispatch = useDispatch();

    return(
        <>
            <ThemeProvider theme={theme}></ThemeProvider>
            <Navigation key='nav' />
            <Container sx={{ width: 700, ml: 25, mt: 10 }}>
                <Typography variant='h5'> Project Details </Typography>
                
                <Typography variant='subtitle1' marginTop={5}> Project Name </Typography>
                <TextField sx={{ mt:1 }} name='project name'  inputProps={{readOnly:true,}} fullWidth='true' margin='dense' defaultValue={projectData.projectName} />
                
                <Typography variant='subtitle1' marginTop={3}> Project Description </Typography>
                <TextField sx={{ mt: 1 }}name='project description' inputProps={{readOnly:true,}} fullWidth='true' defaultValue={projectData.projDescription}/>

                <Typography variant='subtitle1' marginTop={3}> Current Tasks </Typography>
            </Container>
            <Box>
                <Button key='edit-project-button' component={Link} to="/projects/edit" size="medium" variant="contained" sx={{ ml: 28, mt: 15 }}>
                    Edit Project
                </Button>
                <Button key='edit-project-button' component={Link} to="/projects" size="medium" variant="contained" sx={{ ml: 3, mt: 15 }}>
                    Back to Projects
                </Button>
            </Box>

        </>
    );
}


export default ProjectViewPage;