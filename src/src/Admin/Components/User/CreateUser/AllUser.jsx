import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
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
import './AllUser.scss';
import Footer from '../../footer/Footer';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

export default function AllUser() {
    const [apiData, setApiData] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    // const userRole = 'admin'
     ;
    const storedUserString = localStorage.getItem("user");
    const user = JSON.parse(storedUserString);

    const columns = [
        { field: "id", headerName: "S.No", width: 50 }
       ,
        { field: "user_name", headerName: "name" ,width: 200},
        { field: "user_email", headerName: "Email",width: 200 },
        { field: "user_mobile_no", headerName: "Mobile  No",width: 200 },
        { field: "user_address", headerName: "Address",width: 200 },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            renderCell: (params) => (
                user.usertype === 1  || null ? ( // Check the user role here
                    <Link to={'/user/edituser/' + params.row.users_id}>
                        <EditIcon style={{ cursor: 'pointer' }} />
                    </Link>
                ) : (
                    <DesignServicesIcon
                        style={{ cursor: 'no-drop',color:'red'  }}
                        disabled
                    />
                )
            ),
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            renderCell: (params) => (
                user.usertype === 1 || null ? (
                    <DeleteIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteClick(params.row)}
                    />
                ) : (
                    <DeleteIcon
                        style={{ cursor: 'no-drop',color:'red' }}
                        disabled
                    />
                )
            ),
        }
    ];

    const handleDeleteClick = (item) => {
         ;
        setSelectedItem(item);
        setConfirmDialogOpen(true);
    };

    const handleConfirmSubmit = async () => {
        try {
            await apiClient.post("/api/user/delete/"+ selectedItem.users_id);
            setApiData((prevData) => prevData.filter((item) => item.users_id !== selectedItem.users_id));
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
                const response = await apiClient.get(api.newuser);
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
                    <div className="pagetitle-lft">
                    <h1>All User</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Home</li>
                            <li className="breadcrumb-item">User</li>
                            <li className="breadcrumb-item active">All User </li>
                        </ol>
                    </nav>
                    </div>
                    <div className="pagetitle-rgt">
                        <Link to='/dashboard'>
                        <button type="button"  class="btn btn-info">Back</button>
                        </Link>
                    </div>
                </div>
                <Box sx={{ height: 400, width: '100%' }}style={{backgroundColor:"#fff"}}>
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
            <Footer />
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
