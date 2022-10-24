import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../theme.js'
import Navigation from '../../components/Navigation'

const ProjectFormPage = () => {
    // const [projectData, setProjectData]
    return (
        <>
            <ThemeProvider theme={theme}>
            <Navigation/>
            <Container sx={{ width: 700, ml: 25, mt: 10 }}>
                <form autoComplete='off' noValidate>
                    <Typography variant='h5'> Create a Project </Typography>
                    <TextField sx={{ mt: 3 }} name='project name' variant='filled' label='Project Name' fullWidth />
                    <TextField sx={{ mt: 3 }}name='project description' variant='filled' label='Project Description' fullWidth />
                    <FormControl sx={{ width: 652, mt: 3 }}>
                        <InputLabel id="timeUnitsLabel">Time Units</InputLabel>
                        <Select labelId="timeUnitsLabel" label="Time Units">
                            <MenuItem value=' '><em>None</em></MenuItem>
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
                        <Button component={Link} to="/projects" size="medium" variant="contained">
                            Save
                        </Button>
                        <Button component={Link} to="/projects" size="medium" variant="contained" sx={{ ml: 2 }}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Container>
            </ThemeProvider>
        </>
    );
}

export default ProjectFormPage;