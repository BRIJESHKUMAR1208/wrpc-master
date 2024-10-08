import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import JoditEditor from "jodit-react";
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import {
  Button,
  Snackbar,
  DialogTitle, // Add this import
  DialogContent,
  Dialog,
} from '@mui/material';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';
import { Col, Row } from 'react-bootstrap';
import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';

function EAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

export const CreateMenu = () => {
  const [html, setHtml] = useState('');
  const [file, setFile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const config = useMemo(
    () => ({
      readonly: false
    }),
    []
  );

  const onChange = useCallback((newContent) => {

    setContent(newContent);
  }, []);

  // const handleEditorChange = (content) => {
  //   setEditorContent(content);
  // };

  const [formData, setFormData] = useState({
    MenuName: '',
    ContentType: '',
    external_link: '',
    internal_link: '',
    submenu_id: 0,
    file: '',
    html: '',
    languagetype:'',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      MenuName: '',
      ContentType: '',
      external_link: '',
      internal_link: '',
      submenu_id: 0,
      file: '',
      html: '',
      languagetype:'',
    });
  }, []);

  const handleEditorChange = (content) => {
    setHtml(content);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.MenuName) {
      newErrors.MenuName = 'Name is required';
    }
    if (!formData.MenuName ) {
      errors.MenuName = 'Please enter your Menu Name';
    } else if (!/^[A-Za-z ]+$/.test(formData.MenuName) && parseInt(formData.languagetype) == 1) {
      errors.MenuName = 'Please input alphabet characters only';
    }else if (!/^[\u0900-\u097F\s]+$/.test(formData.MenuName) && parseInt(formData.languagetype) == 2) {
      errors.MenuName = 'कृपया केवल हिंदी शब्द ही इनपुट करें';
    }

    if (!formData.ContentType) {
      newErrors.ContentType = 'Select a content type';
    }
    if (!formData.languagetype) {
      newErrors.languagetype = 'Select a Language';
    }

    if (formData.ContentType === '4' && !formData.external_link) {
      newErrors.external_link = 'External Link is required';
    }

  

    if (formData.ContentType === '2') {
      if (!file) {
        newErrors.file = 'File is required';
      } else if (file.type !== 'application/pdf') {
        newErrors.file = 'Only PDF files are allowed';
      }
    }
    


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFile(imageFile);
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: event.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
      formDataToSend.append('MenuName', formData.MenuName);
      formDataToSend.append('ContentType', formData.ContentType);
      formDataToSend.append('MenuUrl', formData.MenuUrl);
      formDataToSend.append('submenu_id', formData.submenu_id);
      formDataToSend.append('languagetype', formData.languagetype);

      if (formData.ContentType === '4') {
        formDataToSend.append('external_link', formData.external_link);
      } else if (formData.ContentType === '3') {
        formDataToSend.append('internal_link', formData.internal_link);
      } else if (formData.ContentType === '2') {
        formDataToSend.append('file', file);
      } else if (formData.ContentType === '1') {
        formDataToSend.append('html', content);
      }

      const response = await apiClient.post(apis.navmenu, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData({
        MenuName: '',
        ContentType: '',
        external_link: '',
        internal_link: '',
  
        submenu_id: 0,
        file: '',
        html: '',
        languagetype:'',
      });
      
      toast.success('Data saved successfully!');
      setModalMessage('Data saved successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  useEffect(() => {
    async function fetchData1() {
      try {
        setLoading(true);
        const response = await apiClient.get(apis.getmenuname);
        setDropdownOptions(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('Unauthorized access. Please log in.');
        } else {
        
          toast.error('Something Went Wrong!');
          console.error('Error saving/updating data:', error);
        }
      }
    }
    fetchData1();
  }, []);
  
  return (
    <div>
                
        <Header/>
        <Sidebar/>
        <main id="main" class="main">

<div class="pagetitle">
<div class="pagetitle-lft">
  <h1>Create Menu</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">Dashboard</li>
      <li class="breadcrumb-item">CMS</li>
      <li class="breadcrumb-item active ">Menu</li>
     
    </ol>
  </nav>
  </div>
  <div className="pagetitle-rgt">
              <Link to ="/dashboard">
              <button type="button" class="btn btn-info">
                Back
              </button>
              </Link>
            </div>
</div>


      

        <div >
          <div className="row justify-content-center">
            <div >
            <div class="card">
          <div class="card-body">
            <div class="mb-3 mt-md-4">
              <div class="box-sec">
                <h1 className="text-center text-dark heading-main">Menu</h1>
                <div className="mb-3">
                  <label className="form-label text-dark">Select a Language</label>
                  <select
                    className="form-select"
                    name="languagetype"
                    value={formData.languagetype}
                    onChange={handleInputChange}
                  >
                    <option value="0">Select a Language</option>
                    <option value="1">English</option>
                    <option value="2">Hindi</option>
                  </select>
                  {errors.languagetype && <div className="text-danger">{errors.languagetype}</div>}
                </div>
                {/* Input for Name */}
                <div className="mb-3">
                  <label className="form-label text-dark">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    name="MenuName"
                    value={formData.MenuName}
                    onChange={handleInputChange}
                    
                  />
                  {errors.MenuName && <div className="text-danger">{errors.MenuName}</div>}
                </div>

                {/* Input for Select a content type */}
                <div className="mb-3">
                  <label className="form-label text-dark">Select a content type</label>
                  <select
                    className="form-select"
                    name="ContentType"
                    value={formData.ContentType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a content type</option>
                    <option value="4">External Link</option>
                    <option value="3">Internal Link</option>
                    <option value="2">File</option>
                    <option value="1">HTML</option>
                  </select>
                  {errors.ContentType && <div className="text-danger">{errors.ContentType}</div>}
                </div>

                {/* Input for External Link */}
                {formData.ContentType === '4' && (
                  <div className="mb-3">
                    <label className="form-label text-dark">Enter External Link</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter External Link"
                      name="external_link"
                      value={formData.external_link}
                      onChange={handleInputChange}
                    />
                    {errors.external_link && <div className="text-danger">{errors.external_link}</div>}
                  </div>
                )}

                {/* Input for Internal Link */}
                {formData.ContentType === '3' && (
                  <div className="mb-3">
                    <select
                      className='form-control'
                      name='internal_link'
                      value={formData.internal_link}
                      onChange={handleInputChange}
                      isInvalid={!!formErrors.internal_link}
                    >
                      <option value='' style={{ color: "black" }}>Select Menu</option>
                      {dropdownOptions.map((data) => (
                        <option key={data.u_id} value={"/menu/" + data.u_menu_url}>
                          {"Menu Name" + ":-" + data.u_menu_name}
                        </option>
                      ))}
                    </select>
                    {errors.internal_link && <div className="text-danger">{errors.internal_link}</div>}
                  </div>
                )}

                {/* Input for File */}
                {formData.ContentType === '2' && (
                  <div className="mb-3">
                    <label className="form-label text-dark">Choose File</label>
                    <input
                      className="form-control"
                      type="file"
                      name="file"
                      onChange={handleImageChange}
                    />
                    {errors.file && <div className="text-danger">{errors.file}</div>}
                  </div>
                )}

                {/* HTML Editor Input */}
                {formData.ContentType === '1' && (
                  <div className="mb-3">
                    <label className="form-label text-dark">HTML Editor</label>
                    <div >
                    </div>
                    <JoditEditor
                      value={content}
                      config={config}
                      tabIndex={1}
                      onChange={onChange}
                    />
                    {errors.editorContent && <div className="text-danger">{errors.editorContent}</div>}
                  </div>
                )}
              </div>
              
            {/* Submit Button */}
            <div className="btnsubmit">
              <button className="btn btn-primary" onClick={handleOpenConfirmation}>
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
                autoHideDuration={3000} // Adjust as needed
                onClose={() => setSnackbarOpen(false)}
              >
                <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                  {modalMessage}
                </Alert>
              </Snackbar>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Adjust as needed
                onClose={() => setSnackbarOpen(false)}
              >
                <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                  Data Save successfully.
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
     
      </main>
      <Footer/>
    </div>
  );
};
