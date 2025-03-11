import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';

import { Link } from 'react-router-dom';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { format } from 'date-fns';
import { CSVLink } from 'react-csv';

export default function FormWeekly() {
    const [apiData, setApiData] = useState([]);
     const [exportData, setExportData] = useState([]); // For data export


    const columns = [
        { field: "id", headerName: "S.No", width: 50 },
        { field: "name", headerName: " Candidate Name",width: 150 },
        { field: "email", headerName: "Candidate Email",width: 200 },
        { field: "address", headerName: "Candidate Address",width: 200 },
        { field: "mobile_no", headerName: "Candidate  Mobile No." ,width: 150},
        {
            field: "View form data",
            headerName: "View For Data",
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <Link to={'/feedback/formweekly/'+params.row.sno}>
                <InsertDriveFileIcon style={{ cursor: 'pointer' }} />
            </Link>
            ),
        }
    ];



    useEffect(() => {
        async function fetchData() {
            try {
              
                const response = await apiClient.get('/api/FormReports/WeeklyCandidatedata');
                const dataWithIds = response.data.map((row, index) => ({ id: index+1, ...row }));
                setApiData(dataWithIds);
              

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

           // Fetch data for export 
                                                 async function fetchExportData() {
                                                  try {
                                                      const response = await apiClient.get(`/api/Weeklyaccount`); // API call
                                                      const formattedData = response.data.map(item => ({
                                                          'Weekly account': item.weekly_account,
                                                          'Account period start week date': `\u200B${format(new Date(item.account_period_start_week_date), "yyyy-MM-dd")}`,
                                                          'Account period end week date': `\u200B${format(new Date(item.account_period_end_week_date), "yyyy-MM-dd")}`,
                                                          'Discrepancy period date': `\u200B${format(new Date(item.discrepancy_period_date), "yyyy-MM-dd")}`,
                                                          'Discrepancy period blocks': item.discrepancy_period_blocks,
                                                          'Discrepancy reason': item.discrepancy_reason,
                                                          'Isresolved': item.isresolved,
                                                          'Reasons': item.reasons,
                                                          
                                                          
                                                     
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
     
      { label: 'Weekly account', key: 'Weekly account' },
      { label: 'Account period start week date (\'yyyy-mm-dd\')', key: 'Account period start week date' },
      { label: 'Account period end week date (\'yyyy-mm-dd\')', key: 'Account period end week date' },
      { label: 'Discrepancy period date (\'yyyy-mm-dd\')', key: 'Discrepancy period date' },


      { label: 'Discrepancy period blocks', key: 'Discrepancy period blocks' },
      { label: 'Discrepancy reason', key: 'Discrepancy reason' },
      { label: 'Isresolved', key: 'Isresolved' },
      { label: 'Reasons', key: 'Reasons' },
     
      
  ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4> WEEKLY ACCOUNT DATA</h4>
                                                                            <CSVLink
                                                                                data={exportData}
                                                                                headers={headers}
                                                                                filename={"Weeklyaccount.csv"}
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
                                                                                    📥 Download Weekly Account                                                          </button>
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
