import React from 'react'
// import { Link } from 'react-router-dom'
// import { Skeleton, Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
// import { useSelector, useDispatch } from 'react-redux'

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'

const SettingsPage = () => {


    return (
        <div>
            <ThemeProvider theme={theme}>
            <Navigation/>
            </ThemeProvider>
        </div>
    );
}

export default SettingsPage;