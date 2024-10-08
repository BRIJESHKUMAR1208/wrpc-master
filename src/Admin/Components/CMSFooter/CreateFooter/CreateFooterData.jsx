import React, { useState, useEffect ,useMemo,useCallback} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from 'react-router-dom';
import {Routes, Route, useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import {
  Button,
  Snackbar,
  DialogTitle, // Add this import
  DialogContent,
  Dialog,
} from '@mui/material'; 
import JoditEditor from 'jodit-react';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import Footer from '../../footer/Footer';


function EAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

export const CreateFooterData = () => {
  const [html, sethtml] = useState('');
  const [file, setselectefile] = useState(null);
  const [content ,setContent]= useState('')
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // Confirmation dialog state
  // const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const navigate = useNavigate();
  const config = useMemo(
    () => ({
      readonly: false
    }),
    []
  );

  const onChange = useCallback((content) => {
    
    setContent(content);
  }, []);

  const [formData, setFormData] = useState({
    tittle_name: '',
    contenttype: '',
    external_link: '',
    internale_link: '',
    file: '',
    html: '',
    footertype:4,
    languagetype: '',
  });
  const navigateFooter = () => {
    // 👇️ navigate to /
    navigate('/');
  };
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      tittle_name: '',
      contenttype: '',
      external_link: '',
      internale_link: '',
      file: '',
      html: '',
      footertype:4,
      languagetype: '',
    });
  }, []);

  const handleEditorChange = (content) => {
    sethtml(content);
  };

  const validateForm = () => {
    const errors = {};
    const namePattern = /^[a-zA-Z\s]+$/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  
      if (!formData.tittle_name) {
        errors.tittle_name = 'Name is required';
      } else if (!formData.tittle_name.match(namePattern)) {
        errors.tittle_name = 'Name should only contain alphabets and spaces';
      }
      else if (specialCharRegex.test(formData.tittle_name)) {
        errors.description = ' Name should not contain special characters';
      }

    if (!formData.contenttype) {
      errors.contenttype = 'Select a content type';
    }
    if (!formData.languagetype ) {
      errors.languagetype = 'Select a Language';
    }

    if (formData.contenttype === '4' && !formData.external_link) {
      errors.external_link = 'External Link is required';
    }

    if (formData.contenttype === '3' && !formData.internale_link) {
      errors.internale_link = 'Internal Link is required';
    }

    if (formData.contenttype === '2' && !file) {
      errors.file = 'File is required';
    } else if (formData.contenttype === '2' && file && file.type !== 'application/pdf') {
      errors.file = 'Please upload a PDF file';
    }

    // if (formData.contenttype === '1' && !html) {
    //   errors.editorContent = 'HTML content is required';
    // }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setselectefile(imageFile);
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
    validateForm();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('tittle_name', formData.tittle_name);
      formDataToSend.append('contenttype', formData.contenttype);
      formDataToSend.append('footertype', formData.footertype);
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

      const response = await apiClient.post(apis.newfooter, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     
      toast.success('Data saved successfully!');
      setModalMessage('Data saved successfully!');
      setSnackbarOpen(true);
       // Show the success Snackbar
        // Clear the form fields
    setFormData({
      tittle_name: '',
      contenttype: '',
      external_link: '',
      internale_link: '',
      file: '',
      html: '',
    });
    } catch (error) {
      console.error('Error saving data:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized access. Please log in.');
      } else {
      
        toast.error('Something Went Wrong!');
        console.error('Error saving/updating data:', error);
      }
    }
  };
  useEffect(() => {
    const fetchData1= async()=> {
     try {
      
       const response = await apiClient.get(apis.getmenuname);
       setDropdownOptions(response.data);
      
     } catch (error) {
       console.error('Error fetching user data:', error);
     
     }
   }
   fetchData1();
 }, []);



  return (
    <div>
    <Header />
    <Sidebar />
  <main id="main" class="main">
    <div class="pagetitle">
    <div class="pagetitle-lft">
      <h1>Create Footer Data</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Home</li>
          <li class="breadcrumb-item">Footer</li>
          <li class="breadcrumb-item active">Create Footer Data</li>
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
       
      </div>
      <div className="row justify-content-center">
        <div className="col-md-12">
        <div class="card"><div class="card-body"><div class="mb-3 mt-md-4">
        <div class="box-sec">
        <h1 className="text-center heading-main">Footer</h1>

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
          {/* Input for Name */}
          <div className="mb-3">
            <label className="form-label text-dark">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="tittle_name"
              value={formData.tittle_name}
              onChange={handleInputChange}
            />
            {errors.tittle_name && <div className="text-danger">{errors.tittle_name}</div>}
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
            {errors.contenttype && <div className="text-danger">{errors.contenttype}</div>}
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
              <label className="form-label text-dark">Enter Internal Link</label>
              {/* <input
                className="form-control"
                type="text"
                placeholder="Enter Internal Link"
                name="internale_link"
                value={formData.internale_link}
                onChange={handleInputChange}
              /> */}
               <select
                                  className='form-control'
                                  name='internal_link'
                                  value={formData.internal_link}
                                  onChange={handleInputChange}
                                  // isInvalid={!!formErrors.internal_link}
                                >
                                  <option value='' style={{color:"black"}}>Select a Menu Name</option>
                                  {dropdownOptions.map((data) => (
                                    <option key={data.u_id} value={"/menu/"+data.u_menu_url}>
                                      {"Menu Name"+":-"+data.u_menu_name}
                                    </option>
                                  ))}
                                </select>
              {errors.internale_link && <div className="text-danger">{errors.internal_link}</div>}
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
              <div>
                {/* <textarea
                  className="form-control"
                  value={html}
                  onChange={(e) => handleEditorChange(e.target.value)}
                ></textarea> */}
                 <JoditEditor
                  
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
              onClose={() => setSnackbarOpen(false)}>
              <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
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
