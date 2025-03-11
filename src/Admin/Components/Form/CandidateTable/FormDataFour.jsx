import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';

import { Link } from 'react-router-dom';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { format } from 'date-fns';
import { CSVLink } from 'react-csv';


export default function FormDataFour() {
    const [apiData, setApiData] = useState([]);
     const [exportData, setExportData] = useState([]); // For data export


    const columns = [
        { field: "id", headerName: "S.No", width: 50 },
        { field: "candidate_name", headerName: " Candidate Name",width:200 },
        { field: "candidate_email", headerName: "Candidate Email",width: 200 },
        { field: "candidate_address", headerName: "Candidate Address",width: 200 },
        { field: "candidate_mobile_no", headerName: "Candidate  Mobile No.",width: 200 },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            renderCell: (params) => (
                <Link to={'/feedback/formfour/'+params.row.s_no}>
                <InsertDriveFileIcon style={{ cursor: 'pointer' }} />
            </Link>
            ),
        },
       
    ];



    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiClient.get('/api/FormReports/Get_relay_settings');
                const dataWithIds = response.data.map((row, index) => ({ id: index+1, ...row }));
                setApiData(dataWithIds);
              

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

          // Fetch data for export 
                                 async function fetchExportData() {
                                  try {
                                      const response = await apiClient.get(`/api/FormReports/Get_relay_settings`); // API call
                                      const formattedData = response.data.map(item => ({
                                          'Substation': item.substation,
                                          'Kv level': item.kv_level,
                                          'Owner': item.owner,
                                          'Name of element': item.name_of_element,
                                          'Protection typetext': item.protection_typetext,
                                          'Make of relay': item.make_of_relay,
                                          'Sr no of relay': item.sr_no_of_relay,
                                          'Remarks': item.remarks,
                                          
                                     
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
     
      { label: 'Substation', key: 'Substation' },
      { label: 'Kv level', key: 'Kv level' },
      { label: 'Owner', key: 'Owner' },
      { label: 'Name of element', key: 'Name of element' },
      { label: 'Protection typetext', key: 'Protection typetext' },
      { label: 'Make of relay', key: 'Make of relay' },
      { label: 'Sr no of relay', key: 'Sr no of relay' },
      { label: 'Remarks', key: 'Remarks' },
      
  ];


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4>RELAY SETTINGS DATA</h4>
                                                        <CSVLink
                                                            data={exportData}
                                                            headers={headers}
                                                            filename={"Relaysetting.csv"}
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
                                                                📥 Download relay setting                                                            </button>
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
