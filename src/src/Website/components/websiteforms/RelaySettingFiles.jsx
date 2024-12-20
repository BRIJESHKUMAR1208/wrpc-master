import React, { useState, useEffect } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { BASE_URL } from "../../../Api/ApiFunctions";
import { CmsFooter } from "../Footer/CmsFooter";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const RelaySettingFiles = () => {
  const [utilities, setUtilities] = useState([]); // State for utilities
  const [substations, setSubstations] = useState([]); // State for substations
  const [utility, setUtility] = useState(null);
  const [substation, setSubstation] = useState(null);
  const [data, setData] = useState([]);

  // Fetch utilities from the API when the component mounts
  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/Relay/utility`);
        const result = await response.json();
        setUtilities(result); // Assuming result is an array of utility objects
      } catch (error) {
        console.error("Error fetching utilities:", error);
      }
    };
    fetchUtilities();
  }, []);

  const handleUtility = async (event) => {
    const selectedUtility = event.target.value;
    setUtility(selectedUtility);
    setSubstation(null); // Reset substation when utility changes
    setData([]); // Clear data when utility changes

    // Fetch substations based on the selected utility
    try {
      const  response = await fetch(`${BASE_URL}/api/Relay/substation/${selectedUtility}`);
      const result = await response.json();
      setSubstations(result); // Assuming result is an array of substation objects
    } catch (error) {
      console.error("Error fetching substations:", error);
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
      const response = await fetch(`${BASE_URL}/api/Relay/data/${utility}/${substation}`);
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
          <div className="container mt-4 vh-100">
            <h1>Relay Setting Files</h1>
            <div className="date-sec row">
              <div className="col-md-5">
                <TextField
                  id="outlined-select-utility"
                  select
                  label="Utility"
                  fullWidth
                  size="normal"
                  value={utility}
                  onChange={handleUtility}
                >
                  {utilities.map((option) => (
                    <MenuItem key={option.id} value={option.utility}>
                      {option.utility}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-5">
                <TextField
                  id="outlined-select-substation"
                  select
                  label="Substation"
                  fullWidth
                  size="normal"
                  value={substation}
                  onChange={handleSubstation}
                  disabled={!utility} // Disable if no utility is selected
                >
                  {substations.map((option) => (
                    <MenuItem key={option.id} value={option.substation}>
                      {option.substation}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            {utility && substation ? (
              <div>
                <h4>{utility} - {substation} Relay Setting Files:</h4>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>S. No.</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Substation</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }} >Utility</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>kV Level</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Name of Element</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Protection (M1/M2/Backup)</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Admin Remark</TableCell>
                        {/* Add more headers based on your data structure */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.s_no}</TableCell>
                          <TableCell>{item.substation}</TableCell>
                          <TableCell>{item.utility}</TableCell>
                          <TableCell>{item.kv_level}</TableCell>
                          <TableCell>{item.name_of_element}</TableCell>
                          <TableCell>{item.protection_typetext}</TableCell>
                          <TableCell>{item.admin_remark}</TableCell>
                          {/* Add more cells based on your data structure */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <div>Please select a utility and substation to view its Relay Setting Files.</div>
            )}
          </div>
          <CmsFooter />
        </main>
      </div>
    </>
  );
};

export default RelaySettingFiles;
