import React from 'react'
import { Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'

const SettingsPage = () => {


    return (
        <div>
            <ThemeProvider theme={theme}>
            <Navigation/>
            <Typography variant="h6" sx={{ mt: 11, ml: 28 }}> Settings </Typography>
            </ThemeProvider>
        </div>
    );
}

export default SettingsPage;