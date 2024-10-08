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
import apiClient from '../../../Api/ApiClient';
import apis from '../../../Api/api.json';
import { Col, Row } from 'react-bootstrap';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

function EAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

export const Customepage = () => {
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
    console.log("Editor content changed:", newContent);
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
    languagetype: '',
    submenu_id: 0,
    file: '',
    html: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      MenuName: '',
      ContentType: '',
      external_link: '',
      internal_link: '',
      languagetype: '',
      submenu_id: 0,
      file: '',
      html: '',
    });
  }, []);

  const handleEditorChange = (content) => {
    setHtml(content);
  };

  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^(?=.*[A-Za-z0-9])[A-Za-z0-9 .,\/]+$/;
    if (!formData.MenuName) {
      errors.MenuName = 'Introduction is required';
    } else if (!formData.MenuName.match(namePattern)) {
      errors.MenuName = 'Name should only contain alphabets or numbers';
    }

    if (!formData.languagetype) {
      newErrors.languagetype = 'language is required';
    }

    if (!formData.ContentType) {
      newErrors.ContentType = 'Select a content type';
    }

    if (formData.ContentType === '4' && !formData.external_link) {
      newErrors.external_link = 'External Link is required';
    }

    // if (formData.ContentType === '3' && !formData.internal_link) {
    //   newErrors.internal_link = 'Internal Link is required';
    // }

    if (formData.ContentType === '2' && !file) {
      newErrors.file = 'File is required';
    }

    // if (formData.ContentType === '1' && !html) {
    //   newErrors.html = 'HTML content is required';
    // }

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

      const response = await apiClient.post(apis.customdata, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status == 200) {
       // console.log('Data saved:', response.data);
        toast.success('Data saved successfully!');
        setModalMessage('Data saved successfully.');
        setSnackbarOpen(true);
        setContent('')
        setFormData({
          MenuName: '',
          ContentType: '',
          external_link: '',
          internal_link: '',
          languagetype: '',

          file: '',
          html: '',
        });
      } else {
        console.error('Error saving data:');
      }

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
        setFormData({
          MenuName: '',
          ContentType: '',
          external_link: '',
          internal_link: '',
          languagetype: '',

          file: '',
          html: '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    }
    fetchData1();
  }, []);
  console.log(formData, html)

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
      <li class="breadcrumb-item  ">Custom</li>
      {/* <li class="breadcrumb-item active ">Menu</li> */}
     
    </ol>
  </nav>
  </div>
          
        </div>

        <div >
          <div className="row justify-content-center">
            <div >
              <div class="card">
                <div class="card-body">
                  <div class="mb-3 mt-md-4">
                    <div class="box-sec">
                      <h1 className="text-center text-dark heading-main">Custom</h1>
                      <div className="mb-3">
                        <label className="form-label text-dark">Select a Language</label>
                        <select
                          className="form-select"
                          name="languagetype"
                          value={formData.languagetype}
                          onChange={handleInputChange}
                        >
                          <option value="">Select a Language</option>

                          <option value="1">English</option>
                          <option value="2">Hindi</option>
                        </select>
                        {errors.languagetype && <div className="text-danger">{errors.languagetype}</div>}
                      </div>
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
                  </div>
                </div>
                <div id="button" className="d-flex " style={{ margin: '10px 10px' }}>
                  <Button onClick={handleOpenConfirmation} type="submit" style={{ width: 100, color: 'white', backgroundColor: 'blue', width: 100, marginRight: 10 }}>
                    Submit
                  </Button>
                  <div className="pagetitle-rgt">
                    <Link to='/dashboard'>
                      <button type="button" class="btn btn-info" style={{ width: 100, color: 'white', backgroundColor: 'blue' }}>Back</button>
                    </Link>
                  </div>

                </div>
              </div>
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
              <Dialog open={snackbarOpen} onClose={() => setSnackbarOpen(false)}>
                <DialogTitle>{modalMessage}</DialogTitle>
                <DialogActions>
                  <Button onClick={() => setSnackbarOpen(false)} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
