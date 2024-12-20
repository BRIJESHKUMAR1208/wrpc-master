import React, { useEffect, useState } from 'react';
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


export default function FormDataOne() {

    const [apiData, setApiData] = useState([]);


    const columns = [
        { field: "idd", headerName: "S.No", width: 50 },
        { field: "candidate_name", headerName: " Candidate Name" },
        { field: "candidate_email", headerName: "Candidate Email" },
        { field: "candidate_address", headerName: "Candidate Address" },
        { field: "candidate_mobile_no", headerName: "Candidate  Mobile No." },
        
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

        fetchData();
    }, []);
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
           <h1>TRIPPING COMPLIANCE OF PCM DISCUSSIONS</h1>
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
