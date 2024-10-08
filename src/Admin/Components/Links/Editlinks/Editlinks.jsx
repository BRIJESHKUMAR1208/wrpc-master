import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ViewListIcon from '@mui/icons-material/ViewList';
import { Link, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import HomeIcon from '@mui/icons-material/Home';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
// import {ToastContainer ,toast } from 'react-toastify'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';




export const Editlink = () => {
  const { id } = useParams();
  const [html, sethtml] = useState('');
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [prevContentType, setPrevContentType] = useState('');
  const [menuname , SetMenuname]=useState({})
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    link_tittle: '',  // Corrected typo in the field name
    contenttype: '',
    external_file: '',
    internal_file: '',  // Corrected field name
    file: null,  // Use null for file state
    startdate: '',
    end_date: '',  // Corrected field name
    html: '',
    languagetype:'',
  });
  const [errors, setErrors] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);

  const optionsData = [
    { id: 4, label: 'External Link' },
    { id: 3, label: 'Internal Link' },
    { id: 2, label: 'File' },
    { id: 1, label: 'HTML' },  // Updated label
  ];
  const config = useMemo(
    () => ({
      readonly: false
    }),
    []
  );

  const onChange = useCallback((newContent) => {
    // console.log("Editor content changed:", newContent);
    sethtml(newContent);
  }, []);

  useEffect(() => {
    if (id) {
      apiClient.get(apis.Linksbyid + id)
        .then((response) => {
          setFormData(response.data)

        })
        .catch((error) => {
          console.error('Error fetching data for editing:', error);
        });
    } else {
      setFormData({
        link_tittle: '',
        contenttype: "",
        external_file: '',
        internal_file: '',
        file: null,
        startdate: '',
        end_date: '',
        html: '',
        languagetype:'',
      });
    }
  }, [id]);


  useEffect(() => {
    async function fetchData() {
      try {

        const response = await apiClient.get(apis.getmenuname);
        SetMenuname(response.data);

      } catch (error) {
        console.error('Error fetching user data:', error);

      }
    }
    fetchData();
  }, []);
