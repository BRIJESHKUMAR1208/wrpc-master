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
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import AddIcon from '@mui/icons-material/Add';

export default function CommericalTable() {
    const [apiData, setApiData] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const columns = [
        { field: "id", headerName: "S.No", width: 50 },
        { field: "name", headerName: "NAME " },
        { field: "start_date", headerName: "Start Date" },
        { field: "end_date", headerName: "End Date" },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            renderCell: (params) => (
              <Link to={'/services/editcommercial/'+params.row.id}>
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
            await apiClient.post("/api/Commercial/delete/"+ selectedItem.id);
            setApiData((prevData) => prevData.filter((item) => item.id !== selectedItem.id));
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
              // console.log("xyz",apiClient)
                const response = await apiClient.get(apis.commerical,{
                  headers:{
                   // Authorization:""
                    Authorization: 'Bearer ' + localStorage.getItem("token")
                    
                  }
                });
                console.log("Response: authorization", response);

                const dataWithIds = response.data.map((row, index) => ({ id: index, ...row }));
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
              <h1 className="maintitle">ALL Commerical</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item">Services</li>
                  <li className="breadcrumb-item active">Commerical</li>
                </ol>
              </nav>
            </div>
            <div class="pagetitle-rgt">
              <Link to="/dashboard">
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
              <Link to="/services/commerical">
                <p>
                  <AddIcon />
                  create commerical
                </p>
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
