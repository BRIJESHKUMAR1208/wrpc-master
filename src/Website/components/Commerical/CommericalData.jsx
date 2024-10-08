import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CmsDisplay from "../Header/CmsDisplay";
import { CmsFooter } from "../Footer/CmsFooter";
import { getCommerical ,BASE_URL} from "../../../Api/ApiFunctions";
import { TopHeader } from "../TopHeader/TopHeader";
import { Errorfound } from "../error404/Errorfound";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ApiClient from '../../../Api/ApiClient';
import api from'../../../Api/api.json';
import axios from 'axios'


const CommericalData = () => {
  const [commerical, SetCommerical] = useState([]);
  const { id } = useParams();
const [titleName ,setTitlename]= useState("");
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [number,setExtractedNumber]=useState("")
  const [selectedYear , setSelectedYear]= useState(new Date().getFullYear());
  const [getyears , SetYears]= useState([])



  const yeardata=[
    {
      id:1,
      year:"2019"
    },
    {
      id:2,
      year:"2020"
    },
    {
      id:3,
      year:"2021"
    },
    {
      id:4,
      year:"2022"
    },
    {
      id:5,
      year:"2023"
    },
    {
      id:6,
      year:"2024"
    }

  ]

  useEffect(() => {
    
    const numberMatch = id.match(/\d+/);
    const nonNumericPart = id.replace(/\d+/g, '');
    setTitlename(nonNumericPart)

    if (numberMatch) {
      const number = parseInt(numberMatch[0], 10);
      setExtractedNumber(number);
      async function fetchMenuData() {
        try {
          // const data = await ApiClient.get(api.commerical+number);
          const data = await ApiClient.get(`/api/Commercial/${number}/${selectedYear}`);
      
          // const data = await ApiClient.get(api.commerical+number+"/"+selectedYear);

        SetCommerical(data.data);
      
      
        } catch (error) {
          console.error('Error fetching menu data:', error);
        }
      }
  
      fetchMenuData();
    }
  }, [id,selectedYear]);
  useEffect(() => {

    async function fetchMenuData1() {
      try {
        const data = await ApiClient.get(`/api/Commercial/Getcommtype/${number}`);
        SetYears(data.data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }

    }
    const currentYear = new Date().getFullYear();
    const currentYearIndex = yeardata.findIndex((item) => item.year === currentYear.toString());
    // If current year is found, set active tab to its index
    if (currentYearIndex !== -1) {
      setActiveTab(currentYearIndex);
      setSelectedYear(currentYear);
    } else {
      // If current year is not found, set active tab to the first one
      setActiveTab(0);
      setSelectedYear("");
    }

  }, [number]);

  
  const onTabClick = (e, index) => {
    setActiveTab(index);
    setSelectedYear(parseInt(yeardata[index].year)); // Set the selected year
  };
 
  const handleLanguageChange = (event) => {
    const newSelectedLanguage = event.target.value;

    setSelectedLanguage(newSelectedLanguage);

    // Store the selected language in localStorage
    localStorage.setItem("selectedLanguage", newSelectedLanguage);

    // Reload the window after a brief delay to allow saving the selected language
    setTimeout(() => {
      if (newSelectedLanguage === 1) {
        alert("Language changed to :English");
      } else if (newSelectedLanguage === 2) {
        alert("Language changed to :Hindi");
      } else {
      }
      navigate("/");
    }, 500);
  };

  if (id === null) {
    return (
      <div>
        <Errorfound />
      </div>
    );
  }
  return (
    <div>
      <TopHeader
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
      />
      <CmsDisplay />
      <div>
        <div className="container inner-sec">
        <h2>{titleName}</h2>
        <Tabs
        activeTab={activeTab}
        onTabClick={onTabClick}
        hideNavBtnsOnMobile={false}
      >
        {/* generating an array to loop through it  */}
        {yeardata.map((item) => (
          <Tab key={item.id}>{item.year}</Tab>
        ))}
      </Tabs>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">ZIP File</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {commerical.map((i) => (
            <TableRow
              key={i.commericaltype}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <a href={BASE_URL+i.commercialpdfpath} target="_blank" download>{i.name}</a>
              
              </TableCell>
              <TableCell align="right">
              <a href={BASE_URL+i.commercialzippath} target="_blank">All Member BlockWise Data</a>
             </TableCell>
             
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
      </div>
      <CmsFooter />
    </div>
  );
};

export default CommericalData;
