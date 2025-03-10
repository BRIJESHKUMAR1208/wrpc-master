
import React, { useState, useEffect } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { CmsFooter } from "../Footer/CmsFooter";
import { BASE_URL } from "../../../Api/ApiFunctions";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const PCMRecommendations = () => {
  const [utilities, setUtilities] = useState([]); // State for utilities
  const [substations, setSubstations] = useState([]); // State for substations
  const [utility, setUtility] = useState(null);
  const [substation, setSubstation] = useState(null);
  const [data, setData] = useState([]);

  // Fetch utilities from the API when the component mounts
  useEffect(() => {
    const fetchUtilities = async () => {
      try {
          const response = await fetch(`${BASE_URL}/api/Tripping_compliance_pcm_discussions`);
          const result = await response.json();
  
          // Remove duplicates based on pcm_number
          const uniqueUtilities = Array.from(
              new Map(result.map((item) => [item.pcm_number, item])).values()
          );
  
          // Add "All" option at the top
          setUtilities([{ pcm_number: "All" }, ...uniqueUtilities]);
      } catch (error) {
          console.error("Error fetching utilities:", error);
      }
  };
  

    fetchUtilities();
  }, []);


  const handleUtility = async (event) => {
    const selectedUtility = event.target.value;
    setUtility(selectedUtility);
    setSubstation(null); // Reset substation
    setData([]); // Clear table data

    if (selectedUtility === "All") {
        // Fetch all substations (if your backend has a dedicated endpoint, use it, or just fetch everything)
        try {
            const response = await fetch(`${BASE_URL}/api/Tripping_compliance_pcm_discussions`);
            const result = await response.json();
            setSubstations(result); // Show all substations
        } catch (error) {
            console.error("Error fetching substations:", error);
        }
    } else {
        // Fetch substations for selected PCM
        try {
            const response = await fetch(`${BASE_URL}/api/Tripping_compliance_pcm_discussions/Form1listBypcmno/${selectedUtility}`);
            const result = await response.json();
            setSubstations(result);
        } catch (error) {
            console.error("Error fetching substations:", error);
        }
    }
};


  const handleSubstation = (event) => {
    const selectedSubstation = event.target.value;
    setSubstation(selectedSubstation);
    fetchData(utility, selectedSubstation); // Fetch data when substation is selected
  };

  const fetchData = async (utility, substation) => {
    // Fetch data from API based on the selected utility and substation
    try {
      const response = await fetch(
        `${BASE_URL}/api/Tripping_compliance_pcm_discussions/form1list?pcmno=${utility}&utility=${substation}`
      );
      // const response = await fetch(`http://localhost:5141/api/Tripping_compliance_pcm_discussions/form1list/${utility}/${substation}`);
      const result = await response.json();
      setData(result); // Assuming the response is an array of data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div>
        <TopHeader />
        <CmsDisplay />
        <main>
          <div className="container mt-4 vh-90">
            <h1>Tripping Form Data</h1>
            <div className="date-sec row">
              <div className="col-md-5">
                <TextField
                  id="outlined-select-utility"
                  select
                  label="PcmNo"
                  fullWidth
                  size="normal"
                  value={utility}
                  onChange={handleUtility}
                >
                  {utilities.map((option) => (
                    <MenuItem key={option.id} value={option.pcm_number}>
                      {option.pcm_number}
                    </MenuItem>
                  ))}

                </TextField>
              </div>
              <div className="col-md-5">
                <TextField
                  id="outlined-select-substation"
                  select
                  label="Utility"
                  fullWidth
                  size="normal"
                  value={substation}
                  onChange={handleSubstation}
                  disabled={!utility} // Disable if no utility is selected
                >
                  {substations.map((option) => (
                    <MenuItem key={option.pcm_number} value={option.utility_responsible_for_attending}>
                      {option.utility_responsible_for_attending}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            {utility && substation ? (
              <div>
                <h4>{utility} - {substation} Tripping form Files:</h4>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>

                        <TableCell style={{ fontWeight: 'bold' }}>PCM Number</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} >PCM Date</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Item No(Heading)</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Recommondation of PCM</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Utility Responsible
                          For Attending</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Action taken by utility to allow complition</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Date on which attended</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Remarks</TableCell>
                        {/* Add more headers based on your data structure */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((item) => (
                        <TableRow key={item.pcm_number}>
                          <TableCell>{item.pcm_number}</TableCell>
                          <TableCell>{item.pcm_date}</TableCell>
                          <TableCell>{item.item_no_heading}</TableCell>
                          <TableCell>{item.recommendation_of_pcm}</TableCell>
                          <TableCell>{item.utility_responsible_for_attending}</TableCell>
                          <TableCell>{item.action_taken_by_utility_to_allow_completion}</TableCell>
                          <TableCell>{item.date_on_which_attended}</TableCell>
                          <TableCell>{item.remarks}</TableCell>
                          {/* Add more cells based on your data structure */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <div>Please select a Pcm number and  utility  to view  Tripping form  Files.</div>
            )}
          </div>
          <CmsFooter />
        </main>
      </div>
    </>
  );
};

export default PCMRecommendations;

