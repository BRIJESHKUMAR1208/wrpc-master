import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
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
import { Col, Row } from 'react-bootstrap';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import Footer from '../../footer/Footer';



export const EditMenu = () => {
  const { id } = useParams()
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

  const onChange = useCallback((html) => {
   
    setContent(html);
  }, []);

  // const handleEditorChange = (content) => {
  //   setEditorContent(content);
  // };

  const [formData, setFormData] = useState({
    menu_id: '',
    submenu_id: 0,

    menuname: "",
    menuurl: "",
    contenttype: "",
    html: "",
    file: "",
    internal_link: "",
    external_link: "",
    languagetype:'',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      menu_id: '',
      submenu_id: 0,

      menuname: "",
      menuurl: "",
      contenttype: "",
      html: "",
      file: "",
      internal_link: "",
      external_link: "",
      languagetype:'',
    });
  }, []);

  const handleEditorChange = (content) => {
    setHtml(content);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.menuname) {
      newErrors.MenuName = 'Name is required';
    }

    if (!formData.contenttype) {
      newErrors.ContentType = 'Select a content type';
    }

    if (!formData.languagetype) {
      newErrors.languagetype = 'Select a Language';
    }

    if (formData.contenttype === '4' && !formData.external_link) {
      newErrors.external_link = 'External Link is required';
    }

    // if (formData.ContentType === '3' && !formData.internal_link) {
    //   newErrors.internal_link = 'Internal Link is required';
    // }
    if (formData.contenttype === '2') {
      if (!file) {
        newErrors.file = 'File is required';
      } else if (file.type !== 'application/pdf') {
        newErrors.file = 'Only PDF files are allowed';
      }
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
      formDataToSend.append('menuname', formData.menuname);
      formDataToSend.append('contenttype', formData.contenttype);
      formDataToSend.append('menuurl', formData.menuurl);
      formDataToSend.append('submenu_id', formData.submenu_id);
      formDataToSend.append('languagetype', formData.languagetype);

      if (formData.contenttype === '4') {
        formDataToSend.append('external_link', formData.external_link);
      } else if (formData.contenttype === '3') {
        formDataToSend.append('internal_link', formData.internal_link);
      } else if (formData.contenttype === '2') {
        formDataToSend.append('file', file);
      } else if (formData.contenttype === '1') {
        formDataToSend.append('html', content);
      }

      const response = await apiClient.post("/api/TopMenu/put/"+ id, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     
      toast.success('Data saved successfully!');
      setModalMessage('Data saved successfully!');
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
      setSnackbarOpen(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized access. Please log in.');
      } else {
      
        toast.error('Something Went Wrong!');
        console.error('Error saving/updating data:', error);
      }
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
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    }
    fetchData1();
  }, []);
  useEffect(() => {
    async function fetchData2() {
      try {

        const response = await apiClient.get(apis.getmenudatabyid + id);
        setFormData(response.data);

      } catch (error) {
        console.error('Error fetching user data:', error);

      }
    }
    fetchData2();
  }, [id]);


  return (


    <div  >
      <Header />
      <Sidebar />



      <div className="row justify-content-center">
    
        <div class="container-fluid bg-white" >

          <div class="box-sec">
            <h1 className="text-center heading-main">Edit Data</h1>

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
                name="menuname"
                value={formData.menuname}
                onChange={handleInputChange}
         
              />
              {errors.MenuName && <div className="text-danger">{errors.MenuName}</div>}
            </div>

            {/* Input for Select a content type */}
            <div className="mb-3">
              <label className="form-label text-dark">Select a content type</label>
              <select
                className="form-select"
                name="contenttype"
                value={formData.contenttype}
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
            {formData.contenttype === '4' && (
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
            {formData.contenttype === '3' && (
              <div className="mb-3">
                <select
                  className='form-control'
                  name='internal_link'
                  value={formData.internal_link}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors.internal_link}
                >
                  <option value='' style={{ color: "black" }}>Select a role</option>
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
            {formData.contenttype === '2' && (
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
            {formData.contenttype === '1' && (
              <div className="mb-3">
                <label className="form-label text-dark">HTML Editor</label>
                <div >
                  {/* <textarea
                  className="form-control"
                  value={html}
                  onChange={(e) => handleEditorChange(e.target.value)}
                ></textarea> */}
                </div>
                {/* <FroalaEditorComponent
      tag='textarea'
      model={html}
      onModelChange={handleEditorChange}
    /> */}
                {/* <HtmlEditor/> */}
                <JoditEditor
                  value={formData.html}
                  config={config}
                  tabIndex={1}
                  onChange={onChange}
                />
                {errors.editorContent && <div className="text-danger">{errors.editorContent}</div>}
              </div>
            )}

            {/* Submit Button */}
            <div className="btnsubmit">
              <button className="btn btn-primary" onClick={handleOpenConfirmation}>
                Update
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
                  Menu updated successfully.
                </Alert>
              </Snackbar>
              <ToastContainer/>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
