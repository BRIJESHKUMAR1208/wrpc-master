import React, { useEffect, useState } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { BASE_URL } from "../../../Api/ApiFunctions";
import { CmsFooter } from "../Footer/CmsFooter"; // Ensure path is correct
import { Link } from 'react-router-dom';

const Form3part2list = () => {
  const [trippingData, setTrippingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("http://localhost:5141/api/TrippingReport/Part1");
        const response = await fetch(`${BASE_URL}/api/TPPAObservations/Getpart2`);

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
                    <TableCell>PCM Review for Cat-A</TableCell>
                    <TableCell>PCM number for Cat-A</TableCell>
                    <TableCell>PCM Review for Cat-B</TableCell>
                    <TableCell>PCM NUMBER for Cat-B</TableCell>
                    {/* <TableCell>Report</TableCell>
                    <TableCell>Complainces</TableCell>
                    <TableCell>Issues Observed</TableCell>
                    <TableCell>Remarks</TableCell> */}
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trippingData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.pcmreview_cata}</TableCell>
                      <TableCell>{item.pcmnumber_cata}</TableCell>
                      <TableCell>{item.pcmreview_catb}</TableCell>
                      <TableCell>{item.pcmnumber_catb}</TableCell>

                      <TableCell>
                        {item.part4 === 1 ? (
                            <Button variant="contained" color="primary" disabled>
                              Fill Part3
                            </Button>
                          
                        ) : (
                          <Link to={`/form3part3/${item.id}`} style={{ textDecoration: 'none' }} >
                            <Button variant="contained" color="primary" >
                              Fill Part3
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

export default Form3part2list;
