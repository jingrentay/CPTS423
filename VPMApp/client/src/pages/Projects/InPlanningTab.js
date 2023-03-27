import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton, Button, Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import { deleteProject, getPlanningProjects } from '../../features/projectSlice'

const InPlanningTab = () => {
    const dispatch = useDispatch();
    
    const { projects, loadingAll } = useSelector((store) => ({...store.projects}))
    // eslint-disable-next-line
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem('profile')).result)

    useEffect(() => {
        dispatch(getPlanningProjects(account.currOrganization));
    }, [dispatch, account]);

    const handleDeleteProject = (id) => {
        dispatch(deleteProject(id))
    }

    if (loadingAll) {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Navigation key='nav' />
                    <Box sx={{ width: 600 }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
                </ThemeProvider>
            </>
        )
    }

    return (
        <>
        <ThemeProvider key='theme-provider' theme={theme}>
            <Navigation key='nav' />
            <Button key='new-project-button' component={Link} to="/projects/create" size="medium" variant="contained">
                New Project
            </Button>
            <Typography variant="h6" sx={{ mt: 3 }}> Organization: {account.currOrganization} </Typography>
                {projects.length === 0 &&
                    <Typography variant="h6" sx={{ mt: 3  }}> You have no projects currently in planning. </Typography>
                }
                {projects.map((project) => (
                    <Card key={project.projectName} sx={{ mt: 3, width: 700, height: 85, backgroundColor: '#A0A0A0' }}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={10}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography variant='h6' sx={{ flexGrow: 1 }}> {project.projectName} </Typography>
                                    </Box>
                                    <Typography> Project ID: {project.projectID} </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton sx={{width:'50px'}} key='delete-project-button' onClick={() => handleDeleteProject(project._id)} > 
                                        <DeleteIcon fontSize='large' /> 
                                    </IconButton>
                                 </Grid>
                                <Grid item xs={1}>
                                    <IconButton key='view-project-button' component={Link} to={`/projects/view/planning/${project.projectID}`}> 
                                        <InfoIcon fontSize='large' /> 
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
        </ThemeProvider>
        </>
    );
}

export default InPlanningTab;