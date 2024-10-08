import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import ViewListIcon from '@mui/icons-material/ViewList';

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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const CreateFooterAddress = () => {
  const [html, setHtml] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    tittle_name: '',
    address: '',
    mobile_no: '',
    contenttype: 0,
    footertype:3,
    languagetype: '',
  });
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateForm = () => {
    const newErrors = {};

    if (!formData.tittle_name) {
      newErrors.tittle_name = 'Title is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.title_name.trim())) {
      newErrors.tittle_name = 'Name should contain alphabets only';
    }

    if (!formData.mobile_no) {
      newErrors.mobile_no = "Please enter your mobile number";
    } else if (!/^(\+91|\+91\-|0)?[789]\d{9}$/.test(formData.mobile_no)) {
      newErrors.mobile_no = "Please enter a valid 10-digit phone number ";
    }
  
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }
    if (!formData.languagetype ) {
      newErrors.languagetype = 'Select a Language';
    }
  

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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
        formDataToSend.append('address', formData.address);
        formDataToSend.append('mobile_no', formData.mobile_no);
        formDataToSend.append('footertype', formData.footertype);
        formDataToSend.append('contenttype', formData.contenttype);
        formDataToSend.append('languagetype', formData.languagetype);
        const response = await apiClient.post(apis.newfooter, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setModalMessage('Data saved successfully!');
        setSnackbarOpen(true);

        // Clear the form fields
        setFormData({
          tittle_name: '',
          address: '',
          mobile_no: '',
          languagetype: '',
        });
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized access. Please log in.');
      } else {
      
        toast.error('Something Went Wrong!');
        console.error('Error saving/updating data:', error);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <div class="pagetitle-lft">
            <h1>Create Footer Address</h1>
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">Home</li>
                <li class="breadcrumb-item">Footer</li>
                <li class="breadcrumb-item active">Create Footer Address</li>
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
          <div className="row justify-content-center">
            <div class="card">
              <div class="card-body">
                <div class="mb-3 mt-md-4">
                  <div className="col-md-12">
                    <div className="box-sec">
                      <div className="mb-3">
                        <h1 className="text-center heading-main">
                          Office Address
                        </h1>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Language Type
                        </label>
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
                        {errors.languagetype && (
                          <div className="text-danger">
                            {errors.languagetype}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Enter Title
                        </label>
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
                        <label className="form-label text-dark">Address</label>
                        <textarea
                          className="form-control"
                          type="text"
                          placeholder="Address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                        {errors.address && (
                          <div className="text-danger">{errors.address}</div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-dark">Phone No</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Phone No"
                          name="mobile_no"
                          value={formData.mobile_no}
                          onChange={handleInputChange}
                          maxLength={10}
                          minLength={10}
                        />
                        {errors.mobile_no && (
                          <div className="text-danger">{errors.mobile_no}</div>
                        )}
                      </div>

                      <div className="btnsubmit">
                        <button
                          className="btn btn-primary"
                          onClick={handleOpenConfirmation}
                        >
                          Submit
                        </button>

                        <Dialog
                          open={confirmDialogOpen}
                          onClose={handleCloseConfirmation}
                        >
                          <DialogTitle>Confirm Submit</DialogTitle>
                          <DialogContent>
                            Are you sure you want to submit this data?
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={handleCloseConfirmation}
                              color="primary"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleConfirmSubmit}
                              color="primary"
                            >
                              Confirm
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Snackbar
                          open={snackbarOpen}
                          autoHideDuration={3000} // Adjust as needed
                          onClose={() => setSnackbarOpen(false)}
                        >
                          <Alert
                            severity="success"
                            onClose={() => setSnackbarOpen(false)}
                          >
                            {modalMessage}
                          </Alert>
                        </Snackbar>
                        <ToastContainer/>
                      </div>
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
