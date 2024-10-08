import React, { useState, useEffect, useCallback, useMemo } from 'react';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';
// import MyEditor, { HtmlEditor } from '../htmlEditor/htmlEditor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link, useParams } from 'react-router-dom';
import { Routes, Route, useNavigate } from 'react-router-dom';
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

function EAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

export const EditFooterData = () => {
  const { id } = useParams()
  const [cotent, setContent] = useState('');
  const [menudata, setMenudata] = useState('')
  const [file, setselectefile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // Confirmation dialog state
  // const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tittle_name: '',
    contenttype: '',
    external_link: '',
    internale_link: '',
    file: '',
    html: '',
    footertype: 3,
    languagetype: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      tittle_name: '',
      contenttype: '',
      external_link: '',
      internale_link: '',
      file: '',
      html: '',
      footertype: 3,
      languagetype: '',
    });
  }, []);
  const config = useMemo(
    () => ({
      readonly: false
    }),
    []
  );
  ;


  const onChange = useCallback((html) => {
    // console.log("Editor content changed:", html);
    setContent(html);
  }, []);

  // const handleEditorChange = (content) => {
  //   sethtml(content);
  // };

  const validateForm = () => {
    const errors = {};

    if (!formData.tittle_name) {
      errors.tittle_name = 'Name is required';
    }

    if (!formData.contenttype) {
      errors.contenttype = 'Select a content type';
    }
    if (!formData.languagetype) {
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
    } else if (formData.contenttype === 1) {

    }
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleOpenConfirmation = () => {
    setConfirmDialogOpen(true);
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

      if (formData.contenttype === 4) {
        formDataToSend.append('external_link', formData.external_link);
      } else if (formData.contenttype === 3) {
        formDataToSend.append('internale_link', formData.internale_link);
      } else if (formData.contenttype === 2) {
        formDataToSend.append('file', file);
      }
      else if (formData.contenttype === 1) {
        formDataToSend.append('html', cotent);
      }

      const response = await apiClient.put("/api/lowerfooter/put/"+id, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log('Data saved:', response.data);
      toast.success('Data saved successfully!');
      setModalMessage('Data saved successfully!');
      setSnackbarOpen(true);
      // Show the success Snackbar
      // Clear the form fields

    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {

        const response = await apiClient.get(apis.getfooterbyid + id);
        const menuresponse = await apiClient.get(apis.getmenuname)
        setFormData(response.data);
        setMenudata(menuresponse.data)

      } catch (error) {
        console.error('Error fetching user data:', error);

      }
    }
    fetchData();
  }, [id]);
  // console.log(formData)

  return (
    <div className="container">

      <div class="card">
        <div class="card-body">
          <div className="row">
            <div className="col">

              <h1 className="text-center">Footer</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div >

              <div className="mb-3">
                <label className="form-label text-dark">Language Type</label>
                <select
                  className="form-select"
                  name="languagetype"
                  value={formData.languagetype}
                  onChange={handleInputChange}
                >
                  <option value="">Select a Language</option>
                  <option value={1}>English</option>
                  <option value={2}>Hindi</option>
                </select>
                {errors.languagetype && <div className="text-danger">{errors.languagetype}</div>}
              </div>
              {/* Input for Name */}
              <div className="mb-3">
                <label className="form-label text-dark">Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Name"
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
                  <option value={4}>External Link</option>
                  <option value={3}>Internal Link</option>
                  <option value={2}>File</option>
                  <option value={1}>HTML</option>
                </select>
                {errors.contenttype && <div className="text-danger">{errors.contenttype}</div>}
              </div>

              {/* Input for External Link */}
              {parseInt(formData.contenttype) === 4 && (
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
              {parseInt(formData.contenttype) === 3 && (
                <div className="mb-3">
                  <label className="form-label text-dark">Enter Internal Link</label>
                  <select
                    className='form-control'
                    name='internal_link'
                    value={formData.internal_link}
                    onChange={handleInputChange}
                  // isInvalid={!!formErrors.internal_link}
                  >
                    <option value='' style={{ color: "black" }}>Select a Menu Name</option>
                    {menudata.map((data) => (
                      <option key={data.u_id} value={"/menu/" + data.u_menu_url}>
                        {"Menu Name" + ":-" + data.u_menu_name}
                      </option>
                    ))}
                  </select>
                  {errors.internale_link && <div className="text-danger">{errors.internale_link}</div>}
                </div>
              )}

              {/* Input for File */}
              {parseInt(formData.contenttype) === 2 && (
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
              {parseInt(formData.contenttype) === 1 && (
                <div className="mb-3">
                  <label className="form-label text-dark">HTML Editor</label>
                  <div>
                   
                    <JoditEditor
                      value={formData.html}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
