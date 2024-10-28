import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
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
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header'
import { BASE_URL } from '../../../Api/ApiFunctions';
import Footer from '../footer/Footer'; 
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function LivestreamingTable() {
    const [apiData, setApiData] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const columns = [
        { field: "id", headerName: "S.No", width: 50 }
       ,
        { field: "titlename", headerName: "Title " ,width: 600},
        {
            field: "titlefilepath",
            headerName: "View Document",
            sortable: false,
            width: 150,
            renderCell: (params) => (
                params.row.titlefilepath ? (
                    <a href={`${BASE_URL}${params.row.titlefilepath}`} target="_blank" rel="noopener noreferrer">
                        <VisibilityIcon style={{ cursor: 'pointer' }} />
                    </a>
                ) : (
                    <span>No Document</span>
                )
            ),
        },
        // {
        //     field: "edit",
        //     headerName: "Edit",
        //     sortable: false,
        //     renderCell: (params) => (
        //         <Link to={'/footer/editfooter/'+params.row.id}>
        //             <EditIcon style={{ cursor: 'pointer' }} />
        //         </Link>
        //     ),
        // },
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
            await apiClient.post("/api/Livestreaming/delete/"+ selectedItem.id);
            setApiData((prevData) => prevData.filter((item) => item.id !== selectedItem.id));
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
                const response = await apiClient.get(apis.Livestreaming);
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
              <h1>Create Footer</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item">Footer</li>
                  <li className="breadcrumb-item active">
                    Create Footer Address
                  </li>
                </ol>
              </nav>
            </div>
            <div class="pagetitle-rgt">
              <Link to ="/dashboard">
                <button type="button" class="btn btn-info">
                  Back
                </button>
                </Link>
            </div>
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
