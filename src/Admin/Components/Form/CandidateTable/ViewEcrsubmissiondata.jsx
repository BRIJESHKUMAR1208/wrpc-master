import React, { useEffect, useState, useRef } from 'react';
import { CSVLink } from 'react-csv';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';
import { Link } from 'react-router-dom';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { format } from 'date-fns';

export default function Ecrsubmissionlist() {
    const [apiData, setApiData] = useState([]); // For candidate details (filtered)
    const [exportData, setExportData] = useState([]); // For CSV export
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const csvLinkRef = useRef();
    const allCandidateData = useRef([]); // Store all data once

    // Initial fetch of all candidate data
    useEffect(() => {
        async function fetchColumnsData() {
            try {
                const response = await apiClient.get('/api/FormReports/ECRsubmissiondata');
                const dataWithIds = response.data.map((row, index) => ({ id: index + 1, ...row }));
                allCandidateData.current = dataWithIds;
                setApiData(dataWithIds); // Show full list initially
            } catch (error) {
                console.error('Error fetching candidate details:', error);
            }
        }
        fetchColumnsData();
    }, []);
const toDateOnly = (dateStr) => {
    const date = new Date(dateStr);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

    // Filter candidate data on date change
    useEffect(() => {
        if (!fromDate || !toDate) {
            setApiData(allCandidateData.current); // Show all if no dates
            return;
        }

        const selectedFromOnly = toDateOnly(fromDate);
const selectedToOnly = toDateOnly(toDate);

        const filtered = allCandidateData.current.filter(item => {
    const itemFrom = toDateOnly(item.fromdate);
    const itemTo = toDateOnly(item.todate);
    return itemFrom >= selectedFromOnly && itemTo <= selectedToOnly;
});


        setApiData(filtered);
    }, [fromDate, toDate]);

    // Export ECR data
    const fetchExportData = async () => {
        if (!fromDate || !toDate) {
            alert('❌ Please select both From Date and To Date before downloading.');
            return;
        }

        try {
            const response = await apiClient.get(`/api/ECRsubmission/GetEcrbetweendate/${fromDate}/${toDate}`);
            if (!response.data || response.data.length === 0) {
                alert('No data available for the selected date range.');
                setExportData([]);
                return;
            }

            const formattedData = response.data.map(item => ({
                'From Date': `\u200B${format(new Date(item.fromdate), "yyyy-MM-dd")}`,
                'To Date': `\u200B${format(new Date(item.todate), "yyyy-MM-dd")}`,
                'Type': item.type,
                'From Utility': item.entityname,
                'Sub Entities': item.subentityname?.toLowerCase() !== 'null' ? item.subentityname : '-',
                'To Utility': item.beneficiary,
                'Approval No': item.approvalnumber,
                'Energy MW': item.installedcapacity,
                'PPA Rate (paisa/Kwh)': item.ppa_rate
            }));

            setExportData(formattedData);

            // Trigger CSV download
            setTimeout(() => {
                csvLinkRef.current.link.click();
            }, 0);

        } catch (error) {
            console.error('Error fetching export data:', error);
            alert('Error fetching data. Please try again.');
        }
    };

    const headers = [
        { label: 'From Date (\'yyyy-mm-dd\')', key: 'From Date' },
        { label: 'To Date (\'yyyy-mm-dd\')', key: 'To Date' },
        { label: 'Type(GNA/TGNA)', key: 'Type' },
        { label: 'From Utility', key: 'From Utility' },
        {label:'Sub Entities (as per WRLDC Gen_sdl file )', key:'Sub Entities'},
        { label: 'To Utility', key: 'To Utility' },
        { label: 'Approval No', key: 'Approval No' },
        { label: 'PPA_rate(Rs./MWHr)', key: 'PPA Rate (paisa/Kwh)' },
        { label: 'Energy(MW)', key: 'Energy MW' }
    ];

    const gridColumns = [
        { field: "id", headerName: "S.No", width: 50 },
        { field: "candidate_name", headerName: "Candidate Name", width: 200 },
        { field: "candidate_email", headerName: "Candidate Email", width: 200 },
        { field: "candidate_address", headerName: "Candidate Address", width: 200 },
        { field: "candidate_mobile_no", headerName: "Candidate Mobile No.", width: 200 },
        {
            field: "View form data",
            headerName: "View Form Data",
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <Link to={'/feedback/formsix/' + params.row.id}>
                    <InsertDriveFileIcon style={{ cursor: 'pointer' }} />
                </Link>
            ),
        }
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4>ECR Submission Data</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        style={{ padding: '5px' }}
                    />
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        style={{ padding: '5px' }}
                    />
                    <button
                        onClick={fetchExportData}
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
                        📥 Download ECR Data
                    </button>
                    <CSVLink
                        data={exportData}
                        headers={headers}
                        filename={"ECRsubmissiondata.csv"}
                        target="_blank"
                        className="hidden"
                        ref={csvLinkRef}
                    />
                </div>
            </div>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={apiData}
                    columns={gridColumns}
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
