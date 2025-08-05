import React, { useState, useEffect } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { BASE_URL } from "../../../Api/ApiFunctions";
import { CmsFooter } from "../Footer/CmsFooter";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const Discrepancies = () => {
  const [substations, setSubstations] = useState([]); // State for substations
  const [observationsA, setObservationsA] = useState([]); // State for Category A observations
  const [observationsB, setObservationsB] = useState([]); // State for Category B observations
  const [substation, setSubstation] = useState(null);
  const [observationA, setObservationA] = useState(null);
  const [observationB, setObservationB] = useState(null);
  const [data, setData] = useState([]);

  // Fetch substations from the API when the component mounts
  useEffect(() => {
    const fetchSubstations = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/TPPA_Obs/stationname`); // Adjust the endpoint as necessary
        const result = await response.json();
        setSubstations(result); // Assuming result is an array of substation objects
      } catch (error) {
        console.error("Error fetching substations:", error);
      }
    };
    fetchSubstations();
  }, []);

  const handleSubstationChange = async (event) => {
    const selectedSubstation = event.target.value;
    setSubstation(selectedSubstation);
    setObservationA(null); // Reset observations when substation changes
    setObservationB(null);
    setData([]); // Clear data when substation changes

    // Fetch observations for the selected substation
    try {
      const responseA = await fetch(`${BASE_URL}/api/TPPA_Obs/data/${selectedSubstation}`);
      const resultA = await responseA.json();
      setObservationsA(resultA); // Assuming result is an array of Category A observations

      const responseB = await fetch(`${BASE_URL}/api/TPPA_Obs/data/${selectedSubstation}`);
      const resultB = await responseB.json();
      setObservationsB(resultB); // Assuming result is an array of Category B observations
    } catch (error) {
      console.error("Error fetching observations:", error);
    }
  };

  const handleObservationAChange = (event) => {
    debugger;
    setObservationA(event.target.value);
    if (substation && event.target.value && observationB) {
      fetchData(substation, event.target.value, observationB); // Fetch data when Category A observation is selected
    }
  };

  const handleObservationBChange = (event) => {
    setObservationB(event.target.value);
    if (substation && observationA && event.target.value) {
      fetchData(substation, observationA, event.target.value); // Fetch data when Category B observation is selected
    }
  };

  const fetchData = async (substation, observationA, observationB) => {
    // Fetch data from API based on the selected substation and observations
    try {
      const response = await fetch(`${BASE_URL}/api/TPPA_Obs/category/${substation}/${observationA}/${observationB}`);
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
            <h4>TPPA Observations/descripancies</h4>
            <div className="date-sec row">
              <div className="col-md-5">
                <TextField
                  id="outlined-select-substation"
                  select
                  label="Substation"
                  fullWidth
                  size="normal"
                  value={substation}
                  onChange={handleSubstationChange}
                >
                  {substations.map((option) => (
                    <MenuItem key={option.id} value={option.station_name}>
                      {option.station_name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-5">
              <TextField
  id="outlined-select-observation-a"
  select
  label="Category A Observations"
  fullWidth
  size="normal"
  value={observationA}
  onChange={handleObservationAChange}
  disabled={!substation} // Disable if no substation is selected
  SelectProps={{
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: 200,           // Enables vertical scrolling
          overflowY: 'auto',
          overflowX: 'auto',        // Enables horizontal scrolling
          whiteSpace: 'nowrap',     // Prevents wrapping so horizontal scroll appears
        },
      },
    },
  }}
>
                  {observationsA.map((option) => (
                    <MenuItem key={option.id} value={option.cat_a_deficiencies}>
                      {option.cat_a_deficiencies}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="date-sec row">
              <div className="col-md-5">
                <TextField
                  id="outlined-select-observation-b"
                  select
                  label="Category B Observations"
                  fullWidth
                  size="normal"
                  value={observationB}
                  onChange={handleObservationBChange}
                  disabled={!substation} // Disable if no substation is selected
                  SelectProps={{
    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: 200,           // Enables vertical scrolling
          overflowY: 'auto',
          overflowX: 'auto',        // Enables horizontal scrolling
          whiteSpace: 'nowrap',     // Prevents wrapping so horizontal scroll appears
        },
      },
    },
  }}
                >
                  {observationsB.map((option) => (
                    <MenuItem key={option.id} value={option.cat_b_deficiencies}>
                      {option.cat_b_deficiencies}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            {substation && observationA && observationB ? (
              <div>
                <h4>{substation} Discrepancy Data:</h4>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>S. No.</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Station Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>kV Level</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Owner</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Date of Audit</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>CAT A deficiencies</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>PCM Review</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Attendded Y/N</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>CAT B deficiencies</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>PCM Review</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Attendded Y/N</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Remark Admin</TableCell>
                        {/* Add more headers based on your data structure */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.station_name}</TableCell>
                          <TableCell>{item.kv_level}</TableCell>
                          <TableCell>{item.owner}</TableCell>
                          <TableCell>{item.date_of_audit}</TableCell>
                          {/* <TableCell>{item.cat_a_deficiencies}</TableCell> */}
                           <TableCell>{observationA}</TableCell>
                          <TableCell>{item.pcmreview_cata}</TableCell>
                          <TableCell>{item.attended_cat_a}</TableCell>
                           <TableCell>{observationB}</TableCell>
                          {/* <TableCell>{item.cat_b_deficiencies}</TableCell> */}
                          <TableCell>{item.pcmreview_catb}</TableCell>
                          <TableCell>{item.attended_cat_b}</TableCell>
                          <TableCell>{item.admin_remark}</TableCell>
                          {/* Add more cells based on your data structure */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <div>Please select a substation and observations to view the discrepancy data.</div>
            )}
          </div>
          <CmsFooter />
        </main>
      </div>
    </>
  );
};

export default Discrepancies;
