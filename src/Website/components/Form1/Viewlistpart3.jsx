import React, { useEffect, useState } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../Api/ApiFunctions";
import { CmsFooter } from "../Footer/CmsFooter"; // Ensure path is correct

const Form1part3list = () => {
  const [trippingData, setTrippingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from AP3
  useEffect(() => {
    const fetchData = async () => {
      try {
      //  const response = await fetch("http://localhost:5141/api/TrippingReport/Part1");
        const response = await fetch(`${BASE_URL}/api/TrippingReport/Part1`);
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
          <h2>Tripping Reporting and Compliance of PCM Monitoring List</h2>
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
                    <TableCell>Tripping Date</TableCell>
                    <TableCell>Tripping Time</TableCell>
                    <TableCell>Owner Send</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>FIR(S)</TableCell>
                    <TableCell>DR(S)</TableCell>
                    <TableCell>EL(S)</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trippingData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.uniqueid}</TableCell>
                      <TableCell>{item.tripping_date}</TableCell>
                      <TableCell>{item.tripping_time}</TableCell>
                      <TableCell>{item.owner_send}</TableCell>
                      <TableCell>{item.category_s}</TableCell>
                      <TableCell>
                        <a href={BASE_URL + item.fir_spdfpath} target="_blank" rel="noopener noreferrer">
                          View FIR(s) PDF
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={BASE_URL + item.dr_spath} target="_blank" rel="noopener noreferrer">
                          View DR(S) PDF
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={BASE_URL + item.el_spath} target="_blank" rel="noopener noreferrer">
                          View EL(S) PDF
                        </a>
                      </TableCell>
                      {/* <TableCell>
                      <Link to ={`/form1part3/${item.uniqueid}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Fill Part3
          </Button>
        </Link>
                      </TableCell> */}
                      <TableCell>
                        {item.part1 === 1 & item.part2 ===1 ? (
                          <Link to ={`/form1part3/${item.uniqueid}`} style={{ textDecoration: 'none' }}>
                          <Button variant="contained" color="primary">
                            Fill Part3
                          </Button>
                        </Link>
                        ) : (
                          <Button variant="contained" color="primary" disabled>
                            Fill Part2
                          </Button>
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

export default Form1part3list;