//  console.log(menuname)

  const handleEditorChange = (content) => {
    sethtml(content);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.link_tittle) {
      errors.link_tittle = 'Name is required';
    }

    if (!formData.contenttype) {
      errors.contenttype = 'Select a content type';
    }

    if (formData.contenttype === '4' && !formData.external_file) {
      errors.external_file = 'External Link is required';
    }

    if (formData.contenttype === '3' && !formData.internal_file) {
      errors.internal_file = 'Internal Link is required';
    }

    if (formData.contenttype === '2' && !file) {
      errors.file = 'File is required';
    }

    if (formData.contenttype === '1' && !html) {
      errors.html = 'HTML content is required';  // Updated field name
    }

    if (!formData.startdate) {
      errors.startdate = 'Starting Date is required';
    }

    if (!formData.end_date) {
      errors.end_date = 'Ending Date is required';
    }

    if(!formData.languagetype){
      errors.languagetype ="select language"
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFile(imageFile);
  };


 

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // Store the previous content type
    setPrevContentType(formData.contenttype);
    const prevType = formData.contenttype;

    if (name === 'contenttype' && value !== formData.contenttype) {
      setFormData(prevFormData => ({
        ...prevFormData,
        external_file: '',
        internal_file: '',
        file: null,
        html: '',
        [name]: value,
      }));
    } else {
      // Update form data based on input type
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: type === 'file' ? event.target.files[0] : value,
      }));
    }
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

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Open the confirmation dialog when the user clicks "Submit"
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    // Handle cancel action in the confirmation dialog
    setConfirmDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
 setConfirmDialogOpen(false);
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('link_tittle', formData.link_tittle);
        formDataToSend.append('contenttype', formData.contenttype);

        if (parseInt(parseInt(formData.contenttype)) === 4) {
          formDataToSend.append('external_file', formData.external_file);
        } else if (parseInt(formData.contenttype) === 3) {
          formDataToSend.append('internale_file', formData.internal_file);
        } else if ( parseInt(formData.contenttype)  === 2) {
          formDataToSend.append('file', file); // Use file here
        } else if (parseInt(formData.contenttype) === 1) {
          formDataToSend.append('html', html);
        }

        formDataToSend.append('startdate', formData.startdate);
        formDataToSend.append('end_date', formData.end_date);
        formDataToSend.append('langaugetpe', formData.languagetype);  
        // console.log(formDataToSend)

        const response = await apiClient.post("/api/Link/put/"+ id, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log('Data updated:', response.data);
        toast.success('Data updated successfully!');
        // openModal('Data updated successfully!');
      } catch (error) {
        console.error('Error saving/updating data:', error);
        toast.error('Something Went Wrong!');
      }
    }
  };

  // console.log(formData)
  return (

         <div>
        <Header />
        <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Edit Link</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Home</li>
              <li class="breadcrumb-item">Edit Link</li>
            </ol>
          </nav>
        </div>
        <div className="pagetitle-rgt d-flex justify-content-end mb-5">
              <Link to="/services/alllink">
                <button type="button" class="btn btn-info">
                  Back
                </button>
              </Link>
            </div>
    <div className="list">
   
      <div className="listContainer">
    
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="col text-end">
              
              </div>
            </div>
          </div>
          <div className="row  container-fluid bg-white" >
            <div >
              <div class="box-sec">
                <h1 className="text-center heading-main">Link</h1>
                <div className="mb-3">
                  <label className="form-label text-dark">Select a Language</label>
                  <select
                    className="form-select"
                    name="languagetype"
                    value={formData.languagetype}
                    onChange={handleInputChange}
                  >
                    <option value=" ">Select a Language</option>
                    <option value={1}>English</option>
                    <option value={2}>Hindi</option>
                  </select>
                  {errors.languagetype && <div className="text-danger">{errors.languagetype}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label text-dark">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    name="link_tittle"
                    value={formData.link_tittle}
                    onChange={handleInputChange}
                  />
                  {errors.link_tittle && <div className="text-danger">{errors.link_tittle}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark">Select a content type</label>
                  <select
                    className="form-select"
                    name="contenttype"
                    value={formData.contenttype}
                    onChange={handleInputChange}
                 

                  >
                    <option value="">Select a content type</option>
                 
                    {optionsData.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.label}
                      </option>
                    ))}
                  </select>
                  {errors.contenttype && <div className="text-danger">{errors.contenttype}</div>}
                </div>

                {/* Render fields based on contenttype */}
                { parseInt(formData.contenttype) === 4 && (

                  <div className="mb-3">
                    <label className="form-label text-dark">Enter External Link</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter External Link"
                      name="external_file"
                      value={formData.external_file}
                      onChange={handleInputChange}
                    />
                    {errors.external_file && (
                      <div className="text-danger">{errors.external_file}</div>
                    )}
                  </div>
                )}

                {parseInt(formData.contenttype) === 3 && (
                  <div className="mb-3">
                    <label className="form-label text-dark">Enter Internal Link</label>
                    {/* <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Internal Link"
                      name="internal_file"
                      value={formData.internal_file}
                      onChange={handleInputChange}
                    /> */}
                    <select
                  className='form-control'
                  name='internal_file'
                  value={formData.internal_file}
                  onChange={handleInputChange}
                
                >
                  <option value='' style={{ color: "black" }}>Select Menu Name</option>
                  {menuname.map((data) => (
                    <option key={data.u_id} value={"/menu/" + data.u_menu_url}>
                      {"Menu Name" + ":-" + data.u_menu_name}
                    </option>
                  ))}
                </select>
                    {errors.internal_file && (
                      <div className="text-danger">{errors.internal_file}</div>
                    )}
                  </div>
                )}

                {parseInt(formData.contenttype) === 2 && (
                  <div className="mb-3">
                    <label className="form-label text-dark">Choose File</label>
                    <input
                      className="form-control"
                      type="file"


                      onChange={handleImageChange}
                    />
                    {errors.file && (
                      <div className="text-danger">{errors.file}</div>
                    )}
                  </div>
                )}

                {parseInt(formData.contenttype) === 1 && (
                  <div className="mb-3">
                    <label className="form-label text-dark">HTML Editor</label>  {/* Updated label */}
                    <div>
                     
                      <JoditEditor
                        value={formData.html}
                        config={config}
                        tabIndex={1}
                        onChange={onChange}
                      />
                      {/* {console.log("hf")} */}
                    </div>
                    {errors.html && (
                      <div className="text-danger">{errors.html}</div>
                    )}
                  </div>
                )}
               

                <div className="mb-3">
                  <label className="form-label text-dark">Starting Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="startdate"
                    value={formData.startdate}
                    onChange={handleInputChange}
                  />
                  {errors.startdate && (
                    <div className="text-danger">{errors.startdate}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark">Ending Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                  />
                  {errors.end_date && (
                    <div className="text-danger">{errors.end_date}</div>
                  )}
                </div>

                <div className="btnsubmit">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Update
                  </button>
                 
                  {/* <CustomModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} /> */}
                  <ToastContainer/>
      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Create</DialogTitle>
        <DialogContent>
          Are you sure you want to create this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
      >
        <DialogTitle>Success</DialogTitle>
        <DialogContent>User created successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
    </div>
  );
};
