import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from 'react-router-dom';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import HomeIcon from '@mui/icons-material/Home';
import {

  Button,
  Snackbar,
  DialogTitle,
  DialogContent,
  Dialog,
} from '@mui/material';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import Footer from '../../footer/Footer';




export const CreateFooterService = () => {
  const [html, sethtml] = useState('');
  const [file, setselectedfile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    tittle_name: '',
    description: '',
    footertype:2,
    contenttype:0,
    languagetype: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      tittle_name: '',
      description: '',
      footertype:2,
      contenttype:0,
      languagetype: '',
    });
  }, []);

 
    const validateForm = () => {
      const errors = {};
  
      // Regular expression to match names with alphabets and spaces
      const namePattern = /^[a-zA-Z\s]+$/;
  
      if (!formData.tittle_name) {
        errors.tittle_name = 'Name is required';
      } else if (!formData.tittle_name.match(namePattern)) {
        errors.tittle_name = 'Name should only contain alphabets and spaces';
      }
      if (!formData.languagetype ) {
        errors.languagetype = 'Select a Language';
      }
  
      if (!formData.description) {
        errors.description = 'Description is required';
      }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };


  const handleInputChange = (event) => {
    const { name, value} = event.target;

  
    
      setFormData({
        ...formData,
        [name]: value,
      });
    
  };

  const handleOpenConfirmation = () => {
    if (validateForm()) {
      setConfirmDialogOpen(true);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmSubmit = async () => {
    handleCloseConfirmation();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('tittle_name', formData.tittle_name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('footertype', formData.footertype);
      formDataToSend.append('contenttype', formData.contenttype);
      formDataToSend.append('languagetype', formData.languagetype);

      const response = await apiClient.post(apis.newfooter, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
      toast.success('Data saved successfully!');
      setModalMessage('Data saved successfully!');
      setSnackbarOpen(true);

      setFormData({
        tittle_name: '',
        description: '',
       
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
    <Header />
    <Sidebar />
  <main id="main" class="main">
    <div class="pagetitle">
    <div class="pagetitle-lft">
      <h1>Create Footer Service</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Home</li>
          <li class="breadcrumb-item">Footer</li>
          <li class="breadcrumb-item active">Create Footer Service</li>
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
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="col text-end">
            
          </div>
        </div>
      </div>
      {/* <div className="main-body"> */}
      <div className="row justify-content-center">
        <div className="col-md-12">
<div class="card"><div class="card-body"><div class="mb-3 mt-md-4"></div>
<div className="box-sec">
        <div className="mb-3">
        <h1 className="text-center heading-main">Footer Service</h1>
          </div>
          <div className="mb-3">
                  <label className="form-label text-dark">Language Type</label>
                  <select
                    className="form-select"
                    name="languagetype"
                    value={formData.languagetype}
                    onChange={handleInputChange}
                  >
                    <option value=" ">Select a Language</option>
                    <option value="1">English</option>
                    <option value="2">Hindi</option>
                  </select>
                  {errors.languagetype && <div className="text-danger">{errors.languagetype}</div>}
                </div>
          <div className="mb-3">
            <label className="form-label text-dark">Enter Title</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="tittle_name"
              value={formData.tittle_name}
              onChange={handleInputChange}
            />
            {errors.tittle_name && (
              <div className="text-danger">{errors.tittle_name}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Description</label>
            <textarea
              className="form-control"
              type="text"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            {errors.description && (
              <div className="text-danger">{errors.description}</div>
            )}
          </div>
          <div className="btnsubmit">
            <button
              className="btn btn-primary"
              onClick={handleOpenConfirmation}
            >
              Submit
            </button>
           
            <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmation}>
              <DialogTitle>Confirm Submit</DialogTitle>
              <DialogContent>
                Are you sure you want to submit this data?
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
              <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                {modalMessage}
              </Alert>
            </Snackbar>
          </div>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </main>
    <Footer />
    </div>
  );
};
