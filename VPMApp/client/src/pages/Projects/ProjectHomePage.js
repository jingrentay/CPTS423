import React, { useState } from 'react'
import { Box, Tabs, Tab, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import PropTypes from 'prop-types';

import theme from '../../theme.js'
import Navigation from '../../components/Navigation'
import InPlanningTab from './InPlanningTab.js'
import InProgressTab from './InProgressTab.js'

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other} >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component='span'>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

const ProjectHomePage = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
        <ThemeProvider key='theme-provider' theme={theme}>
            <Navigation key='nav' />
            <Box sx={{ width: '84%', ml: 27, mt: 9 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="In Planning"  />
                        <Tab label="In Progress"  />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <InPlanningTab />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <InProgressTab />
                </TabPanel>
            </Box>
        </ThemeProvider>
        </>
    );
}

export default ProjectHomePage;