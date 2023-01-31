import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Skeleton, Box, Button, Container, TextField, Typography, InputAdornment, IconButton, Grid, CardContent, Card } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import moment from 'moment';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { getProject } from '../../features/projectSlice'
import FeverChart from '../../components/FeverChart'

const ViewInProgressPage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    // For getting single project based on id 
    useEffect( () => {
        dispatch(getProject(id));
    }, [dispatch, id]);

    const { project, loadingOne } = useSelector((store) => store.projects)
    const [updatedProject, setUpdatedProject] = useState(project)

    // Make calculations when completing a task
    const handleCompleteTask = (task) => {

        // 1. record the new date and get the start date
        var startDate = moment(project.projectStartDate)
        var currentDate = moment().utcOffset('+8:00')
        
        console.log('start', startDate)
        console.log('current', currentDate)

        // add task to completed tasks
        const completedTasksList = [...project.completedTasks, task]
        setUpdatedProject({...updatedProject, completedTasks: completedTasksList})

        // 2. get difference 
        var diff = currentDate.diff(startDate, project.projectTimeUnits.toLowerCase(), true)

        // 3. % time taken = diff / aggressive duration 
        var percentTimeTaken = diff / project.projectDuration

        // 4. % project complete = (add aggressive duration of tasks completed) / aggressive duration
        let duration = (completedTasksList.map((task) => task.taskDuration)).reduce((a, b) => a + b, 0)
        var percentProjectComplete = duration / project.projectDuration

        // 5. % buffer consumed = 2 * (% time - % project complete)
        var percentBufferConsumed = 2 * (percentTimeTaken - percentProjectComplete)

        // 6. Create plot point { x: , y: }
        // x-value is % project complete, y-value is the % buffer consumed
        let plotPoint = { x: percentProjectComplete, y: percentBufferConsumed }
        const newChartData = [...project.chartData, plotPoint]
        setUpdatedProject({...updatedProject, chartData: newChartData})



        // TODO 7. Update project status (green, red, black)
        // make sure tasks/project is the correct color on the UI

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
                <TextField sx={{ mt: 2 }} id="aggressive-duration" disabled label="Aggressive Duration" variant="filled" defaultValue={project.projectDuration} InputLabelProps={{shrink: true}} InputProps={{ readOnly: true, endAdornment: (<InputAdornment sx={{ mr: 2, }} position='end'>{project.projectTimeUnits.toLowerCase()}</InputAdornment>) }} fullWidth margin='dense' />
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
                                    <IconButton key='complete-task' onClick={() => {handleCompleteTask(task)}}> 
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