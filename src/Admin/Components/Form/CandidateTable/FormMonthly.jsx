import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';

import { Link } from 'react-router-dom';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { format } from 'date-fns';
import { CSVLink } from 'react-csv';

export default function FormMonthly() {
  const [apiData, setApiData] = useState([]);
  const [exportData, setExportData] = useState([]); // For data export


  const columns = [
    { field: "idd", headerName: "S.No", width: 50 },
    { field: "name", headerName: " Candidate Name", width: 150 },
    { field: "email", headerName: "Candidate Email", width: 200 },
    { field: "address", headerName: "Candidate Address", width: 200 },
    { field: "mobile_no", headerName: "Candidate  Mobile No.", width: 150 },
    {
      field: "View form data",
      headerName: "View For Data",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <Link to={'/feedback/formmonthly/' + params.row.id}>
          <InsertDriveFileIcon style={{ cursor: 'pointer' }} />
        </Link>
      ),
    }
  ];



  useEffect(() => {
    async function fetchData() {
      try {
        debugger;
        const response = await apiClient.get('/api/FormReports/MonthlyCandidatedata');
        const dataWithIds = response.data.map((row, index) => ({ idd: index + 1, ...row }));
        setApiData(dataWithIds);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Fetch data for export 
    async function fetchExportData() {
      try {
        const response = await apiClient.get(`/api/Monthlyaccount`); // API call
        const formattedData = response.data.map(item => ({
          'Pool member': item.poolmember,
          'Discrepancy period blocks': item.discrepancy_period_blocks,
          'Discrepancymonth': item.discrepancymonth,
          'Discrepancydate': `\u200B${format(new Date(item.discrepancydate), "yyyy-MM-dd")}`,
          'Summarysheet': item.summarysheet,
          'Discrepancyreason': item.discrepancyreason,
          'Remark': item.remark,
          'Reason': item.reason,



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

    { label: 'Pool member', key: 'Pool member' },
    { label: 'Discrepancy period blocks', key: 'Discrepancy period blocks' },
    { label: 'Discrepancymonth', key: 'Discrepancymonth' },
    { label: 'Discrepancydate (\'yyyy-mm-dd\')', key: 'Discrepancydate' },
    { label: 'Summarysheet', key: 'Summarysheet' },
    { label: 'Discrepancyreason', key: 'Discrepancyreason' },
    { label: 'Remark', key: 'Remark' },
    { label: 'Reason', key: 'Reason' },

  ];


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h4>MONTHLY ACCOUNT DATA</h4>
        <CSVLink
          data={exportData}
          headers={headers}
          filename={"Monthlyaccount.csv"}
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
            📥 Download Monthly Account                                                          </button>
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
