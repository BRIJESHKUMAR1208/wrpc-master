import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';

import { Link } from 'react-router-dom';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function FormDataFour() {
    const [apiData, setApiData] = useState([]);


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

        fetchData();
    }, []);

    return (
        <div>
           <h1>RELAY SETTINGS DATA</h1>
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
