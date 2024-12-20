import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';

import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import { Link } from 'react-router-dom';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function FormDataTwo() {
    const [apiData, setApiData] = useState([]);


    const columns = [
        { field: "id", headerName: "S.No", width: 50 },
        { field: "candidate_name", headerName: " Candidate Name" },
        { field: "candidate_email", headerName: "Candidate Email" },
        { field: "candidate_address", headerName: "Candidate Address" },
        { field: "candidate_mobile_no", headerName: "Candidate  Mobile No." },
        
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            renderCell: (params) => (
             <Link to={'/feedback/formtwo/'+params.row.sr_no}>
                    <InsertDriveFileIcon style={{ cursor: 'pointer' }} />
                </Link>
            ),
        },
        
    ];



    useEffect(() => {
        async function fetchData() {
            try {   
                const response = await apiClient.get('/api/FormReports/Get_tppa_monitoring');
                const dataWithIds = response.data.map((row, index) => ({ id: index, ...row }));
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
           <h1>TPPA PLAN & MONITORING</h1>
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
                },
              }}
            />
          </Box>

      </div>
    );
}
