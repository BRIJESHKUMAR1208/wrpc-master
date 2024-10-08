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
import apiClient from '../../../Api/ApiClient';
import apis from '../../../Api/api.json';

export default function BannerTable() {
    const [apiData, setApiData] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const columns = [
        { field: 1, headerName: "S.No", width: 50 },
        { field: "imgpath", headerName: "Image", 
          // Render the image using an <img> element
          width: 100,
          height:300,
          renderCell: (params) => (
            <img src={params.row.imgpath} alt="Image" style={{ width: '100%', height: '100%' }} />
          ),
        },
        { field: "u_content", headerName: "Content data" },
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
            await apiClient.post('/api/Slider/delete/' + selectedItem.u_id);
            setApiData((prevData) => prevData.filter((item) => item.u_id !== selectedItem.u_id));
            setIsDeleting(false);
            setModalMessage('Data deleted successfully');
            setSnackbarOpen(true);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Unauthorized access. Please log in.');
              } else {
              
                toast.error('Something Went Wrong!');
                console.error('Error saving/updating data:', error);
              }
        } finally {
            setConfirmDialogOpen(false);
        }
    };

    const handleCloseConfirmation = () => {
        setConfirmDialogOpen(false);
    };
    const generateSerialNumbers = () => {
    return apiData.map((_, index) => ({ id: index + 1, ...apiData[index] }));
}

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiClient.get(apis.getimage);
                const dataWithIds = response.data.map((row, index) => ({ id: index, ...row }));
                setApiData(dataWithIds);
              

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
      <>
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
            <ToastContainer/>
            </>
    );
}
