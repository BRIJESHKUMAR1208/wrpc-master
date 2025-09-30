import React, { useEffect, useState } from "react";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../Api/ApiFunctions";
import { CmsFooter } from "../Footer/CmsFooter"; // Ensure path is correct

const Form1part5list = () => {
  const [trippingData, setTrippingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from AP3
  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await fetch(`${BASE_URL}/api/TrippingReport/Part4`);
        const candidateId = localStorage.getItem('candidateId');
        const response = await fetch(`${BASE_URL}/api/TrippingReport/getPart4/${candidateId}`);
       
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.length === 0) {
          // Redirect to dashboard if no data is found
         // navigate("/dashboard");
         alert("No record found");
         window.location.replace("form1partsdata");
        } else {
          setTrippingData(data); // Set the API data to state
        }
       // setTrippingData(data); // Set the API data to state
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
        <div className="container mt-4 ">
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
                    <TableCell>PCM Number</TableCell>
                    <TableCell>PCM Date</TableCell>
                    <TableCell>Item No.</TableCell>
                    <TableCell>Recommondation of PCM</TableCell>
                    <TableCell>Utility responsible for attending )</TableCell>
                    
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trippingData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.uniqueid}</TableCell>
                      <TableCell>{item.pcm_number}</TableCell>
                      <TableCell>{item.pcm_date}</TableCell>
                      <TableCell>{item.item_no_heading}</TableCell>
                      <TableCell>{item.recommendation_of_pcm}</TableCell>
                      <TableCell>{item.utility_responsible_for_attending}</TableCell>
                      
                      <TableCell>
                        {item.part1 === 1 & item.part2 ===1 & item.part3 ===1& item.part4 ===1? (
                          <Link to ={`/form1part5/${item.uniqueid}`} style={{ textDecoration: 'none' }}>
                          <Button variant="contained" color="primary">
                            Fill Part5
                          </Button>
                        </Link>
                        ) : (
                          <Button variant="contained" color="primary" disabled>
                           Fill Part5
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

export default Form1part5list;
