import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import {
    getLinks,
    getTender,
    getReport,
    getwhatsnew,
    getMenuoptins, BASE_URL
  } from "../../../../Api/ApiFunctions.jsx";
//import {getReport} from "../../../Api/ApiFunctions";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import apiClient from '../../../../Api/ApiClient';
import api from '../../../../Api/api.json';
import Footer from '../../footer/Footer';
import AddIcon from '@mui/icons-material/Add';
import './ReportTable.scss'

export default function ReportTable() {
    const [apiData, setApiData] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const columns = [
        { field: "id", headerName: "S.No", width: 50 }
       ,
        { field: "u_report_tittle", headerName: "Title" ,width: 200},
        { field: "u_startdate", headerName: "Start Date",width: 120 },
        { field: "u_end_date", headerName: "End date",width: 120 },
        { field: "u_file ", headerName: "File",width: 200 },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            renderCell: (params) => (
                <Link to={'/services/editreport/'+params.row.u_id}>
                    <EditIcon style={{ cursor: 'pointer' }} />
                </Link>
            ),
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            renderCell: (params) => (
                <DeleteIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDeleteClick(params.row)}
                />
            ),
        }
    ];

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setConfirmDialogOpen(true);
    };

    const handleConfirmSubmit = async () => {
        try {
            await apiClient.delete("/api/Reports/delete/" + selectedItem.u_id);
            setApiData((prevData) => prevData.filter((item) => item.u_id !== selectedItem.u_id));
            setIsDeleting(false);
            setModalMessage('Data deleted successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting data:', error);
        } finally {
            setConfirmDialogOpen(false);
        }
    };

    const handleCloseConfirmation = () => {
        setConfirmDialogOpen(false);
    };

    useEffect(() => {
        async function fetchData() {
            
            try {
                const response = await apiClient.get(api.getreport);
                //const response = await getReport();
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
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                <div class="pagetitle-lft">
                    <h1 className='maintitle'>All Report</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Home</li>
                            <li className="breadcrumb-item">Service</li>
                            <li className="breadcrumb-item active">All Report </li>
                        </ol>
                    </nav>
</div>
<div class="pagetitle-rgt">
      <Link to='/dashboard'>
              <button type="button" class="btn btn-info">
                Back
              </button>
            </Link>
          </div>
                </div>
                <div className="header-box">
                <div className="header-box-lft"> 
                <h1 className="maintitle">Table</h1>
                </div>
                <div className="header-box-rgt">
                    <Link to='/services/createreport'>
                    <p><AddIcon/> New Report</p>
                    </Link>
                </div>
                </div>
                <Box sx={{ height: 400, width: '100%' }}>
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
            </main>
            <Footer/>
            <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmation}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this data?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmSubmit} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            >
                <MuiAlert severity="success" onClose={() => setSnackbarOpen(false)}>
                    {modalMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}
