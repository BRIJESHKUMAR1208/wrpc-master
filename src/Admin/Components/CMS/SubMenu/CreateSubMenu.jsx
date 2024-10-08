import React, { useState, useEffect,useMemo,useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import {
  Snackbar,
  DialogTitle, // Add this import
  DialogContent,
  Dialog,
  Button,
} from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import JoditEditor from 'jodit-react';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';
import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';

function EAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

export const CreateSubMenu = () => {
  const [html, setHtml] = useState('');
  const [file, setFile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [data, Setdata] = useState([])
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedRole1, setSelectedRole1] = useState('');
  const [content, setContent] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    MenuName: '',
    ContentType: '',
    external_link: '',
    internal_link: '',
  
    submenu_id: "",
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
      submenu_id: "",
      file: '',
      html: '',
      languagetype:'',
    
    });
  }, []);
  

  const config = useMemo(
    () => ({
      readonly: false
    }),
    []
  );
  
  const onChange = useCallback((newContent) => {
   
    setContent(newContent);
  }, []);

  const handleEditorChange = (content) => {
    setHtml(content);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.MenuName) {
      newErrors.MenuName = 'Name is required';
    }
  


    if (!formData.ContentType) {
      newErrors.ContentType = 'Select a content type';
    }
    if (!selectedRole) {
      newErrors.ContentType = 'Select Contnet Type';
    }

    if (formData.ContentType === '4' && !formData.external_link) {
      newErrors.external_link = 'External Link is required';
    }

    if (formData.ContentType === '3' && !formData.internal_link) {
      newErrors.internal_link = 'Internal Link is required';
    }

    if (formData.ContentType === '2') {
      if (!file) {
        newErrors.file = 'File is required';
      } else if (file.type !== 'application/pdf') {
        newErrors.file = 'Only PDF files are allowed';
      }
    }

    if (!formData.languagetype ) {
      newErrors.languagetype = 'Select Language';
    }

    if (!formData.submenu_id ) {
      newErrors.submenu_id = 'Select Menu';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFile(imageFile);
  };

  const handleInputChange = (event) => {
    setSelectedRole(event.target.value);
    setSelectedRole1(event.target.value);
    const { name, value, type } = event.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: event.target.files[0],
      });
    } else {
      setSelectedRole(event.target.value);
      setSelectedRole(event.target.value);
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
   
      // formDataToSend.append('submenu_id', formData.submenu_id);
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
      // console.log('Data saved:', response.data);
      toast.success('Data saved successfully!');
      setModalMessage('Data saved successfully!');
      setSnackbarOpen(true);

      setFormData({
        MenuName: '',
        ContentType: '',
        external_link: '',
        internal_link: '',
        submenu_id: "",
        file: '',
        html: '',
        languagetype:'',
      
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
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiClient.get(apis.getmenuname);
        Setdata(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);
  // useEffect(() => {
  //    const fetchData1= async()=> {
  //     try {
  //       setLoading(true);
  //       const response = await apiClient.get(apis.getmenuname);
  //       setDropdownOptions(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       setLoading(false);
  //     }
  //   }
  //   fetchData1();
  // }, []);

  // console.log(formData)

  return (
    <div >
                  <div>
        <Header/>
        <Sidebar/>
        <main id="main" class="main">

<div class="pagetitle">
<div class="pagetitle-lft">
  <h1>Create Sub-Menu</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">Dashboard</li>
      <li class="breadcrumb-item  ">CMS</li>
      <li class="breadcrumb-item active ">SubMenu</li>
     
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
      <div className="row justify-content-center">
        <div class="card">
          <div class="card-body">
            <div class="mb-3 mt-md-4">
        <div class="box-sec">
        <h1 className="text-center text-dark">Sub Menu</h1>
          <Form.Group className="mb-3" controlId="Usertype">
          <div className="mb-3">
                  <label className="form-label text-dark">Language Type</label>
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

            <div className="mb-12">
            <label className="form-label text-dark">Menu Names</label>
              {/* <Form.Label className="text-center" style={{ color: "black" }}>Menu Names</Form.Label> */}
              <select
                className='form-control'
                name='submenu_id'
                value={formData.submenu_id}
                onChange={handleInputChange}

              >
                <option value='' style={{ color: "black" }}>Select a Menu</option>
                {data.map((data) => (
                  <option key={data.u_id} value={data.u_id}>
                    {data.u_menu_name}
                  </option>
                ))}
              </select>
              {errors.submenu_id && <div className="text-danger">{errors.submenu_id}</div>}
            </div>
          </Form.Group>
          
         
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
                                  <option value='' style={{color:"black"}}>Select a role</option>
                                  {data.map((data) => (
                                    <option key={data.u_id} value={"/menu/"+data.u_menu_url}>
                                      {"Menu Name"+":-"+data.u_menu_name}
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
              <div>
                {/* <textarea
                  className="form-control"
                  value={html}
                  onChange={(e) => handleEditorChange(e.target.value)}
                ></textarea> */}
                <JoditEditor
        value={content}
        config={config}
        tabIndex={1}
        onChange={onChange}
      />
              </div>
              {errors.editorContent && <div className="text-danger">{errors.editorContent}</div>}
            </div>
          )}

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
                Data save successfully.
              </Alert>
            </Snackbar>
            <ToastContainer/>
          </div>
        </div>
        </div>
        </div>
      </div>
      </div>
      </main>
      </div>
      <Footer/>
    </div>
  );
};
