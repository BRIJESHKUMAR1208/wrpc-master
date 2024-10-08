import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';

import { Link } from 'react-router-dom';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function FormDataFive() {
    const [apiData, setApiData] = useState([]);


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

        fetchData();
    }, []);

    return (
        <div>
           <h1>PERFORMANCE DATA</h1>
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
