import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';

import { Link } from 'react-router-dom';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { format } from 'date-fns';
import { CSVLink } from 'react-csv';  

export default function FormDataFive() {
    const [apiData, setApiData] = useState([]);
     const [exportData, setExportData] = useState([]); // For data export


    const columns = [
        { field: "id1", headerName: "S.No", width: 50 },
        { field: "name", headerName: " Candidate Name",width: 150 },
        { field: "email", headerName: "Candidate Email",width: 200 },
        { field: "address", headerName: "Candidate Address",width: 200 },
        { field: "mobile_no", headerName: "Candidate  Mobile No." ,width: 150},
        {
            field: "View form data",
            headerName: "View Form Data",
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <Link to={'/feedback/formfive/'+params.row.id}>
                <InsertDriveFileIcon style={{ cursor: 'pointer' }} />
            </Link>
            ),
        }
    ];



    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiClient.get('/api/FormReports/PerformanceIndices');
                const dataWithIds = response.data.map((row, index) => ({ id1: index+1, ...row }));
                setApiData(dataWithIds);
              

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

         // Fetch data for export 
                                         async function fetchExportData() {
                                          try {
                                              const response = await apiClient.get(`/api/PerformanceIndices`); // API call
                                              const formattedData = response.data.map(item => ({
                                                  'Utility Name': item.utilityname,
                                                  'Correct operation': item.correct_operation,
                                                  'Unwanted operation': item.unwanted_operation,
                                                  'Failures operate': item.failures_operate,
                                                  'Incorrect operation': item.incorrect_operation,
                                                  'Dependabilityindex': item.dependabilityindex,
                                                  'Securityindex': item.securityindex,
                                                  'Reliabilityindex': item.reliabilityindex,
                                                  'Incorrectoperations_ni': item.incorrectoperations_ni,
                                                  
                                             
                                              }));
                                              setExportData(formattedData);
                                          } catch (error) {
                                              console.error('Error fetching export data:', error);
                                          }
                                      }
        

        fetchData();
        fetchExportData();
    }, []);

    const headers = [
     
      { label: 'Utility Name', key: 'Utility Name' },
      { label: 'Correct operation', key: 'Correct operation' },
      { label: 'Unwanted operation', key: 'Unwanted operation' },
      { label: 'Failures operate', key: 'Failures operate' },
      { label: 'Incorrect operation', key: 'Incorrect operation' },
      { label: 'Dependabilityindex', key: 'Dependabilityindex' },
      { label: 'Securityindex', key: 'Securityindex' },
      { label: 'Reliabilityindex', key: 'Reliabilityindex' },
      { label: 'Incorrectoperations_ni', key: 'Incorrectoperations_ni' },
      
  ];

    return (
        <div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <h4>PERFORMANCE DATA</h4>
                                                                  <CSVLink
                                                                      data={exportData}
                                                                      headers={headers}
                                                                      filename={"Performance.csv"}
                                                                      target="_blank"
                                                                      style={{
                                                                          textDecoration: 'none'
                                                                      }}
                                                                  >
                                                                      <button
                                                                          style={{
                                                                              backgroundColor: '#007bff',
                                                                              color: 'white',
                                                                              padding: '10px 20px',
                                                                              border: 'none',
                                                                              borderRadius: '5px',
                                                                              cursor: 'pointer',
                                                                              fontSize: '16px',
                                                                              fontWeight: 'bold',
                                                                              transition: 'background 0.3s ease'
                                                                          }}
                                                                          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                                                                          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                                                                      >
                                                                          📥 Download Performance                                                          </button>
                                                                  </CSVLink>
                                                              </div>
       
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={apiData}
              columns={columns}
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              components={{
                Toolbar: GridToolbar,
              }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          </Box>

      </div>
    );
}
