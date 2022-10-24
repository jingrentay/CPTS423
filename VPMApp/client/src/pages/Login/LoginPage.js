import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <div>
            <Button component={Link} to="/projects" size="medium" variant="contained" sx={{ ml: 3, mt: 3 }}>
                Login
            </Button>
        </div>
    )
}

export default LoginPage;