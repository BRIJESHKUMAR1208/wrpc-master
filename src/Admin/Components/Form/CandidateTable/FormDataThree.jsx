import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';
import { Link } from 'react-router-dom';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { format } from 'date-fns';
import { CSVLink } from 'react-csv';



export default function FormDataThree() {
    const [apiData, setApiData] = useState([]);
     const [exportData, setExportData] = useState([]); // For data export
  

    const columns = [
        { field: "idd", headerName: "S.No", width: 50 },
        { field: "candidate_name", headerName: " Candidate Name" ,width: 200},
        { field: "candidate_email", headerName: "Candidate Email" ,width: 200},
        { field: "candidate_address", headerName: "Candidate Address",width: 200 },
        { field: "candidate_mobile_no", headerName: "Candidate  Mobile No.",width: 200 },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            renderCell: (params) => (
                <Link to={'/feedback/formthree/'+params.row.id}>
                <InsertDriveFileIcon style={{ cursor: 'pointer' }} />
            </Link>
            ),
        },
      
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiClient.get('/api/FormReports/GetTtppaobservation');
                const dataWithIds = response.data.map((row, index) => ({ idd: index+1, ...row }));
                setApiData(dataWithIds);
              

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

         // Fetch data for export 
                         async function fetchExportData() {
                          try {
                              const response = await apiClient.get(`/api/TPPAObservations/Part1`); // API call
                              const formattedData = response.data.map(item => ({
                                  'Station name': item.station_name,
                                  'Kv level': item.kv_level,
                                  'Owner': item.owner,
                                  'Location': item.location,
                                  'Planned date of audit': `\u200B${format(new Date(item.planned_date_of_audit), "yyyy-MM-dd")}`,
                                  'Date of audit': `\u200B${format(new Date(item.date_of_audit), "yyyy-MM-dd")}`,
                                  'Audit entity': item.audit_entity,
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
     
      { label: 'Station name', key: 'Station name' },
      { label: 'Kv level', key: 'Kv level' },
      { label: 'Owner', key: 'Owner' },
      { label: 'Location', key: 'Location' },
      { label: 'Planned date of audit (\'yyyy-mm-dd\')', key: 'Planned date of audit' },
      { label: 'Date of audit (\'yyyy-mm-dd\')', key: 'Date of audit' },
      { label: 'Audit entity', key: 'Audit entity' },
      
  ];


    const exportToExcel = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'PCMdiscussion';
  
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };
    

    return (
        <div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
           <h4>TPPA OBSERVATION</h4>
                                              <CSVLink
                                                  data={exportData}
                                                  headers={headers}
                                                  filename={"Tppaobservation.csv"}
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
                                                      📥 Download Tppa Observation
                                                  </button>
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
