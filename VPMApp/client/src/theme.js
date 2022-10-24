import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
          light: '#4d9cbf',
          main: '#036e8f',
          dark: '#004361',
          contrastText: '#fff',
        },
        secondary: {
          light: '#57778d',
          main: '#2a4b60',
          dark: '#002336',
          contrastText: '#fff',
        },
        success: {
          light: '#99d066',
          main: '#689f38',
          dark: '#387002',
          contrastText: '#fff',
        }
    },
    components: {
        MuiDrawer: {
          styleOverrides: {
            paper: {
              background: "#2a4b60"
            }
          }
        }
    },
})

export default theme;