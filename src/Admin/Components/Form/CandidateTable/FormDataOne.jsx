import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';
import { Link } from 'react-router-dom';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { format } from 'date-fns';


export default function FormDataOne() {

    const [apiData, setApiData] = useState([]);
    const [exportData, setExportData] = useState([]); // For data export


    const columns = [
        { field: "idd", headerName: "S.No", width: 50 },
        { field: "candidate_name", headerName: " Candidate Name" ,width: 200},
        { field: "candidate_email", headerName: "Candidate Email" ,width: 200},
        { field: "candidate_address", headerName: "Candidate Address" ,width: 200},
        { field: "candidate_mobile_no", headerName: "Candidate  Mobile No." ,width: 200},
        
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            renderCell: (params) => (
              <Link to={'/feedback/formone/'+params.row.id}>
                    <InsertDriveFileIcon style={{ cursor: 'pointer' }} />
                </Link>
            ),
        },
        
    ];
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiClient.get('/api/FormReports/GetPCMdiscussion');
                const dataWithIds = response.data.map((row, index) => ({ idd: index + 1, ...row }));
                setApiData(dataWithIds);
              

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

         // Fetch data for export (ECR submission data)
         async function fetchExportData() {
          try {
              const response = await apiClient.get(`/api/Tripping_compliance_pcm_discussions`); // API call
              const formattedData = response.data.map(item => ({
                  'Recommendation of pcm': item.recommendation_of_pcm,
                  'Kv level': item.kv_level,
                  'Pcm number': item.pcm_number,
                  'Pcm date': `\u200B${format(new Date(item.pcm_date), "yyyy-MM-dd")}`,
                  'Item no heading': item.item_no_heading,
                  'Tripping date': `\u200B${format(new Date(item.tripping_date), "yyyy-MM-dd")}`,
                  'Owner send': item.owner_send,
                  'Owner rend': item.owner_rend,
                  'Category r': item.category_r,
                  'Category s': item.category_s,
                  'Action taken by utility to allow completion': item.action_taken_by_utility_to_allow_completion,
                  'Date on which attended': `\u200B${format(new Date(item.date_on_which_attended), "yyyy-MM-dd")}`,
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
     
      { label: 'Recommendation of pcm', key: 'Recommendation of pcm' },
      { label: 'Kv level', key: 'Kv level' },
      { label: 'Pcm number', key: 'Pcm number' },
      { label: 'Pcm date (\'yyyy-mm-dd\')', key: 'Pcm date' },
      { label: 'Item no heading', key: 'Item no heading' },
      { label: 'Tripping date (\'yyyy-mm-dd\')', key: 'Tripping date' },
      { label: 'Owner send', key: 'Owner send' },
      { label: 'Owner rend', key: 'Owner rend' },
      { label: 'Category r', key: 'Category r' },
      { label: 'Category s', key: 'Category s' },
      { label: 'Action taken by utility to allow completion', key: 'Action taken by utility to allow completion' },
      { label: 'Date on which attended (\'yyyy-mm-dd\')', key: 'Date on which attended' },
      { label: 'Remarks', key: 'Remarks' },
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
             <h4>TRIPPING COMPLIANCE OF PCM DISCUSSIONS</h4>
                          <CSVLink
                              data={exportData}
                              headers={headers}
                              filename={"Trippingcompliance.csv"}
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
                                  📥 Download compliance Data
                              </button>
                          </CSVLink>
                      </div>
          
          <Box sx={{ height: 400, width: "100%" }}>
            <button onClick={exportToExcel}>Export to Excel</button>
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
                  addOnClick: () => exportToExcel()
                },
              }}
            />
          </Box>

      </div>
    );
}
