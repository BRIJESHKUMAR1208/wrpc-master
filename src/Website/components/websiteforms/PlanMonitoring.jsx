import React, { useEffect, useState } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { CmsFooter } from "../Footer/CmsFooter";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { BASE_URL } from "../../../Api/ApiFunctions";
import axios from "axios"; // Import axios for API calls
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const PlanMonitoring = () => {
  const [stations, setStations] = useState([]); // State for station names
  const [kvLevels, setKvLevels] = useState([]); // State for kv levels
  const [station, setStation] = useState(null);
  const [kvLevel, setKvLevel] = useState(null);
  const [data, setData] = useState([]);

  // Fetch station names from the API when the component mounts
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/TPPA_Plan_Monitoring`);
        const result = await response.json();

        const uniqueStations = Array.from(new Set(result.map(station => station.station_name)))
          .map(station_name => ({
            station_name
          }));

        // Add "All" option at the beginning
        setStations([{ station_name: "All" }, ...uniqueStations]);
      } catch (error) {
        console.error("Error fetching station names:", error);
      }
    };
    fetchStations();
  }, []);


  const handleStation = async (event) => {
    const selectedStation = event.target.value;
    setStation(selectedStation);
    setKvLevel(null); // Reset kvLevel when station changes
    setData([]); // Clear data when station changes

    if (selectedStation === "All") {
      try {
        const response = await fetch(`${BASE_URL}/api/TPPA_Plan_Monitoring`);
        const result = await response.json();
        setKvLevels(result);
      } catch (error) {
        console.error("Error fetching station names:", error);
      }
    
    } else {
        // Fetch kv levels for specific station
        try {
            const response = await fetch(`${BASE_URL}/api/TPPA_Plan_Monitoring/kvlevel/${selectedStation}`);
            const result = await response.json();
            setKvLevels(result);
        } catch (error) {
            console.error("Error fetching kv levels:", error);
        }
    }
};


  const handleKvLevel = (event) => {
    const selectedKvLevel = event.target.value;
    setKvLevel(selectedKvLevel);
    fetchData(station, selectedKvLevel); // Fetch data when kv level is selected
  };

  const fetchData = async (station, kvLevel) => {
    // Fetch data from API based on the selected station and kv level
    try {
      const response = await fetch(
        `${BASE_URL}/api/TPPA_Plan_Monitoring/GetkvlevelStation?stationname=${station}&kvlevel=${kvLevel}`
      );
      // const response = await fetch(`${BASE_URL}/api/TPPA_Plan_Monitoring/data/${station}/${kvLevel}`);
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
          <div className="container mt-4 vh-80">
            <h3>TPPA Plan & Monitoring </h3>
            <div className="date-sec row">
              <div className="col-md-5">
                <TextField
                  id="outlined-select-station"
                  select
                  label="Station Name"
                  fullWidth
                  size="normal"
                  value={station}
                  onChange={handleStation}
                >
                  {stations.map((option) => (
                    <MenuItem key={option.sr_no} value={option.station_name}>
                      {option.station_name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-5">
                <TextField
                  id="outlined-select-kvLevel"
                  select
                  label="KV Level"
                  fullWidth
                  size="normal"
                  value={kvLevel}
                  onChange={handleKvLevel}
                  disabled={!station}
                >
                  {kvLevels.map((option) => (
                    <MenuItem key={option.sr_no} value={option.kv_level}>
                      {option.kv_level}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            {station && kvLevel ? (
              <div>
                <h4>{station} - {kvLevel} TPPA Plan & Monitoring</h4>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>

                        <TableCell style={{ fontWeight: 'bold' }}>Station Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>kV Level</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Planned date of Audit</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Actual date of Audit</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Remarks/Admin</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((item) => (
                        <TableRow key={item.sr_no}>

                          <TableCell>{item.station_name}</TableCell>
                          <TableCell>{item.kv_level}</TableCell>
                          <TableCell>{item.planned_date_of_audit}</TableCell>
                          <TableCell>{item.date_of_audit}</TableCell>
                          <TableCell>{item.remarks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <div>Please select a station and KV Level to view its TPPA Plan & Monitoring Files.</div>
            )}
          </div>
          <CmsFooter />
        </main>
      </div>
    </>
  );
};

export default PlanMonitoring;
