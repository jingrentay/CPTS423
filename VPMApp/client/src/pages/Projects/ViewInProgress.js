import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Skeleton, Box, Button, Container, TextField, Typography, InputAdornment, IconButton, Grid, CardContent, Card } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getProject, updateProject } from '../../features/projectSlice'
import FeverChart from '../../components/FeverChart'

const ViewInProgressPage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // For getting single project based on id 
    useEffect( () => {
        dispatch(getProject(id));
    }, [dispatch, id]);

    const { project, loadingOne } = useSelector((store) => store.projects)
    console.log('in planning', project)
    let taskDurations = []
    project?.tasks?.forEach(element => {
        taskDurations?.push(parseInt(element.taskDuration))
    })
    const totalTaskDuration = taskDurations?.reduce((a, b) => a + b, 0)

    //const [taskList,  setTaskList] = useState([])

    const handleCompleteTask = () => {
        // calculate the time (% buffer consumed / % project completed)

        // update task completed
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
            <Box sx={{ mt: 11, ml: 30, display: 'flex' }}>
                <Typography variant='h5' noWrap sx={{ flexGrow: 1 }}> Project Details </Typography> 
                    <Button sx={{ mr: 3 }} key='back-project-button' component={Link} to="/projects" size="medium" variant="contained" >
                        Back
                    </Button>
            </Box>
            <Container sx={{ width: 600, ml: 27, mb: 6 }}>
                {project.projectStage === 1 && 
                    <div key='chart-padding' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div key='chart-contain' style={{ position: 'relative', width: '40vw' }}>
                            <FeverChart plotData={project.chartData} />
                        </div>
                    </div>
                }
                <TextField sx={{ mt: 2 }} id="project-name" label="Name" variant="filled" defaultValue={project.projectName} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="project-id" label="ID" variant="filled" defaultValue={project.projectID} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="project-description" label="Description" variant="filled" defaultValue={project.projDescription} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="aggressive-duration" disabled label="Aggressive Duration" variant="filled" defaultValue={totalTaskDuration} InputLabelProps={{shrink: true}} InputProps={{ readOnly: true, endAdornment: (<InputAdornment sx={{ mr: 2, }} position='end'>{project.projectTimeUnits.toLowerCase()}</InputAdornment>) }} fullWidth margin='dense' />
                <TextField sx={{ mt: 2 }} id="predicted-completion" label="Predicted Completion" variant="filled" defaultValue={new Date(project.predictedCompletion)} InputLabelProps={{shrink: true}} InputProps={{ readOnly: true }} fullWidth margin='dense' />
                {project.tasks.length !== 0 &&
                    <Typography variant='h6' sx={{ mt: 2, mb: 1 }}> Tasks </Typography>
                }
                {project.projectStage === 1 && project.tasks.map((task) => (
                    <Card key={task.taskName} sx={{ mb: 3, width: 550, height: 85, backgroundColor: task.complete ? '#56AB2B' : '#E34129' }}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={9.5}>
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
                                <Grid item xs={1.25}>
                                    <IconButton key='complete-task' onClick={handleCompleteTask}> 
                                        <CheckIcon fontSize='large' /> 
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

export default ViewInProgressPage;