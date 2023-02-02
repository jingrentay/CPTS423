import React from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, Skeleton, Box} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'

import useStyles from './Style'
import Input from './Input';
import theme from '../../theme.js'
import Navigation from '../../components/Navigation'

const Auth = () => {
    const classes = useStyles();

    return(
        
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
};

export default Auth;