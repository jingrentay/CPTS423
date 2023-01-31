import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Skeleton, Box, Button, Container, TextField, Typography, InputAdornment, IconButton, Grid, CardContent, Card } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getProject, updateProject } from '../../features/projectSlice'
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
    const { project, loadingOne } = useSelector((store) => store.projects)

    // Display the correct predicted completion 
    let predCompletion = getDate(project?.projectDuration, project?.projectTimeUnits)
    
    // Handle the start of a project when user clicks button 
    const handleStartProject = () => {
        const editedProject = {
            ...project, 
            projectStage: 1, 
            projectStartDate: new Date(),
            predictedCompletion: getDate(project?.projectDuration, project?.projectTimeUnits) 
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

    return(
        <>
            <ThemeProvider theme={theme}>
            <Navigation key='nav' />
            <Box sx={{ mt: 11, ml: 30, display: 'flex' }}>
                <Typography variant='h5' noWrap sx={{ flexGrow: 1 }}> Project Details </Typography> 
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
                <TextField sx={{ mt: 2 }} id="aggressive-duration" disabled label="Aggressive Duration" variant="filled" defaultValue={project.projectDuration} InputProps={{ readOnly: true, endAdornment: (<InputAdornment sx={{ mr: 2, }} position='end'>{project.projectTimeUnits.toLowerCase()}</InputAdornment>) }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="predicted-completion" label="Predicted Completion" variant="filled" defaultValue={new Date(predCompletion)} disabled InputLabelProps={{ shrink: true }} fullWidth margin='dense' />
                {project.tasks.length !== 0 &&
                    <Typography variant='h6' sx={{ mt: 2, mb: 1 }}> Tasks </Typography>
                } 
                {project.projectStage === 0 && project.tasks.map((task) => (
                    <Card key={task.taskName} sx={{ mb: 3, width: 550, height: 85, backgroundColor: '#C0C0C0' }}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={10.75}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography variant='h6' sx={{ flexGrow: 1 }}> {task.taskName} </Typography>
                                     </Box>
                                    <Typography variant='subtitle1'> Task ID: {task.taskID} </Typography>
                                </Grid>
                                <Grid item xs={1.25}>
                                    <IconButton key='view-task-button' > 
                                        <InfoIcon fontSize='large' /> 
                                    </IconButton>
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