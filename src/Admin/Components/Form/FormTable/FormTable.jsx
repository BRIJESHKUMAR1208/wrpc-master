import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import Footer from '../../footer/Footer';
import FormDataOne from '../CandidateTable/FormDataOne';
import FormDataTwo from '../CandidateTable/FormDataTwo';
import FormDataThree from '../CandidateTable/FormDataThree';
import FormDataFour from '../CandidateTable/FormDataFour';
import FormDataFive from '../CandidateTable/FormDataFive';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  export const FormTable = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
  return (
    <div>
    <Header />
    <Sidebar />
    <main id="main" className="main">
      <div className="pagetitle">
        <div class="pagetitle-lft">
          <h1 className="maintitle">ALL Forms</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Forms Data</li>
            
            </ol>
          </nav>
        </div>
        <div class="pagetitle-rgt">
          <Link to="/dashboard">
            <button type="button" class="btn btn-info">
              Back
            </button>
          </Link>
        </div>
      </div>
    
      <Box sx={{ bgcolor: 'background.paper', width: 1000 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="TRIPPING COMPLIANCE OF PCM DISCUSSIONS" {...a11yProps(0)} />
          <Tab label="TPPA PLAN & MONITORING" {...a11yProps(1)} />
          <Tab label="TPPA OBSERVATION" {...a11yProps(2)} />
          <Tab label="RELAY SETTINGS DATA" {...a11yProps(3)} />
          <Tab label="PERFORMANCE DATA" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <FormDataOne/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <FormDataTwo/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <FormDataThree/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
       <FormDataFour/>
        </TabPanel>  

        <TabPanel value={value} index={4} dir={theme.direction}>
       <FormDataFive/>
        </TabPanel> 
      </SwipeableViews>
    </Box>
    </main>
    <Footer/>
 
  </div>
  )
}
