import React, { useEffect, useState } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { BASE_URL } from "../../../Api/ApiFunctions";
import { CmsFooter } from "../Footer/CmsFooter"; // Ensure path is correct
import { Link } from 'react-router-dom';

const Form3part1list = () => {
  const [trippingData, setTrippingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
       // const response = await fetch("http://localhost:5141/api/TrippingReport/Part1");
        const response = await fetch(`${BASE_URL}/api/TPPAObservations/Part1`);
       
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTrippingData(data); // Set the API data to state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <TopHeader /> {/* Top Header */}
      <CmsDisplay /> {/* CMS Display */}
      <main>
        <div className="container mt-4 vh-100">
          <h2>TPPA Observations/Descripancies</h2>
          <div className="row mt-4">
            
          </div>

          {/* Display loading or error */}
          {loading && <p>Loading data...</p>}
          {error && <p>Error: {error}</p>}

          {/* Display the table when data is loaded */}
          {!loading && !error && trippingData.length > 0 && (
            <Paper className="mt-4">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Station Name</TableCell>
                    <TableCell>kV Level</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Report</TableCell>
                    <TableCell>Complainces</TableCell>
                    <TableCell>Issues Observed</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trippingData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.station_name}</TableCell>
                      <TableCell>{item.kv_level}</TableCell>
                      <TableCell>{item.owner}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <a href={BASE_URL + item.reportpath} target="_blank" rel="noopener noreferrer">
                          View Report Document
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={BASE_URL + item.compliancespath} target="_blank" rel="noopener noreferrer">
                          View Complainces Document
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={BASE_URL + item.issues_observedpath} target="_blank" rel="noopener noreferrer">
                          View IssuesObserved
                        </a>
                      </TableCell>
                      <TableCell>
                        {item.remarks}
                      </TableCell>
                      <TableCell>
                      {item.part2 === 1 ? (
                           <Button variant="contained" color="primary" disabled>
                           Edit Part1
                         </Button>
                        ) : (
                         
                          <Link to={`/editform3part1/${item.id}`} style={{ textDecoration: 'none' }}>
                          <Button variant="contained" color="primary">
                          Edit Part1
                          </Button>
                        </Link>
                        )}
                         
                        
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </div>
        <CmsFooter />
      </main>
      {/* Add Footer */}
    </div>
  );
};

export default Form3part1list;