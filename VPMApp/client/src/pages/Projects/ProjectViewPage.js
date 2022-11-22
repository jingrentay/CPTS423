import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Skeleton, Box, Button, Container, TextField, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getProject } from '../../features/projectSlice'
import FeverChart from '../../components/FeverChart'

const ProjectViewPage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    console.log(id)

    // For getting single project based on id 
    useEffect( () => {
        dispatch(getProject(id));
    }, [dispatch, id]);

    const { project, loadingOne } = useSelector((store) => store.projects)

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
            <div key='chart-padding' style={{ paddingBottom: '10px', paddingTop: '10px', display: 'flex', alignItems: 'right', justifyContent: 'right' }}>
                <div key='chart-contain' style={{ position: 'absolute', width: '40vw', top:'200px', right:'100px' }}>
                    <FeverChart/>
                </div>
            </div>
            <Container sx={{ width: 600, ml: 25, mt: 10 }}>
                <Typography variant='h5'> Project Details </Typography>
                <TextField sx={{ mt: 2 }} id="project-id" label="ID" variant="filled" defaultValue={project[0].projectID} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 3 }} id="project-name" label="Name" variant="filled" defaultValue={project[0].projectName} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="project-description" label="Description" variant="filled" defaultValue={project[0].projDescription} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="manager-name" label="Manager Name" variant="filled" defaultValue={project[0].projectManager} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="start-date" label="Start Date" variant="filled" defaultValue={project[0].projectDateCreated} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="aggressive-duration" label="Date of Predicted Completion" variant="filled" defaultValue={project[0].predictedCompletion} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <Typography variant='subtitle1' marginTop={1}> Tasks </Typography>
            </Container>
            <Box>
                <Button key='edit-project-button' component={Link} to={`/projects/edit/${project[0].projectID}`} size="medium" variant="contained" sx={{ ml: 28, mt: 3 }}>
                    Edit
                </Button>
                <Button key='back-project-button' component={Link} to="/projects" size="medium" variant="contained" sx={{ ml: 3, mt: 3 }}>
                    Back
                </Button>
            </Box>
            </ThemeProvider>
        </>
    );
}

export default ProjectViewPage;